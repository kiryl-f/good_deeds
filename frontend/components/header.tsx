import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi'; // Import icons for hamburger menu
import { useRouter } from 'next/navigation'; // To handle redirection

import '../src/app/globals.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // To store the logged-in user's ID
  const [userProfilePic, setUserProfilePic] = useState<string | null>(null); // To store the profile picture
  const [isMounted, setIsMounted] = useState(false); // To track if the component is mounted
  const router = useRouter(); // To handle redirection

  // Run this effect once on mount to check for client-side conditions like localStorage
  useEffect(() => {
    setIsMounted(true); // Now the component is mounted

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        const parsedUser = JSON.parse(user);
        setUserId(parsedUser.id); // Assuming the user object contains the 'id'
        setIsLoggedIn(true);

        // Optionally, set a profile picture if available in the user object
        if (parsedUser.profilePic) {
          setUserProfilePic(parsedUser.profilePic);
        }
      }
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProfileClick = () => {
    if (isLoggedIn && userId) {
      // Redirect to the user's profile if logged in
      router.push(`/users/${userId}`);
    } else {
      // Redirect to the login page if not logged in
      router.push('/login');
    }
  };

  // Ensure that the component renders only after it is mounted on the client
  if (!isMounted) {
    return null; // Avoid rendering during SSR
  }

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
        <nav className="hidden md:flex space-x-10 items-center">
          <Link href="/" className="text-xl">Home</Link>
          <Link href="/deeds" className="text-xl">My Deeds</Link>
          <Link href="/userboard" className="text-xl">Users</Link>
          
          {/* Show profile picture or placeholder when logged in */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <button onClick={handleProfileClick} className="text-xl">
                {userProfilePic ? (
                  <Image
                    src={userProfilePic}
                    alt="Profile Picture"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer">
                    <span className="text-white font-bold">U</span> {/* Placeholder */}
                  </div>
                )}
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-xl">Login</Link>
          )}
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
              <Link href="/userboard" className="text-xl" onClick={toggleMenu}>Users</Link>
            </li>
            {/* Profile button in mobile menu */}
            {isLoggedIn ? (
              <li>
                <button onClick={handleProfileClick} className="text-xl flex items-center space-x-2">
                  {userProfilePic ? (
                    <Image
                      src={userProfilePic}
                      alt="Profile Picture"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
                      <span className="text-white font-bold">U</span> {/* Placeholder */}
                    </div>
                  )}
                  <span>Profile</span>
                </button>
              </li>
            ) : (
              <li>
                <Link href="/login" className="text-xl" onClick={toggleMenu}>Login</Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
