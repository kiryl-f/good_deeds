import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import UserCard from '../components/user_card';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  username: string;
  goodDeedsCount: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // State for the current user
  const router = useRouter();

  useEffect(() => {
    // Ensure localStorage is accessed only in the browser
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        setCurrentUser(JSON.parse(user)); // Parse and store current user in state
      }
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        // Filter out the current user if available
        const filteredUsers = currentUser
          ? response.data.filter((user: User) => user.id !== currentUser.id)
          : response.data;
        setUsers(filteredUsers);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };

    if (currentUser !== null) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleAddFriend = async (userId: number) => {
    const token = localStorage.getItem('token');
    if (!token || !currentUser) {
      router.push('/login');  // Redirect to login if not logged in
      return;
    }

    try {
      await axios.post(
        `http://localhost:3001/users/${currentUser.id}/friend-request`,
        { accepterId: userId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert('Friend request sent!');
    } catch (error) {
      alert('Friend request sent!');
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
