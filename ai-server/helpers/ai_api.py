

def get_intent(user_message, client):
    
    intent_prompt = f"""
You are an intent classification assistant for a pharma chatbot.

Given this message:
"{user_message}"

Classify it into one of the following actions:
- GET_ALL_MEDICINES
- GET_EXPIRED_MEDICINES
- GET_LOW_STOCK
- GET_PREDICTED_DEMAND
- NONE (if it doesn't match any of the above)

Only reply with the exact action name.
"""
    classification = client.chat.completions.create(
    messages=[
        {"role": "user", "content": intent_prompt},
    ],
    model="llama3-8b-8192",
    temperature=0,
    max_tokens=20,
    )
    intent = classification.choices[0].message.content.strip()
    return intent
