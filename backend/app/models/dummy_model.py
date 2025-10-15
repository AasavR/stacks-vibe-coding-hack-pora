# Dummy heuristics for hackathon demo

def evaluate_document(text: str):
    score = 10
    reasons = []
    checks = ["Registered Valuer", "Certificate", "Invoice", "GSTIN", "Seal", "Signature"]
    for c in checks:
        if c.lower() in text.lower():
            score += 15
            reasons.append(f'Found {c}')
    score = min(score, 100)
    return score, reasons
