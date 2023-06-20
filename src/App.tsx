import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Routes
} from 'react-router-dom';
import { WalletKitProvider } from '@mysten/wallet-kit';
import Header from './common/header';
import Home from './pages/home';

export default function App() {
  return (
    
    <div>
      <WalletKitProvider>
        <Router>
            <Header/>
            <Routes>
              <Route path='/' element={ <Home /> }></Route>
            </Routes>
          </Router>
      </WalletKitProvider>
    </div>
  )
}
