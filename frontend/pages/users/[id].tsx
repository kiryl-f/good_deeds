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

interface Friend {
  id: number;
  name: string;
  username: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null); // Logged in user's data
  const [friends, setFriends] = useState<Friend[]>([]); // Friends list
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

  // Fetch the user's friends
  useEffect(() => {
    if (id) {
      const fetchFriends = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/friends`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setFriends(response.data);
        } catch (error) {
          setError('Failed to fetch friends.');
        }
      };
      fetchFriends();
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
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-center">
          {/* Profile Photo Placeholder */}
          <div className="flex justify-center mb-6">
            <Image
              src="/placeholder-profile.png"
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-gray-300"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{user.name}&apos;s Profile</h1>
          <p className="text-lg text-gray-600 mb-2"><strong>Username:</strong> {user.username}</p>
          <p className="text-lg text-gray-600 mb-6"><strong>Email:</strong> {user.email}</p>

          {/* Friends List */}
          <h2 className="text-2xl font-bold mb-4">Friends</h2>
          <ul>
            {friends.map((friend) => (
              <li key={friend.id} className="text-lg text-gray-600">
                {friend.name} ({friend.username})
              </li>
            ))}
          </ul>

          {/* Display logout button if this is the logged-in user's profile */}
          {isOwnProfile && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors mt-6"
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
