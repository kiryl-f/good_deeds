import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null); // Logged in user's data
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
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      alert('You need to log in to access this page.');
      return;
    } else {
      console.log('Cool, you are logged in: ' + localStorage.getItem('user'));
    }
  
    try {
      const response = await axios.get('http://localhost:3001/deeds', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      console.log(response.data); // Handle the response
    } catch (error) {
      console.error('Error fetching deeds:', error);
    }
  };
  
  useEffect(() => {
    fetchDeeds();
  }, []);
  
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
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-center">
          {/* Profile Photo Placeholder */}
          <div className="flex justify-center mb-6">
            <Image
              src="/placeholder-profile.png" // You can replace this with an actual profile image path or leave it as a placeholder.
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
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
