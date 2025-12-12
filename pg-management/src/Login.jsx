import React, { useState } from 'react';
import image2 from './assets/room1.jpeg';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      (username === 'Sanjay' && password === 'sanjay07') ||
      (username === 'Sam' && password === 'sam05')
    ) {
      localStorage.setItem('user', JSON.stringify({ username, role: 'admin' }));
      navigate('/dashboard');
      return;
    }

    axios.post('http://localhost:3000/login', { username, password })
      .then(response => {
        const res = response.data;
        setMessage(res);

        if (res === 'Success') {
          localStorage.setItem('user', JSON.stringify({ username, role: 'user' }));
          navigate('/home');
        } else if (res === 'Admin Success') {
          localStorage.setItem('user', JSON.stringify({ username, role: 'admin' }));
          navigate('/dashboard');
        }
      })
      .catch(err => {
        console.error('Login error:', err);
        setMessage('Login failed. Check your credentials.');
      });
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundImage: `url(${image2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <div
          style={{
            width: '360px',
            backgroundColor: 'rgba(23, 37, 42, 0.95)',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 0 20px rgba(42, 122, 120, 0.5)',
            textAlign: 'center',
            color: '#DEF2F1',
          }}
        >
          <h2 style={{ marginBottom: '20px', color: '#3AAFA9' }}>Welcome Back</h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label htmlFor="username" style={{ fontWeight: '600', color: '#CBD5D8' }}>
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #3AAFA9',
                  backgroundColor: '#2A3B3E',
                  color: '#E0F7F7',
                  fontSize: '15px',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label htmlFor="password" style={{ fontWeight: '600', color: '#CBD5D8' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #3AAFA9',
                  backgroundColor: '#2A3B3E',
                  color: '#E0F7F7',
                  fontSize: '15px',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '50%',
                padding: '12px',
                background: 'linear-gradient(145deg, #3AAFA9, #2B7A78)',
                color: '#FEFFFF',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 12px rgba(42, 122, 120, 0.6)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#2B7A78';
                e.target.style.boxShadow = '0 0 16px rgba(42, 122, 120, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(145deg, #3AAFA9, #2B7A78)';
                e.target.style.boxShadow = '0 0 12px rgba(42, 122, 120, 0.6)';
              }}
            >
              Login
            </button>
          </form>

          <p style={{ marginTop: '20px', fontSize: '13px', color: '#A9B8BC' }}>
            Don’t have an account?{' '}
            <a href="/signup" style={{ color: '#3AAFA9', textDecoration: 'underline' }}>
              Sign up
            </a>
          </p>

          {message && (
            <div style={{ marginTop: '15px', color: '#FF6B6B', fontWeight: 'bold' }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
