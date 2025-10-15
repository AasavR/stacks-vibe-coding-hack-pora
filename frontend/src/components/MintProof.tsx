import React, { useState } from 'react';
import { useOpenContractCall } from '@stacks/connect-react';
import { openMintProof } from '../stacks/stacksClient';

export default function MintProof({ ipfsCid, score }: { ipfsCid: string | null, score: number | null }) {
  const openContractCall = useOpenContractCall();
  const [assetType, setAssetType] = useState('gold');
  const [issuer, setIssuer] = useState('SP...');

  if (!ipfsCid) return <div className="card">No verified document yet.</div>;

  return (
    <div className="card">
      <h3>Mint Proof NFT</h3>
      <div>IPFS CID: {ipfsCid}</div>
      <div>Verification Score: {score}</div>
      <input value={assetType} onChange={e => setAssetType(e.target.value)} placeholder="asset type" />
      <input value={issuer} onChange={e => setIssuer(e.target.value)} placeholder="issuer principal" />
      <button onClick={() => openMintProof(openContractCall, assetType, ipfsCid!, score || 0, issuer)}>Mint Proof</button>
    </div>
  );
}
