import { bufferCV, uintCV, standardPrincipalCV, PostConditionMode } from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from './contract';

const network = new StacksTestnet();
network.coreApiUrl = 'https://stacks-node-api.testnet.stacks.co';

export async function openMintProof(openContractCall: any, assetType: string, ipfsCid: string, score: number, issuerPrincipal: string) {
  await openContractCall({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'mint-proof',
    functionArgs: [bufferCV(Buffer.from(assetType)), bufferCV(Buffer.from(ipfsCid)), uintCV(score), standardPrincipalCV(issuerPrincipal)],
    postConditionMode: PostConditionMode.Deny,
    onFinish: data => console.log('mint finished', data),
  });
}
