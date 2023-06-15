import "../styles/globals.css";
import '@suiet/wallet-kit/style.css';
import { NavBar } from "../components/NavBar";
import type { AppProps } from "next/app";
import {
  WalletProvider,
  AllDefaultWallets
} from '@suiet/wallet-kit';

function WalletSelector({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider defaultWallets={AllDefaultWallets}>
      <div className="px-8 ">
        <NavBar />
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </WalletProvider>
  );
}

export default WalletSelector;
