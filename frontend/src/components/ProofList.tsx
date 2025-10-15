import React, { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '../stacks/contract';

export default function ProofList() {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    async function fetch() {
      const res = await fetch(`https://stacks-node-api.testnet.stacks.co/v2/contracts/storage/entries?contract_address=${CONTRACT_ADDRESS}&contract_name=${CONTRACT_NAME}&map=proofs`);
      const json = await res.json();
      setEntries(json.results ?? []);
    }
    fetch();
  }, []);

  return (
    <div>
      <h3>Proofs</h3>
      {entries.map((e: any, idx: number) => (
        <div key={idx} className="card"><pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(e, null, 2)}</pre></div>
      ))}
    </div>
  );
}
