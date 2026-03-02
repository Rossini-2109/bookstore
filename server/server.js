const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log('Request body:', req.body);
  next();
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore', {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
  console.log('📊 Database:', process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('🔧 Please check:');
  console.error('   1. MongoDB is running (mongod.exe)');
  console.error('   2. Connection string is correct');
  console.error('   3. Database name exists');
  process.exit(1);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/reviews', require('./routes/reviews'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Bookstore API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});