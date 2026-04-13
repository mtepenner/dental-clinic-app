import Appointment from '../models/Appointment.js';

// Business Rules
const BUSINESS_HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];

export const getAvailableSlots = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    // 1. Find all active appointments for this date
    const bookedAppointments = await Appointment.find({
      date,
      status: 'Scheduled',
    }).select('time');

    // 2. Extract just the time strings into an array
    const bookedTimes = bookedAppointments.map((apt) => apt.time);

    // 3. Filter the default business hours to only show available slots
    const availableSlots = BUSINESS_HOURS.filter((time) => !bookedTimes.includes(time));

    res.json({ slots: availableSlots });
  } catch (error) {
    next(error);
  }
};

export const bookAppointment = async (req, res, next) => {
  try {
    const { patientName, date, time, service } = req.body;

    // Check if slot is already taken (Race condition protection)
    const existingBooking = await Appointment.findOne({ date, time, status: 'Scheduled' });
    if (existingBooking) {
      return res.status(409).json({ message: 'This time slot has just been booked. Please choose another.' });
    }

    const newAppointment = await Appointment.create({
      patientName,
      date,
      time,
      service,
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
};

export const getDailySchedule = async (req, res, next) => {
  try {
    const { date } = req.query;
    // Find all appointments for the day, sorted by time
    const appointments = await Appointment.find({ date }).sort({ time: 1 });
    
    res.json({ appointments });
  } catch (error) {
    next(error);
  }
};

export const cancelAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'Canceled' },
      { new: true } // Returns the updated document
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    next(error);
  }
};
