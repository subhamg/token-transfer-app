import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_KEY;

export const provider = new ethers.providers.InfuraProvider('goerli', INFURA_ID);

export const detectEthereum = async () => {
    const provider: any = await detectEthereumProvider();
    if (provider) {
        try {
            const providerRpc = new ethers.providers.Web3Provider(provider);
            const signer = providerRpc.getSigner();
            if (!signer) return;
            const address = await signer.getAddress();
            return address;
        } catch (error) {
            return null;
        }

    } else {
        return null;
    }
}

export const connectToMetaMask = async () => {
    const provider: any = await detectEthereumProvider();
    if (provider) {
        try {
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            const providerRpc = new ethers.providers.Web3Provider(provider);
            const signer = providerRpc.getSigner();
            if (!signer) return;
            const address = await signer.getAddress();
            return address;
        } catch (error) {
            return null;
        }
    } else {
        console.error('MetaMask is not installed');
        return null;
    }
}


export const getBalance = async (address: string) => {
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
};

export const transferEthereum = async (senderAddress: string, recipientAddress: string, amount: string) => {
    try {
        const provider: any = await detectEthereumProvider();
        const providerRpc = new ethers.providers.Web3Provider(provider);
        const signer = providerRpc.getSigner(senderAddress);

        // Create a transaction object
        const tx = await signer.sendTransaction({
            to: recipientAddress,
            value: ethers.utils.parseEther(amount),
        });

        // Wait for the transaction to be mined
        await tx.wait();
        return tx.hash;
    } catch (error) {
        console.error('Error sending transaction:', error);
        return null;
    }
}