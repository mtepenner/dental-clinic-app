import Appointment from '../models/Appointment.js';

const BUSINESS_HOURS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
];

export const appointmentService = {
  /**
   * Calculates available time slots for a given date
   */
  calculateAvailableSlots: async (date) => {
    const bookedAppointments = await Appointment.find({
      date,
      status: 'Scheduled',
    }).select('time');

    const bookedTimes = bookedAppointments.map((apt) => apt.time);
    return BUSINESS_HOURS.filter((time) => !bookedTimes.includes(time));
  },

  /**
   * Validates if a specific time slot is free to be booked
   */
  isSlotAvailable: async (date, time) => {
    // If it's outside business hours, it's invalid
    if (!BUSINESS_HOURS.includes(time)) return false;

    const existingBooking = await Appointment.findOne({ 
      date, 
      time, 
      status: 'Scheduled' 
    });
    
    // If an existing booking is found, the slot is NOT available
    return !existingBooking;
  }
};
