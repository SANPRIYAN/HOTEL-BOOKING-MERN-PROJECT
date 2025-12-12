const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  username: String,
  message: String,
  reply: {
    type: String,
    default: ''
  },
  repliedBy: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);
