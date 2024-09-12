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
}

interface GoodDeed {
  id: number;
  title: string;
  description: string;
  user: User;
}

interface UserWithDeeds {
  user: User;
  goodDeeds: GoodDeed[];
}

export default function UsersPage() {
  const [usersWithDeeds, setUsersWithDeeds] = useState<UserWithDeeds[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    }
  }, []);

  useEffect(() => {
    const fetchDeeds = async () => {
      try {
        const response = await axios.get('http://localhost:3001/deeds');
        const deeds: GoodDeed[] = response.data;

        const userMap: Record<number, UserWithDeeds> = {};

        deeds.forEach((deed) => {
          if (!userMap[deed.user.id]) {
            userMap[deed.user.id] = {
              user: deed.user,
              goodDeeds: [],
            };
          }
          userMap[deed.user.id].goodDeeds.push(deed);
        });

        const usersWithDeedsArray = Object.values(userMap);

        const filteredUsers = currentUser
          ? usersWithDeedsArray.filter((entry) => entry.user.id !== currentUser.id)
          : usersWithDeedsArray;

        setUsersWithDeeds(filteredUsers);
      } catch (err) {
        setError('Failed to fetch deeds');
      }
    };

    fetchDeeds();
  }, [currentUser]);

  // Handle adding a friend
  const handleAddFriend = async (userId: number) => {
    const token = localStorage.getItem('token');
    if (!token || !currentUser) {
      router.push('/login');
      return;
    }

    try {
      await axios.post(
        `http://localhost:3001/users/${currentUser.id}/friend-request`,
        { accepterId: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Friend request sent!');
    } catch (error) {
      alert('Friend request failed to send');
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
          {usersWithDeeds.map((entry) => (
            <UserCard
              key={entry.user.id}
              user={entry.user}
              goodDeeds={entry.goodDeeds}
              onAddFriend={handleAddFriend}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
