import re

def extract_possible_medicine_names(text):
    # This can be improved with NLP later
    pattern = r"\b(Paracetamol|Ibuprofen|Aspirin|Amoxicillin)\b"
    return re.findall(pattern, text, re.IGNORECASE)