import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import UserCard from '../components/user_card';

interface User {
  id: number;
  name: string;
  username: string;
  goodDeedsCount: number; // Add any other fields you need here
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]); // Define the state as an array of User
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data); // Make sure the backend sends data in the correct format
      } catch (err) {
        setError('Failed to fetch users.');
      }
    };
    fetchUsers();
  }, []);

  const handleAddFriend = async (userId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    try {
      await axios.post(`http://localhost:3001/friends/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Friend added successfully!');
    } catch (error) {
      alert('Failed to add friend.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      <main className="flex-grow container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center mb-6">Users</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onAddFriend={handleAddFriend} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
