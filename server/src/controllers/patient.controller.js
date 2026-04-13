import User from '../models/User.js';
import Appointment from '../models/Appointment.js';

// @desc    Get the logged-in patient's profile and visit history
// @route   GET /api/patients/profile
// @access  Private (Requires token)
export const getPatientProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch this specific patient's appointments
    const appointments = await Appointment.find({ patientName: user.name }).sort({ date: 1 });

    // Split into past and upcoming based on today's date
    const today = new Date().toISOString().split('T')[0];
    const upcoming = appointments.filter(apt => apt.date >= today && apt.status !== 'Canceled');
    const past = appointments.filter(apt => apt.date < today || apt.status === 'Canceled');

    res.json({
      profile: user,
      visits: { upcoming, past }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all registered patients (for the staff dashboard)
// @route   GET /api/patients
// @access  Private (Staff only)
export const getAllPatients = async (req, res, next) => {
  try {
    // Find all users who are explicitly registered as patients
    const patients = await User.find({ role: 'patient' }).select('-password');
    res.json(patients);
  } catch (error) {
    next(error);
  }
};
