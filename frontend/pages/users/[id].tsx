import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Image from 'next/image';
import Deed from '../../components/deed';  // Import the Deed component

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface DeedData {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null); // Logged-in user's data
  const [deeds, setDeeds] = useState<DeedData[]>([]); // User deeds
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query; // Profile being viewed

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setLoggedInUser(JSON.parse(user)); // Parse and store logged-in user data
    }
  }, []);
  
  // Fetch the profile data when the component mounts
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/users/${id}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
          setError('User not found');
        }
      };

      fetchUser();
    }
  }, [id]);

  const fetchDeeds = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/deeds/${id}`); // Assuming this is the endpoint to fetch user's deeds
      setDeeds(response.data); // Set deeds for the user
    } catch (error) {
      console.error('Error fetching deeds:', error);
    }
  };
  
  useEffect(() => {
    if (id) {
      fetchDeeds(); // Fetch deeds when user ID is available
    }
  }, [id]);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('user'); // Remove user info
    setLoggedInUser(null); // Clear logged-in user state
    router.push('/login'); // Redirect to login page
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  // Check if the logged-in user is viewing their own profile
  const isOwnProfile = loggedInUser && loggedInUser.id === user.id;

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>{user.name}&apos;s Profile</title>
      </Head>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-center">
          {/* Profile Photo Placeholder */}
          <div className="flex justify-center mb-6">
            <Image
              src="/placeholder-profile.png" // Replace with actual profile image if available
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-gray-300"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{user.name}&apos;s Profile</h1>
          <p className="text-lg text-gray-600 mb-2"><strong>Username:</strong> {user.username}</p>
          <p className="text-lg text-gray-600 mb-6"><strong>Email:</strong> {user.email}</p>

          {/* Display logout button if this is the logged-in user's profile */}
          {isOwnProfile && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors mb-6"
            >
              Logout
            </button>
          )}

          {/* Deeds List */}
          <h2 className="text-2xl font-bold mb-4">Good Deeds</h2>
          {deeds.length === 0 ? (
            <p className="text-gray-500">No deeds found.</p>
          ) : (
            <ul className="text-left">
              {deeds.map((deed) => (
                <Deed key={deed.id} {...deed} />  
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
