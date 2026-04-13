import express from 'express';
import {
  getAvailableSlots,
  bookAppointment,
  getDailySchedule,
  cancelAppointment,
} from '../controllers/appointment.controller.js';

const router = express.Router();

// Public Patient Routes
router.get('/slots', getAvailableSlots);
router.post('/book', bookAppointment);

// Staff Routes (In production, these should be protected by an auth middleware)
router.get('/daily', getDailySchedule);
router.put('/:id/cancel', cancelAppointment);

export default router;
