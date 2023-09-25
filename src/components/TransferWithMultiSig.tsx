import { transferDAIFromMultisig, transferERC20WithEther, transferEthereum } from '@/services/ether.service';
import { Button, TextInput } from '@mantine/core'
import { PaperPlaneRight } from '@phosphor-icons/react';
import { ethers } from 'ethers';
import React from 'react'

interface IProps {
    backClick: () => void;
    senderAddress: string;
}

export const TransferWithMultiSig = ({ backClick, senderAddress }: IProps) => {

    const [address, setAddress] = React.useState<string>('');
    const [amount, setAmount] = React.useState<string>('0');
    const [error, setError] = React.useState<string>('');
    const [success, setSuccess] = React.useState<boolean>(false);
    const [hash, setHash] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [safeAddress, setSafeAddress] = React.useState<string>('');
    

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    }

    const handleSafeAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSafeAddress(e.target.value);
    }

    const handleSubmit = async() => {
        setHash('');
        setSuccess(false);
        setLoading(true);
        if (!address || !amount || parseFloat(amount) <= 0) {
            setError('Please fill in all the fields');
            setLoading(false);
            return;
        }
        setError('');
       const tx: ethers.providers.TransactionResponse | null = await transferDAIFromMultisig(senderAddress, address, safeAddress, parseFloat(amount).toString());
       if(!tx || !tx.hash){
        setError('Error sending transaction');
        setLoading(false);
        return;
       }
       if(tx.hash){
        setAddress('');
        setAmount('0');
        setHash(tx.hash);
        setSuccess(true);
        setLoading(false);
        await tx.wait();
       } 


    }

  return (
    <div className='flex items-center justify-center flex-col gap-4'>
          <div className='text-2xl font-bold'>Transfer ERC-20 Tokens to another Account</div>
          <Button color='blue' variant='light' size='xs' className='text-blue-500 hover:bg-blue-200 bg-blue-100 font-medium' onClick={backClick}>Back to My Wallet</Button>
          <div className='w-full flex flex-col py-4 gap-y-4'>
          <TextInput placeholder="Start with '0x'" label="MultiSig Wallet Address" withAsterisk className='w-full' value={safeAddress} onChange={handleSafeAddressChange} error={error}/>
          <TextInput placeholder="Start with '0x'" label="Recepient Address" withAsterisk className='w-full' value={address} onChange={handleAddressChange} error={error}/>
          <TextInput placeholder="0" label="DAI to Transfer" withAsterisk className='w-full' value={amount}  onChange={handleAmountChange} error={error}/>
          </div>
          <Button color='blue' variant='filled' size='sm' className='bg-blue-500 hover:bg-blue-600 font-medium' onClick={handleSubmit} loading={loading} >Transfer DAI</Button>
         {success?  <div className=' text-green-500'>Transfer Completed successfully. Transaction hash: {hash}</div>: null}
        </div>
  )
}
