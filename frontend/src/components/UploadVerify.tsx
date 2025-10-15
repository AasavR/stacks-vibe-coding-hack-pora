import React, { useState } from 'react';
import axios from 'axios';

export default function UploadVerify({ onVerified }: { onVerified: (cid: string, score: number) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return alert('choose file');
    setLoading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await axios.post('http://localhost:8000/verify', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      const { ipfs_cid, score } = res.data;
      onVerified(ipfs_cid, score);
    } catch (e) { console.error(e); alert('verify failed'); }
    setLoading(false);
  };

  return (
    <div className="card">
      <h3>Upload & Verify</h3>
      <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      <button onClick={upload} disabled={loading}>{loading ? 'verifying...' : 'Verify & Upload'}</button>
    </div>
  );
}
