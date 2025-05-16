from pymongo import MongoClient
from datetime import datetime, timedelta
import os

client = MongoClient(os.environ.get("MONGO_URI"))
db = client["PharmaOne"]
inventory_col = db["inventories"]
usage_col = db["medicine_usage"]

def get_medicine_info(name):
    return inventory_col.find_one({"name": {"$regex": f"^{name}$", "$options": "i"}})

def get_recent_usage(name, days=7):
    recent_days = datetime.now() - timedelta(days=days)
    usage_entries = usage_col.find({
        "name": name,
        "date": {"$gte": recent_days}
    })

    return [entry['quantity_used'] for entry in usage_entries]
