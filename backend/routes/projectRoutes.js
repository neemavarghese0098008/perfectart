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
const projectImageFields = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'image', maxCount: 1 }, // legacy admin clients
  { name: 'relatedImages', maxCount: 1000 }
]);
router.post('/', requireAuth, projectImageFields, createProject);
router.put('/:id', requireAuth, projectImageFields, updateProject);
router.delete('/:id', requireAuth, deleteProject);

export default router;
