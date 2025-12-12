import React, { useState, useEffect } from 'react';
import './Bookings.css';

const Bookings = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/rooms')
      .then(response => response.json())
      .then(data => {
        // Sort rooms by numerical ID (assumes room.id is numeric)
        const sorted = [...data].sort((a, b) => a.id - b.id);
        setRooms(sorted);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load room data.');
        setLoading(false);
      });
  }, []);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    // You can add modal/view logic here if needed
  };

  const block1 = rooms.slice(0, 25);
  const block2 = rooms.slice(25, 50);

  return (
    <div className="booking-container">
      <h1>Room Booking Management</h1>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color room-available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color room-occupied"></div>
          <span>Occupied</span>
        </div>
        
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="room-blocks">
        <div className="room-block">
          <h2>Block 1</h2>
          <div className="room-grid">
            {block1.map(room => (
              <div
                key={room.id}
                className={`room-square 
                  ${room.status === 'Available' ? 'room-available' : 'room-occupied'} 
                  ${room.type === 'Single' ? 'room-single' : ''} 
                  ${room.type === 'Double' ? 'room-double' : ''} 
                  ${room.type === 'Triple' ? 'room-triple' : ''}`}
                onClick={() => handleRoomClick(room)}
              >
                <span>{room.id}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="room-block">
          <h2>Block 2</h2>
          <div className="room-grid">
            {block2.map(room => (
              <div
                key={room.id}
                className={`room-square 
                  ${room.status === 'Available' ? 'room-available' : 'room-occupied'} 
                  ${room.type === 'Single' ? 'room-single' : ''} 
                  ${room.type === 'Double' ? 'room-double' : ''} 
                  ${room.type === 'Triple' ? 'room-triple' : ''}`}
                onClick={() => handleRoomClick(room)}
              >
                <span>{room.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedRoom && (
        <div className="room-details">
          <h3>Selected Room: {selectedRoom.id}</h3>
          <p>Status: {selectedRoom.status}</p>
          <p>Type: {selectedRoom.type}</p>
        </div>
      )}
    </div>
  );
};

export default Bookings;
