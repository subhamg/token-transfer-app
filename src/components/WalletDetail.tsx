import { Button } from '@mantine/core'
import { ArrowsClockwise } from '@phosphor-icons/react';
import Image from 'next/image';
import React from 'react'


interface IProps {
  usdcBalance: string;
  balance: string;
  address: string;
  refreshBalance: () => void;
  transferETH: () => void;
  transferERC20: () => void;
  transferWithMultiSig: () => void;
}

export const WalletDetail = ({ balance, address, usdcBalance, refreshBalance, transferETH, transferERC20, transferWithMultiSig }: IProps) => {
  return (
    <div className='flex items-center justify-center flex-col gap-4'>
      <div className='text-2xl font-bold'>Your Wallet Balance</div>
      <div className='text-lg font-bold'>Address: <span className='font-normal'>{address}</span></div>
      <div className='text-4xl font-bold'>{balance} ETH</div>
      <div className='text-4xl font-bold py-2'>{usdcBalance} USDC</div>
      <div className='flex flex-col mt-4 gap-y-4 items-center justify-center'>
        <div>
        <Button color='blue' variant='light' size='xs' className='text-blue-500 hover:bg-blue-200 bg-blue-100 font-medium' onClick={refreshBalance} leftIcon={<ArrowsClockwise size={14}  weight="bold"/>}>Refresh balance</Button>
        </div>
        <div className='flex items-center gap-x-4 mt-4'>
          <Button color='blue' variant='filled' size='xs' className='bg-blue-500 hover:bg-blue-600 font-medium' onClick={transferETH} leftIcon={<Image src='eth.svg' alt='Eth' width={16} height={16} />}>Transfer ETH</Button>
          <Button color='blue' variant='filled' size='xs' className='bg-blue-500 hover:bg-blue-600 font-medium' onClick={transferERC20} leftIcon={<Image src='usdc.svg' alt='usdc' width={16} height={16} />}>Transfer ERC-20 Tokens</Button>
          <Button color='blue' variant='filled' size='xs' className='bg-blue-500 hover:bg-blue-600 font-medium' onClick={transferWithMultiSig} leftIcon={<Image src='usdc.svg' alt='USDC' width={16} height={16} />}>Transfer USDC from MultiSig Wallet</Button>
        </div>
      </div>

    </div>
  )
}
