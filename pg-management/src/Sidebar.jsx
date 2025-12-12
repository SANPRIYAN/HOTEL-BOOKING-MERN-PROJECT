import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BsFillHouseDoorFill, BsCalendarCheck, BsPersonFill, BsFillBarChartFill
} from 'react-icons/bs';
import {
  MdDashboard
} from 'react-icons/md';

import './dashboard.css'; // Keep for shared styles

function Sidebar({ isOpen }) {
  const location = useLocation(); 

  return (
    <aside
      className={`sidebar ${isOpen ? '' : 'sidebar-closed'}`}
      style={{
        backgroundColor: '#17252A', // dark background
        color: '#DEF2F1',
        minHeight: '100vh',
        paddingTop: '20px',
        transition: 'width 0.3s ease',
      }}
    >
      <ul className="sidebar-list" style={{ listStyle: 'none', padding: 0 }}>
        <li
          className={`sidebar-list-item ${location.pathname === '/' ? 'active' : ''}`}
          style={getItemStyle(location.pathname === '/')}
        >
          <Link to="/" style={linkStyle}>
            <BsFillHouseDoorFill className="icon" /> Home
          </Link>
        </li>
        <li
          className={`sidebar-list-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
          style={getItemStyle(location.pathname === '/dashboard')}
        >
          <Link to="/dashboard" style={linkStyle}>
            <MdDashboard className="icon" /> Dashboard
          </Link>
        </li>
        <li
          className={`sidebar-list-item ${location.pathname === '/dashboard/bookings' ? 'active' : ''}`}
          style={getItemStyle(location.pathname === '/dashboard/bookings')}
        >
          <Link to="/dashboard/bookings" style={linkStyle}>
            <BsCalendarCheck className="icon" /> Bookings
          </Link>
        </li>
        <li
          className={`sidebar-list-item ${location.pathname === '/dashboard/tenants' ? 'active' : ''}`}
          style={getItemStyle(location.pathname === '/dashboard/tenants')}
        >
          <Link to="/dashboard/tenants" style={linkStyle}>
            <BsPersonFill className="icon" /> Tenants
          </Link>
        </li>
        <li
          className={`sidebar-list-item ${location.pathname === '/dashboard/reports' ? 'active' : ''}`}
          style={getItemStyle(location.pathname === '/dashboard/reports')}
        >
          <Link to="/dashboard/reports" style={linkStyle}>
            <BsFillBarChartFill className="icon" /> Reports
          </Link>
        </li>
      </ul>
    </aside>
  );
}

// Accent and text styling
const accent = '#3AAFA9';
const hoverAccent = '#2B7A78';
const textColor = '#DEF2F1';

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: textColor,
  padding: '12px 20px',
  gap: '10px',
};

const getItemStyle = isActive => ({
  backgroundColor: isActive ? hoverAccent : 'transparent',
  borderLeft: isActive ? `4px solid ${accent}` : '4px solid transparent',
  transition: 'all 0.3s ease',
  marginBottom: '10px',
  borderRadius: '8px 0 0 8px',
});

export default Sidebar;
