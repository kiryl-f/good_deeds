import React from 'react';

import '../src/app/globals.css';
import RegisterForm from '../components/register_form';
import Footer from '../components/footer';
import Header from '../components/header';

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              login to your account
            </a>
          </p>
        </div>
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
}
