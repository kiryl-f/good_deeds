'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define a type for the Deed
interface Deed {
  id: number;
  title: string;
  description: string;
}

const DeedsPage = () => {
  const [deeds, setDeeds] = useState<Deed[]>([]); // Use the Deed type for the deeds array
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchDeeds = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.id) {
      setError('No user found. Please log in.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/deeds/${user.id}`);
      setDeeds(response.data); // TypeScript now knows that response.data is a Deed[]
    } catch (error) {
      setError('Failed to fetch deeds');
    }
  };

  useEffect(() => {
    fetchDeeds();
  }, []);

  const handleAddDeed = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.id) {
      setError('No user found. Please log in.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/deeds', {
        title,
        description,
        userId: user.id, // Send userId with the deed
      });
      setSuccess('Deed added successfully!');
      setTitle('');
      setDescription('');
      fetchDeeds(); // Refresh the deeds list
    } catch (error) {
      setError('Failed to add deed');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Good Deeds</h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <ul className="mb-6">
        {deeds.map((deed) => (
          <li key={deed.id} className="mb-4">
            <strong>{deed.title}</strong> - {deed.description}
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddDeed} className="space-y-4">
        <div>
          <label className="block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div>
          <label className="block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Deed
        </button>
      </form>
    </div>
  );
};

export default DeedsPage;
