import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { USDC_ABI } from '@/constants/USDC-abi';

const tokenContractAddress = '0xEAFFD40B5c50aF6373F46632C1B13BB537b5b7B8';

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
    const provider: any = await detectEthereumProvider();
    const providerRpc = new ethers.providers.Web3Provider(provider);
    const balance = await providerRpc.getBalance(address);
    
    // Get ERC20 balance
    const erc20Balance = await getERC20Balance(address, providerRpc);
    return {balance: ethers.utils.formatEther(balance), erc20Balance: erc20Balance || '0'};
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

        return tx;
    } catch (error) {
        console.error('Error sending transaction:', error);
        return null;
    }
}

export const getERC20Balance = async (address: string, providerRpc: any ) => {
    try {
        const signer = providerRpc.getSigner(address);
        const token = new ethers.Contract(tokenContractAddress, USDC_ABI, signer);
        const balance = await token.balanceOf(address);
        return ethers.utils.formatUnits(balance, 6) || '0';
    } catch (error) {
        console.error('Error getting ERC20 balance:', error);
        return null;
    }
}

export const transferERC20WithEther = async(senderAddress: string, recipientAddress: string, tokenAmount: string) => {
    try{
        const provider: any = await detectEthereumProvider();
        const providerRpc = new ethers.providers.Web3Provider(provider);
        const signer = providerRpc.getSigner(senderAddress);
        const token = new ethers.Contract(tokenContractAddress, USDC_ABI, signer);
        // Convert the token amount to the correct format (with decimals)
        const decimals = await token.decimals();
        const tokenAmountWithDecimals = ethers.utils.parseUnits(tokenAmount, decimals);

        // Create a transaction object to transfer USDC
        const tx = await token.transfer(recipientAddress, tokenAmountWithDecimals);

        return tx;
    }catch(error){
        console.error('Error sending transaction:', error);
        return null;
    }
  }
