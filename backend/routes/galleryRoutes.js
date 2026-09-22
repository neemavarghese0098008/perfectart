import express from 'express';
import {
  getAllGallery,
  getGalleryById,
  createGalleryMultiple,
  updateGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../config/upload.js';

const router = express.Router();

router.get('/', getAllGallery);
router.get('/:id', getGalleryById);

// Admin protected routes
router.post('/multiple', requireAuth, upload.array('images', 20), createGalleryMultiple);
router.put('/:id', requireAuth, updateGalleryItem);
router.delete('/:id', requireAuth, deleteGalleryItem);

export default router;
