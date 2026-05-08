const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  catId: {
    type: String,
    required: true
  },
  subCatId: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  tagline: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number
  },
  badge: {
    type: String
  },
  rating: {
    type: Number,
    default: 4.5
  },
  reviews: {
    type: Number,
    default: 0
  },
  bg: {
    type: String,
    default: '#ffffff'
  },
  icon: {
    type: String,
    default: 'Package'
  },
  desc: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  details: {
    type: [String],
    default: []
  },
  weight: {
    type: String
  },
  stock: {
    type: Number,
    default: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
