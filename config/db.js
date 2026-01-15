const mongoose = require('mongoose');
const colors = require('colors');

// Mongodb connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(process.env.MONGO_URL);
    console.log(`Mongodb connected successfully ${mongoose.connection.host}`.bgGreen);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
  }
}

module.exports = connectDB;