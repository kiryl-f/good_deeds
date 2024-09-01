import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import Header from '../components/header';
import Signup from '../components/signup_form';


import '../src/app/globals.css';


import Footer from '../components/footer';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('submit')
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed!');
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <Header/>
      <Signup/>
      <Footer/>
    </div>
  );
}
