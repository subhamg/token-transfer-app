import { Button, Loader } from '@mantine/core'
import { connectToMetaMask, detectEthereum, getBalance, getERC20Balance } from '@/services/ether.service'
import {  useEffect, useState } from 'react';
import { TransferEthForm, TransferWithMultiSig, WalletDetail } from '@/components';
import { TransferERC20Form } from '@/components/TransferERC20Form';


export default function Home() {

  const [balance, setBalance] = useState<string>('');
  const [erc20Balance, setErc20Balance] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [ethTransfer, setEthTransfer] = useState<boolean>(false);
  const [erc20Transfer, setErc20Transfer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [multiSigTransfer, setMultiSigTransfer] = useState<boolean>(false);

  const connectWallet = async () => {
    const address = await connectToMetaMask();
    if (!address) return;
    const {balance, erc20Balance}  = await getBalance(address);
    setBalance(balance);
    setAddress(address);
    setErc20Balance(erc20Balance);
  }

  const refreshBalance = async () => {
    if (!address) return;
    const {balance, erc20Balance}  = await getBalance(address);
    setBalance(balance);
    setErc20Balance(erc20Balance);
  }

  useEffect(() => {
    const loadEthereumProvider = async () => {
      setIsLoading(true);
       const address = await detectEthereum();
        if(!address){
          setIsLoading(false);
          return;
        };
        const {balance, erc20Balance}  = await getBalance(address);
        setBalance(balance);
        setAddress(address);
        setErc20Balance(erc20Balance);
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
          ethTransfer ? <TransferEthForm backClick={() => setEthTransfer(false)} senderAddress={address} /> : 
          erc20Transfer ? <TransferERC20Form backClick={() => setErc20Transfer(false)} senderAddress={address} /> :
          multiSigTransfer? <TransferWithMultiSig backClick={() => setMultiSigTransfer(false)} senderAddress={address} /> :
          <WalletDetail balance={balance} usdcBalance={erc20Balance}  address={address} refreshBalance={refreshBalance} transferETH={() => setEthTransfer(true)}  transferERC20={() => setErc20Transfer(true)}  transferWithMultiSig={() => setMultiSigTransfer(true) }/>
        }
      </div>
    </div>
  )
}
