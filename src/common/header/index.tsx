import React from 'react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@mysten/wallet-kit';

export default function Header() {
  return (
    <nav className="bg-white">
         <div className="mx-auto">
            <div className="flex justify-between">
                <div className="flex space-x-7">
                        {/* logo */}
                        <div className="flex items-center">
                            <a className="py-4 px-4" href="/" rel="noreferrer">
                                <img src="/logo.jpg" alt="logo" className='w-16 h-16 border-none rounded-full align-middle'/>
                            </a>
                        </div> 
                        <div className='hidden md:flex items-center text-2xl font-semibold hover:text-sky-600/80 transition duration-300'>
                            <Link to='/'>
                                <span className=''>Hello World</span>
                            </Link>
                        </div>   
                    </div>
                    <div className="py-4 px-4 flex items-center space-x-3 transition duration-300">
                    <ConnectButton connectText={'Connect Wallet'}/>
                    </div>  
            </div>
        </div>
    </nav>
  )
}
