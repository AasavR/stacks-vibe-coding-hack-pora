#!/usr/bin/env bash
set -e

echo "=== PoRA deployment helper ==="

echo "1) Prepare: fund your testnet account and install hiro wallet or stacks-cli"
echo "2) Option A — Hiro Wallet UI (recommended):"
echo "   - Open Hiro Wallet (Testnet), go to Contracts -> Deploy Contract"
echo "   - Paste clarity/proof-of-real-asset.clar into the editor, name: proof-of-real-asset"
echo "3) Option B — stacks-cli (example):"
echo "   # Install stacks-cli: https://github.com/blockstack/stacks.js/tree/main/packages/cli"
echo "   # Deploy (replace SENDER with your account key name or address):"
echo "   stacks-cli contract deploy --network testnet --sender SENDER --file clarity/proof-of-real-asset.clar --name proof-of-real-asset"

echo "After deployment, copy the deploying principal and update frontend/src/stacks/contract.ts CONTRACT_ADDRESS"
