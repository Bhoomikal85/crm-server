require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB(process.env.DB_URI);

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to CRM Server!');
});

// Routes
app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes);

// Error handler
app.use(errorHandler);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
