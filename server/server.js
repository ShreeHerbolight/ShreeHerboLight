const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is alive!', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  console.log('💓 Heartbeat: Root route hit!');
  res.send('Sree HerboLight API is running...');
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ CRITICAL: MONGODB_URI is not defined in environment variables!');
}

// Connect to MongoDB with optimized settings for serverless
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('✅ Using existing DB connection');
    return;
  }
  
  console.log('⏳ Connecting to MongoDB Atlas...');
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
      socketTimeoutMS: 45000,
    });
    console.log('✅ Successfully connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    throw err; // Ensure the error is reported
  }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
