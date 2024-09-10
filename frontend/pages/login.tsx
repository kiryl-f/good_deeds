import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import LoginForm from '../components/login_form';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Reset the error message when the form is submitted
    try {
      // Post the login data to the backend API
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      });

      // Store the token and user information in localStorage
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to the user's profile
      router.push(`/users/${response.data.user.id}`);
    } catch (error) {
      // Set the error message instead of showing an alert
      setErrorMessage('Incorrect username or password. Please try again.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Login</title>
      </Head>
      <Header />
      <main className="flex-grow">
        {/* Show error message if login fails */}
        {errorMessage && (
          <div className="text-red-600 text-center my-4">
            {errorMessage}
          </div>
        )}
        {/* Integrating the LoginForm component */}
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      </main>
      <Footer />
    </div>
  );
}
