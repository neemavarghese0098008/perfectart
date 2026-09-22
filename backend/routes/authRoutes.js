import express from 'express';
import { login, getMe, updatePassword } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', requireAuth, getMe);
router.put('/update-password', requireAuth, updatePassword);

export default router;
