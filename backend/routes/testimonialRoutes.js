import express from 'express';
import {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);

// Admin protected routes
router.post('/', requireAuth, createTestimonial);
router.put('/:id', requireAuth, updateTestimonial);
router.delete('/:id', requireAuth, deleteTestimonial);

export default router;
