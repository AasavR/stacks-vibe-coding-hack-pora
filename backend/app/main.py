from fastapi import FastAPI, File, UploadFile
from .verifier import verify_document
from .ipfs_client import upload_bytes_to_ipfs

app = FastAPI()

@app.post('/verify')
async def verify(file: UploadFile = File(...)):
    file_bytes = await file.read()
    score, reasons = await verify_document(file_bytes)
    cid = upload_bytes_to_ipfs(file_bytes)
    return {"ipfs_cid": cid, "score": score, "reasons": reasons}
