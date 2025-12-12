import React from 'react';
import RequestForm from './components/RequestForm';
import RequestList from './components/RequestList';
import './Requests.css';
import Navbar from './Navbar';
import { MdWarningAmber } from 'react-icons/md';
import { MdMarkEmailUnread } from 'react-icons/md'; // Mail with badge


export default function Requests() {
  const stored = localStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : null;

  if (!user) {
    return (
      <div className="request-warning">
  <MdWarningAmber size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
  Please log in to view your requests.
</div>
    );
  }

  const { username = '', role = 'user' } = user;

  return (
    <><Navbar/>
      <div className="request-page">
        <div className="request-card">
          <center>
  <h2 className="request-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
    <MdMarkEmailUnread size={28} />
    Requests
  </h2>
</center>
          {role !== 'admin' && <RequestForm username={username} />}
          <RequestList username={username} role={role} />
        </div>
      </div>
    </>
  );
}
