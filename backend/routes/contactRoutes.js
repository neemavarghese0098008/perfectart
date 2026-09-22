import express from 'express';
import {
  getContactInfo,
  updateContactInfo,
  submitInquiry,
  submitQuote,
  getAllInquiries,
  getAllQuotes,
  deleteInquiry
} from '../controllers/contactController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/', getContactInfo);
router.post('/inquiry', submitInquiry);
router.post('/quote', submitQuote);

// Admin protected
router.put('/', requireAuth, updateContactInfo);
router.get('/inquiries', requireAuth, getAllInquiries);
router.get('/quotes', requireAuth, getAllQuotes);
router.delete('/inquiries/:id', requireAuth, deleteInquiry);

export default router;
