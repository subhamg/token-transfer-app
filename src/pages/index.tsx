import { Button, Loader } from '@mantine/core'
import { connectToMetaMask, detectEthereum, getBalance } from '@/services/ether.service'
import {  useEffect, useState } from 'react';
import { TransferEthForm, WalletDetail } from '@/components';


export default function Home() {

  const [balance, setBalance] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isTransfer, setIsTransfer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const connectWallet = async () => {
    const address = await connectToMetaMask();
    if (!address) return;
    const balance = await getBalance(address);
    setBalance(balance);
    setAddress(address);

  }

  const refreshBalance = async () => {
    if (!address) return;
    const balance = await getBalance(address);
    setBalance(balance);
  }

  useEffect(() => {
    const loadEthereumProvider = async () => {
      setIsLoading(true);
       const address = await detectEthereum();
        if(!address){
          setIsLoading(false);
          return;
        };
        const balance = await getBalance(address);
        setBalance(balance);
        setAddress(address);
        setIsLoading(false);
    }
    loadEthereumProvider();
  }, [])

  return (
    <div className={'mx-20  my-20 '}>
      <div className="mx-auto container flex flex-col gap-y-7 justify-center items-center text-gray-700">
        <div className='flex flex-col gap-y-10 mx-auto justify-center items-center'>
          <div className='text-6xl font-bold capitalize'>Token transfer app</div>
        </div>
        {isLoading ? <Loader color="gray" size="xl" className='mt-4' /> : 
        !balance || !address ? <Button color='blue' variant='filled' size='md' className='bg-blue-500 hover:bg-blue-600 font-medium' onClick={connectWallet}>Connect your wallet</Button> :
          isTransfer ? <TransferEthForm backClick={() => setIsTransfer(false)} senderAddress={address} /> : 
          <WalletDetail balance={balance} address={address} refreshBalance={refreshBalance} transferETH={() => setIsTransfer(true)} />
        }
      </div>
    </div>
  )
}
