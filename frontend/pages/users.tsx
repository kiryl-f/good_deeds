import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';

interface User {
  id: number;
  name: string;
  username: string;
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch the users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-l from-slate-50 to-cyan-600">
      <Head>
        <title>Users List</title>
      </Head>
      <Header />
      <main className="flex-grow bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Users List</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="mb-4">
                <Link href={`/users/${user.id}`}>
                  <a className="text-blue-500 hover:underline">{user.username}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
