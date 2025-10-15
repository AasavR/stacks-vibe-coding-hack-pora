import ipfshttpclient

# Upload bytes to IPFS (local node). For Pinata/Infura adapt HTTP upload.
def upload_bytes_to_ipfs(data: bytes) -> str:
    client = ipfshttpclient.connect()  # default /dns/localhost/tcp/5001/http
    cid = client.add_bytes(data)
    return cid
