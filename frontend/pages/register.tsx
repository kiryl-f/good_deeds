import React from 'react';

import '../src/app/globals.css';
import RegisterForm from '../components/register_form';
import Footer from '../components/footer';
import Header from '../components/header';
import Head from 'next/head';
import Link from 'next/link';

export default function Register() {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Create account</title>
      </Head>
      <Header />
      <div className="flex-grow flex flex-col justify-center bg-gradient-to-l from-slate-50 to-cyan-600 py-12 sm:px-6 lg:px-8">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
}
