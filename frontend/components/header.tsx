import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi'; // Import icons for hamburger menu

import '../src/app/globals.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex-row text-lg font-bold">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={85} height={70} className="cursor-pointer" />
          </Link>
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Navigation Links for larger screens */}
        <nav className="hidden md:flex space-x-10">
          <Link href="/" className="text-xl">Home</Link>
          <Link href="/deeds" className="text-xl">My Deeds</Link>
          <Link href="/friends" className="text-xl">Friends</Link>
          <Link href="/profile" className="text-xl">Profile</Link>
          <Link href="/login" className="text-xl">Login</Link>
        </nav>
      </div>

      {/* Mobile Menu (visible only when hamburger menu is clicked) */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-800 mr-6">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link href="/" className="text-xl" onClick={toggleMenu}>Home</Link>
            </li>
            <li>
              <Link href="/deeds" className="text-xl" onClick={toggleMenu}>My Deeds</Link>
            </li>
            <li>
              <Link href="/friends" className="text-xl" onClick={toggleMenu}>Friends</Link>
            </li>
            <li>
              <Link href="/profile" className="text-xl" onClick={toggleMenu}>Profile</Link>
            </li>
            <li>
              <Link href="/login" className="text-xl" onClick={toggleMenu}>Login</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
