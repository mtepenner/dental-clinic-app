import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Example of a protected route to get the currently logged-in user's profile
router.get('/me', requireAuth, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
