import express from 'express';
import {
  getAllProjects,
  getProjectsByCategory,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../config/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/category/:category', getProjectsByCategory);
router.get('/:id', getProjectById);

// Admin protected routes
router.post('/', requireAuth, upload.single('image'), createProject);
router.put('/:id', requireAuth, upload.single('image'), updateProject);
router.delete('/:id', requireAuth, deleteProject);

export default router;
