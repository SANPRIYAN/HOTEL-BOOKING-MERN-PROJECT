const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // <- Make sure this is at the top

const GuestModel = require('./models/Guest');
const BookingModel = require('./models/Booking');
const RoomModel = require('./models/Room');
const RequestModel = require('./models/Request');
const app = express();
app.use(express.json());
app.use(cors());

// ✅ Updated Mongoose connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if ((username === 'Sanjay' && password === 'sanjay07') || (username === 'Sakunthala' && password === 'sakunthala73')) {
      return res.json('Admin Success');
    }

    const user = await GuestModel.findOne({ username });

    if (user) {
      if (user.password === password) {
        res.json('Success');
      } else {
        res.json('Wrong Password');
      }
    } else {
      res.json('User Not Found');
    }
  } catch (err) {
    res.status(500).json('Server Error');
  }
});

app.post('/signup', async (req, res) => {
  try {
    const guest = await GuestModel.create(req.body);
    res.json(guest);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/api/bookings', async (req, res) => {
  const bookingData = req.body;
  const { category } = bookingData;

  if (!bookingData.name || !bookingData.contact || !bookingData.email || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const room = await RoomModel.findOneAndUpdate(
      { block: category, status: 'Available' },
      { status: 'Occupied' },
      { new: true }
    );

    if (room) {
      bookingData.roomId = room._id;
      const booking = await BookingModel.create(bookingData);
      res.status(201).json(booking);
    } else {
      res.status(400).json({ message: 'No available rooms in this category' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await RoomModel.findByIdAndUpdate(booking.roomId, { status: 'Available' });
    await booking.remove();

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate('roomId');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
// Get all requests (admin)
app.get('/api/requests', async (req, res) => {
  try {
    const requests = await RequestModel.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user-specific requests
app.get('/api/requests/user/:username', async (req, res) => {
  try {
    const requests = await RequestModel.find({ username: req.params.username });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user request (MISSING)
app.post('/api/requests', async (req, res) => {
  try {
    const { username, message } = req.body;
    const newRequest = new RequestModel({ username, message });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// PATCH or POST /api/requests/:id/reply
app.post('/api/requests/:id/reply', async (req, res) => {
  try {
    const { sender, message } = req.body;
    const { id } = req.params;

    const updated = await RequestModel.findByIdAndUpdate(
      id,
      {
        reply: message,
        repliedBy: sender
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
