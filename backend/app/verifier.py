import io
from PIL import Image
import pytesseract
from .models.dummy_model import evaluate_document

async def extract_text(file_bytes: bytes) -> str:
    try:
        img = Image.open(io.BytesIO(file_bytes))
        text = pytesseract.image_to_string(img)
        return text
    except Exception:
        # fallback: return empty string (in demo we rely on heuristics)
        return ''

async def verify_document(file_bytes: bytes):
    text = await extract_text(file_bytes)
    score, reasons = evaluate_document(text)
    return score, reasons
