import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

import patientsRouter from './routes/patients.js';
import doctorsRouter from './routes/doctors.js';
import appointmentsRouter from './routes/appointments.js';

const app = express();
const PORT = process.env.PORT || 6000;

// Define the allowed origins for CORS
const allowedOrigins = [
  'https://hospital-app-taupe.vercel.app',  // Your frontend URL without the trailing slash
];

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);  // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS'));  // Reject the origin if it's not allowed
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allow these HTTP methods
  credentials: true,  // Allow cookies and other credentials
  preflightContinue: false,  // Handle OPTIONS request before continuing
  optionsSuccessStatus: 204,  // Success status for OPTIONS requests
}));

// Middleware to parse JSON requests
app.use(express.json());

// Handle OPTIONS request
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://hospital-app-taupe.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(204).end();
});

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed:', err));

// Basic route
app.get('/', (req, res) => {
  res.json("hello");
});

// Use routers for different resources
app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
