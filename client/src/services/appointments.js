import api from './api';

export const appointmentService = {
  // Fetch available times for a specific date
  getAvailableSlots: async (dateString) => {
    try {
      const response = await api.get(`/appointments/slots?date=${dateString}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching slots:", error);
      throw error;
    }
  },

  // Submit a new booking
  bookAppointment: async (appointmentData) => {
    try {
      const response = await api.post('/appointments/book', appointmentData);
      return response.data;
    } catch (error) {
      console.error("Error booking appointment:", error);
      throw error;
    }
  }
};
