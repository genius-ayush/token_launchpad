import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// wallet adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from '@/components/ui/sonner'
import LandingPage from './components/LandingPage';
import TokenLaunchpad from './components/TokenLaunchpad';

function App() {
  const endpoint = import.meta.env.VITE_DEVNET_URL || "";
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create-token" element={<TokenLaunchpad />} />
              </Routes>
              <Toaster richColors closeButton position="bottom-right" />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
