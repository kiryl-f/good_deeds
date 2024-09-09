import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import LoginForm from '../components/login_form';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed! ' + error);
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <Header />
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
}
