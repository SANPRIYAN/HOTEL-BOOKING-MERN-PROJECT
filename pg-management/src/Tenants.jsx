import React, { useState, useEffect } from 'react';
import { fetchBookings } from './api';

function Tenants() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await fetchBookings();
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          setError('Unexpected data format.');
        }
      } catch (err) {
        setError('Error fetching bookings. Please try again later.');
        console.error('Error fetching bookings:', err);
      }
    };

    getBookings();
  }, []);

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#17252A',
    color: '#DEF2F1',
    minHeight: '100vh',
    padding: '20px',
  };

  const headerStyle = {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#3AAFA9',
    fontSize: '28px',
  };

  const errorMessageStyle = {
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const tableWrapperStyle = {
    overflowX: 'auto',
  };

  const tableStyle = {
    width: '100%',
    maxWidth: '1200px',
    borderCollapse: 'collapse',
    margin: '0 auto',
    backgroundColor: '#2A3B3E',
    boxShadow: '0 0 15px rgba(58, 175, 169, 0.3)',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  const thTdStyle = {
    border: '1px solid #3AAFA9',
    padding: '8px',
    textAlign: 'left',
    fontSize: '14px',
    color: '#DEF2F1',
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: '#3AAFA9',
    color: '#17252A',
    fontWeight: 'bold',
  };

  const trEvenStyle = {
    backgroundColor: '#1B2D32',
  };

  const trHoverStyle = {
    backgroundColor: '#2B7A78',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Tenants Details</h2>

      {error && <p style={errorMessageStyle}>{error}</p>}
      
      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Marital Status</th>
              <th style={thStyle}>Guardian Name</th>
              <th style={thStyle}>Guardian Contact</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Check-In Date</th>
              <th style={thStyle}>Check-Out Date</th>
              <th style={thStyle}>Food Preference</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Room ID</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking._id}
                style={index % 2 === 0 ? trEvenStyle : null}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = index % 2 === 0 ? trEvenStyle.backgroundColor : '#2A3B3E')
                }
              >
                <td style={thTdStyle}>{booking.name || 'N/A'}</td>
                <td style={thTdStyle}>{booking.contact || 'N/A'}</td>
                <td style={thTdStyle}>{booking.email || 'N/A'}</td>
                <td style={thTdStyle}>{booking.maritalStatus || 'N/A'}</td>
                <td style={thTdStyle}>{booking.guardianName || 'N/A'}</td>
                <td style={thTdStyle}>{booking.guardianContact || 'N/A'}</td>
                <td style={thTdStyle}>{booking.address || 'N/A'}</td>
                <td style={thTdStyle}>
                  {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : 'N/A'}
                </td>
                <td style={thTdStyle}>
                  {booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : 'N/A'}
                </td>
                <td style={thTdStyle}>{booking.foodPreference || 'N/A'}</td>
                <td style={thTdStyle}>{booking.category || 'N/A'}</td>
                <td style={thTdStyle}>{booking.roomId ? booking.roomId._id : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tenants;
