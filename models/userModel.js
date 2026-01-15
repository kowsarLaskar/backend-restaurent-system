const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  address: {
    type: Array
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"]
  },
  userType: {
    type: String,
    required: [true, "User type is required"],
    default: 'client',
    enum: ['admin', 'client', 'vendor', 'delivery'],
  },
  profileImage: {
    type: String,
    default: 'https://cdn0.iconfinder.com/data/icons/illustricon-tech-iv/512/dude-1024.png'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)