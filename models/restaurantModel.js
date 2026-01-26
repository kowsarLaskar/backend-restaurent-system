const mongoose = require('mongoose');

// schema
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
  },
  imageUrl: {
    type: String,
  },
  foods: {
    type: Array,
  },
  time: {
    type: String,
  },
  pickUp: {
    type: Boolean,
    default: true,
  },
  delivery: {
    type: Boolean,
    default: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  logoUrls: {
    type: String,
  },
  rating: {
    type: Number,
    default: 2.0,
    min: 1,
    max: 5,
  },
  code: {
    type: String,
  },
  coordinates: {
    id: { type: String },
    longitude: { type: Number },
    longitudeDelta: { type: Number },
    latitude: { type: Number },
    latitudeDelta: { type: Number },
    address: { type: String },
    title: { type: String },
  },

}, { timestamps: true });

// Export
module.exports = mongoose.model('Restaurant', restaurantSchema);