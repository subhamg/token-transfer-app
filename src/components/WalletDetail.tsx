import { Button } from '@mantine/core'
import React from 'react'

interface IProps {
    balance: string;
    address: string;
    refreshBalance: () => void;
    transferETH: () => void;
}

export const WalletDetail = ({balance, address, refreshBalance, transferETH}: IProps) => {
  return (
    <div className='flex items-center justify-center flex-col gap-4'>
          <div className='text-2xl font-bold'>Your Wallet Balance</div>
          <div className='text-lg font-bold'>Address: <span className='font-normal'>{address}</span></div>
          <div className='text-4xl font-bold'>{balance} ETH</div>
          <div className='flex items-center gap-x-4 mt-4'><Button color='blue' variant='light' size='xs' className='text-blue-500 hover:bg-blue-200 bg-blue-100 font-medium' onClick={refreshBalance}>Refresh balance</Button>
          <Button color='blue' variant='filled' size='xs' className='bg-blue-500 hover:bg-blue-600 font-medium' onClick={transferETH}>Transfer ETH</Button>
          </div>
        </div>
  )
}
