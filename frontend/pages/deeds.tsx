'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import DeedCard from '../components/deed_card';
import AddDeedModal from '../components/add_deed_modal';

interface Deed {
  id: number;
  title: string;
  description: string;
}

const DeedsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deeds, setDeeds] = useState<Deed[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      setUser(JSON.parse(user));
    }
  }, []);

  const fetchDeeds = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await axios.get(`http://localhost:3001/deeds/${user.id}`);
      setDeeds(response.data);
    } catch (error) {
      setError('Failed to fetch deeds');
    }
  };

  useEffect(() => {
    fetchDeeds();
  }, []);

  const handleAddDeed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.id) {
      setError('No user found. Please log in.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/deeds', {
        title,
        description,
        userId: user.id,
      });
      setSuccess('Deed added successfully!');
      setTitle('');
      setDescription('');
      fetchDeeds();
    } catch (error) {
      setError('Failed to add deed');
    }
  };

  const handleOpenModal = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      alert('You must be logged in to add a good deed.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setError(null);
    setSuccess(null);
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Head>
        <title>Good Deeds</title>
      </Head>
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-6">My Good Deeds</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <div className="flex flex-column w-full h-auto justify-center">
          {deeds.map((deed) => (
            <DeedCard key={deed.id} deed={deed} />
          ))}
        </div>

        {isLoggedIn && (
          <div className="mt-auto py-6 flex justify-center">
            <button
              onClick={handleOpenModal}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg"
            >
              Add Good Deed
            </button>

            <AddDeedModal isOpen={isModalOpen} onClose={handleCloseModal}>
              <h2 className="text-2xl font-bold mb-6 text-black text-center">Add a New Good Deed</h2>
              <form onSubmit={handleAddDeed} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Deed</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder='What good have you done? :)'
                    className="w-full px-3 py-2 border rounded text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder='Describe a good thing you have done recently e.g "fed a homeless kitten", etc'
                    className="w-full px-3 py-2 border rounded text-black"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Submit
                  </button>
                </div>
              </form>
            </AddDeedModal>
          </div>
        )}
      </main>
      <Footer />
    </main>
  );
};

export default DeedsPage;
