import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/lav.jpg';
import fontPath from './assets/CinzelDecorative-Regular.ttf';
import './dashboard.css'; // Bootstrap icons etc.

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.role) {
          setIsLoggedIn(true);
          setIsAdmin(parsedUser.role === 'admin');
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    } catch (err) {
      console.error('Error reading user data:', err);
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const fontFace = `
      @font-face {
        font-family: 'MyCustomFont';
        src: url('${fontPath}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    try {
      styleSheet.insertRule(fontFace, styleSheet.cssRules.length);
    } catch (err) {
      console.error("Font load failed:", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/login');
    window.location.reload();
  };

  return (
    <header className="header" style={styles.header}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h2 style={styles.logoText}>La Villa</h2>
      </div>
      <nav style={styles.nav}>
        <Link to="/home" style={styles.navLink}>Home</Link>
        {isLoggedIn && <Link to="/clientbooking" style={styles.navLink}>Bookings</Link>}
        {isLoggedIn && <Link to="/request" style={styles.navLink}>Request</Link>}
        {isLoggedIn && isAdmin && <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>}
        {!isLoggedIn ? (
          <Link to="/login" style={styles.navLink}>Login</Link>
        ) : (
          <button onClick={handleLogout} style={{ ...styles.navLink, background: 'none', border: 'none', cursor: 'pointer' }}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    height: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    backgroundColor: '#17252A', // deep teal-black
    borderBottom: '2px solid #2B7A78', // primary teal border
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '50px',
    marginRight: '10px',
  },
  logoText: {
    fontSize: '24px',
    color: '#3AAFA9', // secondary teal
    margin: 0,
    fontFamily: 'MyCustomFont, sans-serif',
  },
  nav: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: '#FEFFFF', // white
    fontSize: '16px',
    background: 'none',
    border: 'none',
    padding: '4px 8px',
    transition: 'color 0.3s',
  },
};



export default Navbar;
