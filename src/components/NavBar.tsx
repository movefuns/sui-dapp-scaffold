import React from 'react';
import Image from "next/image";
import { NavItem } from "./NavItem";
import { SuiConnect } from "./SuiConnect";

export function NavBar() {
  return (
    <nav className="bg-white">
      <div className="mx-auto">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            {/* logo */}
            <div className="flex items-center">
              <a className="py-4 px-2" href="/" rel="noreferrer">
                <Image src="/logo.jpg" className="rounded-full" width={84} height={84} alt="logo" />
              </a>
            </div>
            {/* NavBar item */}
            <div className="hidden md:flex items-center transition duration-300">
              <NavItem href="/" title="Hello World" />
            </div>
          </div>
          {/* SuiConnect button */}
          <div className="flex items-center space-x-3 transition duration-300">
            <SuiConnect />
          </div>
      </div>
  </div>
</nav>
  );
}
