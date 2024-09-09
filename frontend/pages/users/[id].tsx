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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  // Fetch the user's profile data when the component mounts
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

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-l from-slate-50 to-cyan-600">
      <Head>
        <title>{user.name}`&apos;`s Profile</title>
      </Head>
      <Header />
      <main className="flex-grow bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">{user.name}&apos;s Profile</h1>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
