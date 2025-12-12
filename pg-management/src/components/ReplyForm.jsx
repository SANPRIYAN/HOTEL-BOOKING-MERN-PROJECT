import { useState } from 'react';
import axios from 'axios';

export default function ReplyForm({ requestId, sender }) {
  const [message, setMessage] = useState('');
  const backendURL = 'http://localhost:3000';

  const sendReply = async () => {
    if (!message.trim()) return;
    await axios.post(`${backendURL}/api/requests/${requestId}/reply`, {
      sender,
      message,
    });
    setMessage('');
    window.location.reload();
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
      <input
        type="text"
        placeholder="Reply..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          flex: 1,
          padding: '0.6rem 1rem',
          border: '1px solid #2A3B3E',
          borderRadius: '8px',
          backgroundColor: '#1f2b2e',
          color: '#DEF2F1',
          fontSize: '1rem',
          fontFamily: "'Cinzel Decorative', sans-serif",
          outline: 'none',
        }}
      />
      <button
        onClick={sendReply}
        style={{
          padding: '0.6rem 1.2rem',
          backgroundColor: '#3AAFA9',
          color: '#DEF2F1',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontFamily: "'Cinzel Decorative', sans-serif",
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#2B7A78')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#3AAFA9')}
      >
        Reply
      </button>
    </div>
  );
}
