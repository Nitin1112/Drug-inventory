# app.py
import os
import sys
from flask import Flask, request, jsonify
from groq import Groq
from dotenv import load_dotenv
from flask_cors import CORS
from helpers.ai_api import get_intent
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime, timedelta

import ast
import json
import re
# Load env variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# === Groq AI Setup ===
try:
    groq_api_key = os.environ['GROQ_API_KEY']
    client = Groq(api_key=groq_api_key)
    LLAMA_MODEL = 'llama3-8b-8192'
except KeyError:
    sys.stderr.write("GROQ_API_KEY not set in .env\n")
    sys.exit(1)

# === MongoDB Setup ===
MONGO_URI = os.environ.get("MONGO_URI")
if not MONGO_URI:
    sys.stderr.write("MONGO_URI not set in .env\n")
    sys.exit(1)

mongo = MongoClient(MONGO_URI)
db = mongo["PharmaOne"]  # adjust as per your DB name
inventory_col = db["inventories"]
med_col = db["medicineanddrugs"]

# === System Prompt ===
SYSTEM_PROMPT = """
You are a helpful assistant integrated into the PharmaOne - Medicine Inventory and Supply Chain system.
Your job is to help healthcare admins manage and query the medical inventory.

You have access to medicine data including:
- Medicine name, quantity in stock, expiry date, batch number.
- Daily usage patterns to predict upcoming demand.
- Low stock or near-expiry alerts.

You should:
- Answer questions about medicine availability, quantity, and expiry.
- Suggest reordering if stock is low.
- Predict demand for a specific medicine for the upcoming week using historical usage.
- Provide helpful alerts (e.g., medicines expiring soon).

If a user asks something unrelated to medical inventory, kindly steer them back.

Always be accurate and helpful. Do not fabricate data. Base responses on actual database entries provided to you.
"""

# === Helper: Medicine Demand Forecast ===
def estimate_weekly_demand(lifetime_sales):
    return round(lifetime_sales / 12) if lifetime_sales else 5  # basic logic

def user_asks_for_inventory(user_msg):
    msg = user_msg.lower()
    # print(f"User message: {msg}")
    return {
        "all_medicines": "all available medicines" in msg or "list medicines" in msg,
        "expired": "expired" in msg,
        "below_min": "below minimum" in msg or "low stock" in msg,
        "predict_demand": "predict demand" in msg or "weekly forecast" in msg
    }
# === Helper: Check for keyword ===

# Custom JSON Encoder to handle ObjectId serialization
class MongoJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)  # Convert ObjectId to string
        return super().default(obj)

# Apply the custom encoder globally
app.json_encoder = MongoJSONEncoder

