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
// Verifying Environment Variable (Masked)
if (MONGODB_URI) {
  console.log(`📡 MONGODB_URI found! Starts with: ${MONGODB_URI.substring(0, 15)}...`);
} else {
  console.error('❌ CRITICAL: MONGODB_URI is MISSING!');
}

// Connect to MongoDB with optimized settings for serverless
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  console.log('⏳ Attempting Database Connection...');
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
      bufferCommands: false, // Don't queue commands if not connected
    });
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ DB Error:', err.message);
    throw err;
  }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  // Only wait for DB on non-health routes
  if (req.path === '/api/health') return next();
  
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
