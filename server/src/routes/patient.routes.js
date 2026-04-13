import express from 'express';
import { getPatientProfile, getAllPatients } from '../controllers/patient.controller.js';
import { requireAuth, requireRole } from '../middlewares/requireAuth.js';

const router = express.Router();

// A patient must be logged in to view their own profile
router.get('/profile', requireAuth, getPatientProfile);

// ONLY clinic staff and admins can fetch the entire list of patients
router.get('/', requireAuth, requireRole('staff', 'admin'), getAllPatients);

export default router;
