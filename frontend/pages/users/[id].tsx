import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';

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
    <div className="flex flex-col h-screen ">
      <Head>
        <title>{user.name}&apos;s Profile</title>
      </Head>
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">{user.name}&apos;s Profile</h1>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>

          {/* Display logout button if this is the logged-in user's profile */}
          {isOwnProfile && (
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