# Helper function to serialize the ObjectId in MongoDB results
def serialize_objectid(obj):
    if isinstance(obj, dict):
        return {key: serialize_objectid(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [serialize_objectid(item) for item in obj]
    elif isinstance(obj, ObjectId):
        return str(obj)
    return obj

import re

def determine_collection(query_dict, user_message):
    prompt = (
        "You are a professional MongoDB MQL assistant.\n\n"
        "I need to determine which MongoDB collection is appropriate for the given query.\n"
        "The query is provided in Python dictionary format. Based on the query, please analyze and suggest the collection.\n\n"
        "Schemas:\n"
        "Inventory:\n"
        "- owner: ObjectId\n"
        "- medicines: Array of {medicineOrDrug: ObjectId, stock: Number, lifetimeSupply: Number, lifetimeSales: Number}\n"
        "- items: Array of {medicineOrDrug: ObjectId, expiryDate: Date, stock: Number, batchNumber: String}\n\n"
        "MedicineAndDrug:\n"
        "- name: String\n"
        "- type: String ('Medicine' or 'Drug')\n"
        "- minimumCap: Number\n"
        "- price: Number\n\n"
        "User Request:\n"
        f"{user_message}\n\n"
        "Query Dictionary:\n"
        f"{query_dict}\n\n"
        "Please analyze the query dictionary and the user request, then suggest the correct collection to use for this query.\n"
        "Your response should end with:\n"
        "Decision: Inventory\n"
        "OR\n"
        "Decision: MedicineAndDrug\n"
    )

    response = client.chat.completions.create(
        model=LLAMA_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
        max_tokens=200
    )
    
    llm_response = response.choices[0].message.content.strip()
    print("LLM Raw Response:\n", llm_response)

    # Flexible match for both with or without <>
    match = re.search(r"Decision:\s*<?(Inventory|MedicineAndDrug)>?", llm_response, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    else:
        print("LLM response does not contain a clear collection decision.")
        return "Inventory"


def improve_generated_mql(user_message, mql_dict):
    prompt = (
        "You are a senior MongoDB MQL expert.\n\n"
        "Your task is to carefully review and improve the given MongoDB MQL Python dictionary according to the user request.\n\n"
        "Instructions:\n"
        "- Review the MQL carefully.\n"
        "- If it's correct, return the same MQL Python dictionary.\n"
        "- If it's wrong or inefficient, correct it and return the improved MQL Python dictionary.\n"
        "- Always return **only the correct and improved MQL Python dictionary**.\n"
        "- Do NOT return any text, reason, or explanation. Only the MQL.\n"
        "- Do NOT wrap in ```python or markdown. Return raw Python dictionary only.\n\n"
        f"User Request:\n{user_message}\n\n"
        f"Generated MQL:\n{mql_dict}\n\n"
        "Provide the correct MQL:"
    )

    response = client.chat.completions.create(
        model=LLAMA_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
        max_tokens=500
    )

    mql_text = response.choices[0].message.content.strip()

    # Clean unwanted wrappers like ```python or ```json if any
    mql_text = mql_text.strip("```").replace("python", "").replace("json", "").strip()

    try:
        improved_mql = ast.literal_eval(mql_text)
        return improved_mql
    except Exception as e:
        # In development phase, let's still return the raw text for logging and inspection
        return {"error": "Invalid MQL syntax from Groq", "raw_response": mql_text, "details": str(e)}


# Custom function to generate dynamic MQL query
def generate_dynamic_mql(user_message):
    prompt = (
        "You are a professional MongoDB MQL (Mongo Query Language) assistant.\n\n"
        "Your task is to convert user requests into **modern MongoDB MQL Python dictionary format only**.\n"
        "Always follow these strict rules:\n"
        "- Use only modern MQL. Do NOT use legacy patterns like `$query`, `$fields`, or shell commands.\n"
        "- Use Python dictionary format strictly (no JSON string).\n"
        "- When filtering arrays like 'medicines', use `$elemMatch` properly inside queries.\n"
        "- Do NOT use $elemMatch inside projection unless necessary.\n"
        "- When sorting by fields inside arrays (like medicines.stock), advise that it requires aggregation or use of `$unwind`.\n"
        "- Always give clean, ready-to-run MQL that is executable directly in PyMongo.\n"
        "- Do not include any text, explainers, or comments. Return only the Python dict query.\n\n"
        "Schemas:\n"
        "Inventory:\n"
        "- owner: ObjectId\n"
        "- medicines: Array of {medicineOrDrug: ObjectId, stock: Number, lifetimeSupply: Number, lifetimeSales: Number}\n"
        "- items: Array of {medicineOrDrug: ObjectId, expiryDate: Date, stock: Number, batchNumber: String}\n\n"
        "MedicineAndDrug:\n"
        "- name: String\n"
        "- type: String ('Medicine' or 'Drug')\n"
        "- minimumCap: Number\n"
        "- price: Number\n\n"
        "User Request:\n"
        f"{user_message}\n\n"
        "Output:\n"
        "Provide only the correct MQL as a Python dictionary."
    )
    
    # Groq API call to get the MQL query
    response = client.chat.completions.create(
        model=LLAMA_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
        max_tokens=300
    )
    
    # Extract the MQL and convert it into a Python dictionary
    mql_query = response.choices[0].message.content.strip()
    print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    print(mql_query)
    print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    improved_mql = improve_generated_mql(user_message, mql_query)
    print(improved_mql)
     # Fix: Ensure the MQL is a valid dictionary
    improved_mql = improve_generated_mql(user_message, mql_query)
    if isinstance(improved_mql, dict):
        return improved_mql
    else:
        mql_query_dict =  ast.literal_eval(improved_mql)
        if isinstance(mql_query_dict,dict):
            return mql_query_dict 
        return {"error": "Invalid MQL syntax from Groq", "details": "The MQL returned was not valid."}, None

# API route for handling demo requests
@app.route('/demo', methods=['POST'])
def demo():
    user_message = request.json.get("message")
    
    if not user_message:
        return jsonify({"error": "Message required"}), 400

    query_dict = generate_dynamic_mql(user_message)

    # Determine which collection to use based on the generated query and the user message
    collection_decision = determine_collection(query_dict, user_message)

    print(query_dict)
    print(collection_decision)
    # Choose the correct collection based on the decision
    if collection_decision == 'Inventory':
        collection = inventory_col
    elif collection_decision == 'MedicineAndDrug':
        collection = med_col
    else:
        print("cant decide")
        collection = med_col
        

    print(collection)

    if "error" in query_dict:
        return jsonify(query_dict), 500
    
    # Run the generated query in the correct MongoDB collection
    if collection is not None:
        try:
            results = collection.find(query_dict.get("filter", {}), query_dict.get("projection", {}))
            result_list = []
            for result in results:
                result_list.append(serialize_objectid(result))  # Serialize ObjectId here
            
            # Return results using Flask's jsonify, ensuring that ObjectId is serialized
            return jsonify(result_list)
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Invalid collection detected"}), 400
    
# === Flask Routes ===
@app.route('/')
def index():
    return jsonify({"status": "API running", "usage": "POST /chat"})

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    user_id = request.json.get('userId')  # frontend must send userId
    if not user_message or not user_id:
        return jsonify({"error": "Message and userId required"}), 400

    try:
        intent = get_intent(user_message, client)
        flags = user_asks_for_inventory(user_message)
        inv = inventory_col.find_one({"owner": ObjectId(user_id)})
        
        # Static

        if inv:
            meds = inv.get("medicines", [])
            items = inv.get("items", [])

            if intent == "GET_ALL_MEDICINES":
                response = []
                for m in meds:
                    med_info = med_col.find_one({"_id": ObjectId(m["medicineOrDrug"])})
                    #print(med_info)
                    if med_info:
                        response.append(f"{med_info['name']} — Stock: {m['stock']}")
                return jsonify({"reply": "\n".join(response)})
            elif intent == "GET_EXPIRED_MEDICINES":
                now = datetime.utcnow()
                expired = []
                for item in items:
                    if "expiryDate" in item and item["expiryDate"] < now:
                        med = med_col.find_one({"_id": ObjectId(item["medicineOrDrug"])})
                        expired.append(f"{med['name']} (Batch {item.get('batchNumber')}) expired on {item['expiryDate'].date()}")
                return jsonify({"reply": "\n".join(expired) if expired else "No expired medicines."})
            elif intent == "GET_LOW_STOCK":
                low_stock = []
                for m in meds:
                    med_info = med_col.find_one({"_id": ObjectId(m["medicineOrDrug"])})
                    if m["stock"] < med_info.get("minimumCap", 10):
                        low_stock.append(f"{med_info['name']} — Stock: {m['stock']} (Minimum: {med_info.get('minimumCap')})")
                return jsonify({"reply": "\n".join(low_stock) if low_stock else "All medicines are above minimum stock."})

            elif intent == "GET_PREDICTED_DEMAND":
                prediction = []
                for m in meds:
                    med_info = med_col.find_one({"_id": ObjectId(m["medicineOrDrug"])})
                    forecast = estimate_weekly_demand(m.get("lifetimeSales", 0))
                    prediction.append(f"{med_info['name']} — Predicted Demand (Next Week): {forecast} units")
                return jsonify({"reply": "\n".join(prediction)})
            

            # if flags["all_medicines"]:
            #     response = []
            #     for m in meds:
            #         med_info = med_col.find_one({"_id": ObjectId(m["medicineOrDrug"])})
                    # print(med_info)
            #         if med_info:
            #             response.append(f"{med_info['name']} — Stock: {m['stock']}")
            #     return jsonify({"reply": "\n".join(response)})

            # elif flags["expired"]:
            #     now = datetime.utcnow()
            #     expired = []
            #     for item in items:
            #         if "expiryDate" in item and item["expiryDate"] < now:
            #             med = med_col.find_one({"_id": ObjectId(item["medicineOrDrug"])})
            #             expired.append(f"{med['name']} (Batch {item.get('batchNumber')}) expired on {item['expiryDate'].date()}")
            #     return jsonify({"reply": "\n".join(expired) if expired else "No expired medicines."})

            # elif flags["below_min"]:
            #     low_stock = []
            #     for m in meds:
            #         med_info = med_col.find_one({"_id": ObjectId(m["medicineOrDrug"])})
            #         if m["stock"] < med_info.get("minimumCap", 10):
            #             low_stock.append(f"{med_info['name']} — Stock: {m['stock']} (Minimum: {med_info.get('minimumCap')})")
            #     return jsonify({"reply": "\n".join(low_stock) if low_stock else "All medicines are above minimum stock."})

            # elif flags["predict_demand"]:
            #     prediction = []
            #     for m in meds:
            #         med_info = med_col.find_one({"_id": ObjectId(m["medicineOrDrug"])})
            #         forecast = estimate_weekly_demand(m.get("lifetimeSales", 0))
            #         prediction.append(f"{med_info['name']} — Predicted Demand (Next Week): {forecast} units")
            #     return jsonify({"reply": "\n".join(prediction)})

        # === Fallback: Use Groq AI ===
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message},
            ],
            model=LLAMA_MODEL,
            temperature=0.7,
            max_tokens=1024,
        )
        bot_response = chat_completion.choices[0].message.content
        return jsonify({"reply": bot_response})

    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({"error": str(e)}), 500


# Run the App
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)
