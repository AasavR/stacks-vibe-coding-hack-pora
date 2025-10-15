import React, { useState } from 'react';
import { Connect } from '@stacks/connect-react';
import UploadVerify from './components/UploadVerify';
import MintProof from './components/MintProof';
import ProofList from './components/ProofList';

const connectConfig = { appDetails: { name: 'PoRA', icon: '' }, userSession: undefined } as any;

export default function App() {
  const [cid, setCid] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  return (
    <Connect {...connectConfig}>
      <div className="container">
        <h1>PoRA — Proof of Real Asset</h1>
        <div style={{display:'flex', gap:12}}>
          <div style={{flex:1}}>
            <UploadVerify onVerified={(c,s) => { setCid(c); setScore(s); }} />
            <MintProof ipfsCid={cid} score={score} />
          </div>
          <div style={{flex:2}}>
            <ProofList />
          </div>
        </div>
      </div>
    </Connect>
  );
}
