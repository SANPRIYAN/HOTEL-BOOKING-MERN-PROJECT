import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReplyForm from './ReplyForm';
import { BiMessageSquareX } from 'react-icons/bi';
import { FaRegListAlt } from 'react-icons/fa';

export default function RequestList({ username, role }) {
  const [requests, setRequests] = useState([]);
  const backendURL = 'http://localhost:3000';

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const url =
          role === 'admin'
            ? `${backendURL}/api/requests`
            : `${backendURL}/api/requests/user/${username?.trim()}`;

        const res = await axios.get(url);
        const data = res.data;

        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          console.warn('Expected array but got:', data);
          setRequests([]);
        }
      } catch (err) {
        console.error('Error fetching requests:', err);
        setRequests([]);
      }
    };

    fetchRequests();
  }, [username, role]);

  // If no requests (Admin only)
  if (requests.length === 0 && role === 'admin') {
    return (
      <div
        style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: 'rgba(23, 37, 42, 0.95)',
          borderRadius: '16px',
          border: '1px solid #3AAFA9',
          color: '#DEF2F1',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(58, 175, 169, 0.2)',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          fontFamily: "'Cinzel Decorative', 'Arial', sans-serif",
        }}
      >
        <BiMessageSquareX size={40} style={{ marginBottom: '8px', color: '#3AAFA9' }} />
        No requests found.
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2
        style={{
          color: '#3AAFA9',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: "'Cinzel Decorative', 'Arial', sans-serif",
          fontSize: '1.8rem',
          marginBottom: '1.5rem',
        }}
      >
        <FaRegListAlt />
        Request List
      </h2>

      {requests.map((req) => (
        <div
          key={req._id}
          style={{
            backgroundColor: 'rgba(23, 37, 42, 0.95)',
            border: '1px solid #2A3B3E',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(58, 175, 169, 0.2)',
            marginBottom: '1.5rem',
            fontFamily: "'Cinzel Decorative', 'Arial', sans-serif",
            color: '#DEF2F1',
          }}
        >
          <p>
            <strong style={{ color: '#3AAFA9' }}>From:</strong> {req.username}
          </p>
          <p>
            <strong style={{ color: '#3AAFA9' }}>Message:</strong> {req.message}
          </p>

          {req.reply ? (
            <p style={{ color: '#4CAF50', marginTop: '0.5rem' }}>
              <strong>Reply from {req.repliedBy || 'Admin'}:</strong> {req.reply}
            </p>
          ) : (
            <p style={{ color: '#aaa', marginTop: '0.5rem' }}>
              <em>No reply yet</em>
            </p>
          )}

          {role === 'admin' && (
            <div style={{ marginTop: '1rem' }}>
              <ReplyForm requestId={req._id} sender="admin" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
