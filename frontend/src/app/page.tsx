
'use client'

import Head from "next/head";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Signup from "../../components/login_form";
import "./globals.css";



export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Head>
        <title>Good Deeds</title>
      </Head>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-500 text-white text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Welcome to Good Deeds Platform</h1>
          <p className="text-lg mb-8">Join us in making the world a better place, one good deed at a time.</p>
          <a href="/register" className="bg-white text-blue-500 py-2 px-4 rounded-full font-semibold hover:bg-gray-200">
            Get Started
          </a>
        </section>

        {/* Features Section */}
        <section className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Track Your Good Deeds</h3>
              <p>Keep a log of all your good deeds and see how much impact you're making.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Connect with Friends</h3>
              <p>Join forces with friends and inspire each other to do more good.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
              <p>Our platform is designed with simplicity in mind, so you can focus on what matters.</p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gray-800 text-white text-center py-20">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8">Sign up today and start your journey of positive impact.</p>
          <a href="/register" className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600">
            Join Now
          </a>
        </section>
      </main>
      <Footer />
    </main>
  );
}
