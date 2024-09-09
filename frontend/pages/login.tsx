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
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Post the login data to the backend API
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      });

      // Store the token and user information in localStorage
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Show success message and redirect to user dashboard or profile page
      alert('Login successful!');
      router.push(`/users/${response.data.user.id}`); // Redirect to the user's profile
    } catch (error) {
      alert('Login failed!');
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
