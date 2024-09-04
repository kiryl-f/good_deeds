import React from 'react';
import Link from 'next/link';

import '../src/app/globals.css';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex-row text-lg font-bold">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={85} height={70} className="cursor-pointer" />
          </Link>
        </div>
        <nav className="space-x-14"> {/* Increased the spacing here */}
          <Link href="/" className="text-xl">Home</Link>
          <Link href="/deeds" className="text-xl">My Deeds</Link>
          <Link href="/friends" className="text-xl">Friends</Link>
          <Link href="/profile" className="text-xl">Profile</Link>
          <Link href="/login" className="text-xl">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
