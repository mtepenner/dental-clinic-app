import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import appointmentRoutes from './src/routes/appointment.routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allows your React app to communicate with this server
app.use(express.json()); // Parses incoming JSON payloads

// Health Check Route
app.get('/', (req, res) => {
  res.json({ status: 'Server is running', message: 'BrightSmile Clinic API' });
});

// Mount Routes
app.use('/api/appointments', appointmentRoutes);

// Global Error Handler (Must be the last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
