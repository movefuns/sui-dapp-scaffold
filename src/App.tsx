import React from 'react';
import MiniDrawer from './pages/header';
import Home from './pages/home';
import { WalletKitProvider } from '@mysten/wallet-kit';

export default function App() {
  return (
    <WalletKitProvider>
      <MiniDrawer />
      <Home />
    </WalletKitProvider>
  )
}
