import React, { useState } from 'react';
import axios from 'axios';

import image2 from './assets/room1.jpeg';
import Navbar from './Navbar';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupUsernameError, setSignupUsernameError] = useState('');
  const [signupPasswordError, setSignupPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    setSignupUsernameError('');
    setSignupPasswordError('');
    setConfirmPasswordError('');

    let valid = true;

    if (username === '') {
      setSignupUsernameError('Username is required.');
      valid = false;
    }

    if (password.length < 8) {
      setSignupPasswordError('Password must be at least 8 characters long.');
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    }

    if (valid) {
      axios.post('http://localhost:3000/signup', { username, password, confirmPassword })
        .then(result => {
          console.log(result);
          alert('Sign up successful! Please log in.');
          window.location.href = '/login';
        })
        .catch(error => console.log(error));
    }
  };

  return (<><Navbar/>
    <div style={styles.body}>
  <div style={styles.signupContainer}>
    
    <h2 style={styles.heading}>Sign Up</h2>
    <form id="signupForm" onSubmit={handleSignupSubmit}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={styles.input} />
        {signupUsernameError && <span style={styles.error}>{signupUsernameError}</span>}
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={styles.input} />
        {signupPasswordError && <span style={styles.error}>{signupPasswordError}</span>}
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={styles.input} />
        {confirmPasswordError && <span style={styles.error}>{confirmPasswordError}</span>}
      </div>
      <button
  type="submit"
  style={styles.button}
  onMouseEnter={e => e.target.style.backgroundColor = '#2B7A78'}
  onMouseLeave={e => e.target.style.backgroundColor = '#3AAFA9'}
>
  Sign Up
</button>



    </form>
    <p style={styles.signInText}>
      Already have an account? <a href="/login" style={styles.signInLink}>Login here</a>
    </p>
  </div>
</div>

  </>);
}

const styles = {
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${image2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#0f0f0f',
    fontFamily: 'Poppins, sans-serif',
  },
  signupContainer: {
    width: '380px',
    backgroundColor: 'rgba(23, 37, 42, 0.95)', // Updated card background
    padding: '35px',
    borderRadius: '14px',
    boxShadow: '0 10px 30px rgba(0,191,255,0.2)',
    textAlign: 'center',
    color: '#DEF2F1',
  },
  heading: {
    color: '#3AAFA9', // Accent
    marginBottom: '25px',
    fontSize: '26px',
  },
  formGroup: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    color: '#DEF2F1',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #3AAFA9',
    backgroundColor: '#2A3B3E',
    color: '#DEF2F1',
    fontSize: '15px',
    outline: 'none',
  },
  error: {
    display: 'block',
    marginTop: '5px',
    color: '#FF6B6B',
    fontSize: '0.9em',
  },
  button: {
    width: '50%',
    padding: '12px',
    backgroundColor: '#3AAFA9',
    color: '#17252A',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  signInText: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#ccc',
  },
  signInLink: {
    color: '#3AAFA9',
    textDecoration: 'underline',
    fontWeight: '500',
  },
};


export default Signup;