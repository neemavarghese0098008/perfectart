import { dbQuery, dbGet, dbRun } from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATEGORY_MAP = {
  retail: 'Retail Outlet',
  fnb: 'F&B',
  corporate: 'Corporate Office',
  spa: 'Health Clubs & Spa',
  hospitality: 'Hospitality',
  residential: 'Villa & Residential'
};

export const getAllProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    let sql = 'SELECT * FROM projects WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (featured !== undefined) {
      sql += ' AND featured = ?';
      params.push(featured === '1' || featured === 'true' ? 1 : 0);
    }

    sql += ' ORDER BY order_index ASC, id DESC';
    const projects = await dbQuery(sql, params);

    return res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const projects = await dbQuery(
      'SELECT * FROM projects WHERE category = ? ORDER BY order_index ASC, id DESC',
      [category]
    );

    return res.status(200).json({
      success: true,
      category,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await dbGet('SELECT * FROM projects WHERE id = ?', [id]);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }
    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { category, category_label, title, place, country, description, featured } = req.body;

    if (!category || !title || !place) {
      return res.status(400).json({ success: false, message: 'Category, title, and place are required.' });
    }

    let img = '';
    if (req.file) {
      img = `/uploads/projects/${req.file.filename}`;
    } else if (req.body.img) {
      img = req.body.img;
    } else {
      return res.status(400).json({ success: false, message: 'Project main image is required.' });
    }

    const catLabel = category_label || CATEGORY_MAP[category] || category;
    const isFeatured = featured === '1' || featured === 'true' || featured === 1 ? 1 : 0;
    const projectCountry = country || 'Saudi Arabia';

    const result = await dbRun(
      `INSERT INTO projects (category, category_label, title, place, country, img, description, featured, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [category, catLabel, title, place, projectCountry, img, description || '', isFeatured]
    );

    const newProject = await dbGet('SELECT * FROM projects WHERE id = ?', [result.lastID]);

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, category_label, title, place, country, description, featured } = req.body;

    const existing = await dbGet('SELECT * FROM projects WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    let img = existing.img;
    if (req.file) {
      img = `/uploads/projects/${req.file.filename}`;
      // Optional: Delete old image if it was in /uploads/projects/
      if (existing.img && existing.img.startsWith('/uploads/projects/')) {
        const oldPath = path.resolve(__dirname, '..', existing.img.replace(/^\//, ''));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    } else if (req.body.img) {
      img = req.body.img;
    }

    const cat = category || existing.category;
    const catLabel = category_label || CATEGORY_MAP[cat] || existing.category_label;
    const projTitle = title || existing.title;
    const projPlace = place || existing.place;
    const projCountry = country || existing.country;
    const projDesc = description !== undefined ? description : existing.description;
    const isFeatured = featured !== undefined
      ? (featured === '1' || featured === 'true' || featured === 1 ? 1 : 0)
      : existing.featured;

    await dbRun(
      `UPDATE projects 
       SET category = ?, category_label = ?, title = ?, place = ?, country = ?, img = ?, description = ?, featured = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [cat, catLabel, projTitle, projPlace, projCountry, img, projDesc, isFeatured, id]
    );

    const updated = await dbGet('SELECT * FROM projects WHERE id = ?', [id]);

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await dbGet('SELECT * FROM projects WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    // Delete image file if stored locally in uploads
    if (existing.img && existing.img.startsWith('/uploads/projects/')) {
      const imgPath = path.resolve(__dirname, '..', existing.img.replace(/^\//, ''));
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await dbRun('DELETE FROM projects WHERE id = ?', [id]);

    return res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getAllProjects,
  getProjectsByCategory,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
