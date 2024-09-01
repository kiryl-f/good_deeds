import React from 'react';
import Link from 'next/link';

import '../src/app/globals.css';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-lg font-bold">
          <Link href="/">Good Deeds Platform</Link>
        </div>
        <nav className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/deeds">My Deeds</Link>
          <Link href="/friends">Friends</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
