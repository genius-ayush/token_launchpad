import { Button } from './ui/button'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Wallet } from 'lucide-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

function WalletButton() {
    const {connected , disconnect} = useWallet() ; 
    const {setVisible} = useWalletModal() ; 
    if(!connected){
        <Button
        onClick={()=>setVisible(true)} className='bg-white'>
            <Wallet/>
        </Button>
    }
  return (
    <Button onClick={()=>disconnect} className='font-mono font-semibold'>Connect wallet</Button>
  )
}

export default WalletButton