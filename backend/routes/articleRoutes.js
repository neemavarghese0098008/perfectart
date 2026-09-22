import express from 'express';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} from '../controllers/articleController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../config/upload.js';

const router = express.Router();

router.get('/', getAllArticles);
router.get('/:id', getArticleById);

// Admin protected routes
router.post('/', requireAuth, upload.single('image'), createArticle);
router.put('/:id', requireAuth, upload.single('image'), updateArticle);
router.delete('/:id', requireAuth, deleteArticle);

export default router;
