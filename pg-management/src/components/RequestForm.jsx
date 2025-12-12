import { useState } from 'react';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';

export default function RequestForm({ username }) {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const backendURL = 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/api/requests`, { username, message });
      setSubmitted(true);
    } catch (err) {
      console.error('Error sending request:', err);
    }
  };

  if (submitted) {
    return (
      <div style={{
        backgroundColor: 'rgba(23, 37, 42, 0.95)', // card background
        color: '#3AAFA9',
        padding: '1rem',
        borderRadius: '10px',
        marginTop: '1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '18px',
        border: '2px solid #3AAFA9',
        boxShadow: '0 4px 12px rgba(58, 175, 169, 0.2)',
        fontFamily: "'Cinzel Decorative', sans-serif",
      }}>
        <FaCheckCircle />
        Request sent successfully!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: 'rgba(23, 37, 42, 0.95)', // card background
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(58, 175, 169, 0.2)',
      fontFamily: "'Cinzel Decorative', sans-serif",
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      <textarea
        placeholder="Type your request..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        style={{
          width: '100%',
          height: '100px',
          padding: '1rem',
          fontSize: '16px',
          border: '1px solid #3AAFA9',
          borderRadius: '10px',
          backgroundColor: '#2A3B3E', // dark input bg
          color: '#DEF2F1',
          resize: 'none',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          alignSelf: 'flex-end',
          backgroundColor: '#3AAFA9',
          color: '#ffffff',
          border: 'none',
          padding: '0.7rem 1.4rem',
          fontSize: '15px',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={e => e.target.style.backgroundColor = '#2B7A78'}
        onMouseLeave={e => e.target.style.backgroundColor = '#3AAFA9'}
      >
        <FiSend size={18} />
        Send Request
      </button>
    </form>
  );
}
