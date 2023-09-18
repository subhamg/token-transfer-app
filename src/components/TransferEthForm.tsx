import { transferEthereum } from '@/services/ether.service';
import { Button, TextInput } from '@mantine/core'
import React from 'react'

interface IProps {
    backClick: () => void;
    senderAddress: string;
}

export const TransferEthForm = ({ backClick, senderAddress }: IProps) => {

    const [address, setAddress] = React.useState<string>('');
    const [amount, setAmount] = React.useState<string>('0');
    const [error, setError] = React.useState<string>('');
    const [success, setSuccess] = React.useState<boolean>(false);
    const [hash, setHash] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
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
       const hash = await transferEthereum(senderAddress, address, parseFloat(amount).toString());
       if(hash){
        setAddress('');
        setAmount('0');
        setHash(hash);
        setSuccess(true);
        setLoading(false);
       } 


    }

  return (
    <div className='flex items-center justify-center flex-col gap-4'>
          <div className='text-2xl font-bold'>Transfer ETH to another Account</div>
          <Button color='blue' variant='light' size='xs' className='text-blue-500 hover:bg-blue-200 bg-blue-100 font-medium' onClick={backClick}>Back to My Wallet</Button>
          <div className='w-full flex flex-col py-4 gap-y-4'>
          <TextInput placeholder="Start with '0x'" label="Recepient Ethereum Address" withAsterisk className='w-full' value={address} onChange={handleAddressChange} error={error}/>
          <TextInput placeholder="0" label="ETH to Transfer" withAsterisk className='w-full' value={amount}  onChange={handleAmountChange} error={error}/>
          </div>
          <Button color='blue' variant='filled' size='sm' className='bg-blue-500 hover:bg-blue-600 font-medium' onClick={handleSubmit} loading={loading}>Transfer</Button>
         {success?  <div className=' text-green-500'>Transfer Completed successfully. Transaction hash: {hash}</div>: null}
        </div>
  )
}
