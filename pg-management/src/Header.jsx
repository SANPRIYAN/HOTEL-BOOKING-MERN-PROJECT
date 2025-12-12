import React from 'react';
import {
  BsJustify,
  BsSearch,
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
} from 'react-icons/bs';
import logo from './assets/lav.jpg';
import './dashboard.css';

function Header({ toggleSidebar }) {
  return (
    <header className="header" style={styles.header}>
      <div className="header-left" style={styles.left}>
        <div onClick={toggleSidebar} style={styles.iconWrap}>
          <BsJustify style={styles.icon} />
        </div>
        <div style={styles.brandContainer}>
          <img src={logo} alt="La Villa Logo" style={styles.logo} />
          <h2 style={styles.logoText}>La Villa</h2>
        </div>
      </div>
      <div className="header-right" style={styles.right}>
        <BsSearch style={styles.icon} />
        <BsFillBellFill style={styles.icon} />
        <BsFillEnvelopeFill style={styles.icon} />
        <BsPersonCircle style={styles.icon} />
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: 'rgba(23, 37, 42, 0.95)', // Background Card
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(58, 175, 169, 0.2)', // Accent shadow
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '40px',
    marginRight: '10px',
    borderRadius: '8px',
  },
  logoText: {
    fontSize: '22px',
    color: '#3AAFA9', // Accent Color
    fontFamily: 'MyCustomFont, sans-serif',
    margin: 0,
  },
  icon: {
    color: '#DEF2F1', // Text on Background
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  iconWrap: {
    marginRight: '20px',
  },
};

export default Header;
