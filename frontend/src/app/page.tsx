'use client'

import Head from "next/head";
import Footer from "../../components/footer";
import Header from "../../components/header";
import "./globals.css";
import Carousel from "../../components/carousel";
import Image from "next/image";
import Link from "next/link";

const DATA = [
  { image: '/carousel_imgs/image1.jpg', text: 'Text 1' },
  { image: '/carousel_imgs/image2.jpg', text: 'Text 2' },
  { image: '/carousel_imgs/image3.jpg', text: 'Text 3' },
]

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Head>
        <title>Good Deeds</title>
      </Head>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="text-white text-left py-10 px-6 md:py-20 md:px-10 lg:py-24 lg:px-16 md:ml-10 lg:ml-10 ml-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome to Good Deeds Platform</h1>
          <p className="text-lg md:text-2xl mb-8">Join us in making the world a better place, one good deed at a time.</p>
          <Link href="/register" className="bg-white text-blue-500 py-2 px-4 rounded-full font-semibold hover:bg-gray-200">
            Get Started
          </Link>
        </section>

        {/* Features Section */}
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
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Easy to Use</h3>
              <p>Our platform is designed with simplicity in mind, so you can focus on what matters.</p>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="container mx-auto py-10 md:py-16 lg:py-20">
          <Carousel data={DATA} />
        </section>

        {/* Call to Action Section */}
        <section className="text-white text-center py-10 md:py-16 lg:py-20 px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg md:text-xl mb-8">Sign up today and start your journey of positive impact.</p>
          <Link href="/register" className="text-xl text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-9 py-5 text-center me-2 mb-2 mt-5">
            Join Now
          </Link>
        </section>
      </main>
      <Footer />
    </main>
  );
}
