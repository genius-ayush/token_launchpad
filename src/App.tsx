import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// wallet adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { ThemeProvider } from './components/theme-provider';
import LandingPage from './components/LandingPage';
import TokenLaunchpad from './components/TokenLaunchpad';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/WD0bp8fzGoX7oGVplbbqc"}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create-token" element={<TokenLaunchpad />} />
              </Routes>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
