import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Appointment from './models/Appointment.js';
import { mockUsers, getMockAppointments } from './data/mockData.js';

// Load environment variables so we can access MONGO_URI
dotenv.config();

// Connect to MongoDB
connectDB();

const importData = async () => {
  try {
    // 1. Wipe the database clean
    await Appointment.deleteMany();
    await User.deleteMany();

    console.log('Database Cleared.');

    // 2. Insert the mock users
    const createdUsers = await User.insertMany(mockUsers);
    
    // 3. Insert the mock appointments
    const mockAppointments = getMockAppointments();
    await Appointment.insertMany(mockAppointments);

    console.log('Mock Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Allows you to completely wipe the DB from the command line
    await Appointment.deleteMany();
    await User.deleteMany();

    console.log('Database Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// Check the command line arguments to see if we are importing or destroying
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
