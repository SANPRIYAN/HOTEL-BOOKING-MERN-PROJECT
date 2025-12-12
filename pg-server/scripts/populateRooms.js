// seedRooms.js
require('dotenv').config({ path: '../.env' });

const mongoose = require('mongoose');
const RoomModel = require('../models/Room'); // path must match

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('✅ Connected to MongoDB');

  const rooms = [];

  for (let i = 1; i <= 10; i++) {
    rooms.push({ id: i.toString(), block: 'single', price: 100, status: 'Available' });
  }

  for (let i = 11; i <= 25; i++) {
    rooms.push({ id: i.toString(), block: 'double', price: 150, status: 'Available' });
  }

  for (let i = 26; i <= 50; i++) {
    rooms.push({ id: i.toString(), block: 'triple', price: 200, status: 'Available' });
  }

  try {
    await RoomModel.deleteMany({});
    await RoomModel.insertMany(rooms);
    console.log('✅ Rooms inserted successfully');
  } catch (error) {
    console.error('❌ Error inserting rooms:', error);
  } finally {
    mongoose.connection.close();
  }
}).catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err);
});
