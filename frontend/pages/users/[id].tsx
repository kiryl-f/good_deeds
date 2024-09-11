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
  sentFriendRequests: number[]; // Friend request IDs
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

  // Fetch logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch the profile and friends of the user being viewed
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

      const fetchFriends = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/users/${id}/friends`);
          setFriends(response.data);
        } catch (error) {
          console.error('Error fetching friends:', error);
          setError('Failed to fetch friends.');
        }
      };

      fetchUser();
      fetchFriends();
    }
  }, [id]);

  // Send friend request
  const handleSendFriendRequest = async (accepterId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      await axios.post(
        `http://localhost:3001/users/${accepterId}/friend-request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Friend request sent!');
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('Failed to send friend request.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedInUser(null);
    router.push('/login');
  };

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Check if logged-in user is viewing their own profile
  const isOwnProfile = loggedInUser && loggedInUser.id === user.id;

  return (
    <div className="flex flex-col min-h-screen">
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
            {friends.length > 0 ? (
              friends.map((friend) => (
                <li key={friend.id} className="text-lg text-gray-600">
                  {friend.name} ({friend.username})
                </li>
              ))
            ) : (
              <p className="text-gray-600">No friends found.</p>
            )}
          </ul>

          {/* Send Friend Request */}
          {!isOwnProfile && loggedInUser && !loggedInUser.sentFriendRequests.includes(user.id) && (
            <button
              onClick={() => handleSendFriendRequest(user.id)}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors mt-6"
            >
              Add Friend
            </button>
          )}

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
