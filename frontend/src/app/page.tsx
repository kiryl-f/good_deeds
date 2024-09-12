'use client';

import Head from "next/head";
import Footer from "../../components/footer";
import Header from "../../components/header";
import "./globals.css";
import Carousel from "../../components/carousel";
import Image from "next/image";
import Link from "next/link";
import AddDeedModal from "../../components/add_deed_modal";
import { useState, useEffect } from "react";
import axios from "axios";

const DATA = [
  { image: '/carousel_imgs/image1.jpg', text: 'At this photo you can see one of our users helping homeless kittens' },
  { image: '/carousel_imgs/image2.jpg', text: 'This is just an AI generated image that is supposed to be related to the topic of this app' },
  { image: '/carousel_imgs/image3.jpg', text: 'Pretty much the same situation here' },
];


interface Deed {
  id: number;
  title: string;
  description: string;
  user: {
    name: string;
  };
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deed, setDeed] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      setUser(JSON.parse(user));
    }
  }, []);

  const handleOpenModal = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      alert('You must be logged in to add a good deed.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDeed('');
    setDescription('');
    setError(null);
    setSuccess(null);
  };

  const handleAddDeed = async (e: React.FormEvent) => {
    e.preventDefault();



    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user || !user.id) {
        setError('User not found. You must be logged in to add a good deed.');
        return;
      }

      const response = await axios.post(
        'http://localhost:3001/deeds',
        {
          title: deed,
          description: description,
          userId: user.id  
        }
      );

      if (response.status === 201) {
        setSuccess('Good deed added successfully!');
        setDeed('');
        setDescription('');
        setError(null);
        setIsModalOpen(false);
      }
    } catch (err) {
      setError('Failed to add good deed. Please try again.');
    }
  };

  interface Deed {
    id: number;
    title: string;
    description: string;
    user: {
      name: string;
    };
    createdAt: string;
  }

  const [latestDeeds, setLatestDeeds] = useState<Deed[]>([]);

  const fetchLatestDeeds = async () => {
    try {
      const response = await axios.get('http://localhost:3001/deeds');
      const deeds = response.data;

      const latest = deeds
        .sort((a: Deed, b: Deed) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);

      setLatestDeeds(latest);
    } catch (error) {
      console.error('Error fetching latest deeds:', error);
    }
  };

  useEffect(() => {
    fetchLatestDeeds();
  }, []);



  return (
    <main className="flex flex-col min-h-screen">
      <Head>
        <title>Good Deeds</title>
      </Head>
      <Header />
      <main className="flex-grow">
        <section className="text-white text-left py-10 px-6 md:py-20 md:px-10 lg:py-24 lg:px-16 md:ml-16 lg:ml-24 ml-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome to Good Deeds Platform</h1>
          <p className="text-lg md:text-2xl mb-8">Join us in making the world a better place, one good deed at a time.</p>
          {!isLoggedIn && (
            <Link href="/register" className="bg-white text-blue-500 py-2 px-4 rounded-full font-semibold hover:bg-gray-200">
              Get Started
            </Link>
          )}
        </section>

        <section className="container mx-auto py-10 px-4 md:py-16 md:px-8 lg:py-20 lg:px-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center flex flex-col justify-center items-center">
              <Image src={'/landing1.png'} width={300} height={300} alt="Good Deeds" />
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Track Your Good Deeds</h3>
              <p>Keep a log of all your good deeds and see how much impact you are making.</p>
            </div>

            <div className="text-center flex flex-col justify-center items-center">
              <Image src={'/landing2.png'} width={300} height={300} alt="Good Deeds" />
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Connect with Friends</h3>
              <p>Join forces with friends and inspire each other to do more good.</p>
            </div>
            <div className="text-center flex flex-col justify-center items-center">
              <Image src={'/landing3.png'} width={300} height={300} alt="Good Deeds" />
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Easy to Use</h3>
              <p>Our platform is designed with simplicity in mind, so you can focus on what matters.</p>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-10 md:py-16 lg:py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg md:text-xl mb-8">See how we are making a difference together.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white">10,000+</h3>
                <p>Good Deeds Completed</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white">5,000+</h3>
                <p>Active Users</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white">50+</h3>
                <p>Countries Reached</p>
              </div>
            </div>
          </div>
        </section>


        <section className="container mx-auto py-10 md:py-16 lg:py-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">Latest Good Deeds</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestDeeds.map(deed => (
              <div key={deed.id} className="p-4 bg-gray-100 rounded-lg shadow-md transition-transform hover:scale-105 hover:shadow-xl">
                <h3 className="font-bold text-base text-gray-600 mb-4">{deed.title}</h3>
                <p className="text-gray-600">{deed.description}</p>
                <p className="text-gray-600 mt-2">by {deed.user.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto py-10 md:py-16 lg:py-20">
          <Carousel data={DATA} />
        </section>


        <section className="text-white text-center py-10 md:py-16 lg:py-20 px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg md:text-xl mb-8">Sign up today and start your journey of positive impact.</p>
          {!isLoggedIn && (
            <Link href="/register" className="text-xl text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-9 py-5 text-center me-2 mb-2 mt-5">
              Join Now
            </Link>
          )}
          {isLoggedIn && (
            <div className="flex justify-center container mx-auto px-4">
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
                      value={deed}
                      onChange={(e) => setDeed(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
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
        </section>
      </main>
      <Footer />
    </main>
  );
}
