import { dbQuery, dbGet, dbRun } from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllArticles = async (req, res) => {
  try {
    const { status } = req.query;
    let sql = 'SELECT * FROM articles';
    const params = [];

    if (status) {
      sql += ' WHERE status = ?';
      params.push(status);
    }

    sql += ' ORDER BY order_index ASC, id DESC';
    const articles = await dbQuery(sql, params);

    return res.status(200).json({ success: true, count: articles.length, data: articles });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await dbGet('SELECT * FROM articles WHERE id = ?', [id]);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createArticle = async (req, res) => {
  try {
    const { title, date, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required.' });
    }

    let img = '';
    if (req.file) {
      img = `/uploads/articles/${req.file.filename}`;
    } else if (req.body.img) {
      img = req.body.img;
    } else {
      return res.status(400).json({ success: false, message: 'Thumbnail image is required.' });
    }

    const articleDate = date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const articleStatus = status || 'published';

    const result = await dbRun(
      'INSERT INTO articles (title, date, img, description, status, updated_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
      [title, articleDate, img, description || '', articleStatus]
    );

    const created = await dbGet('SELECT * FROM articles WHERE id = ?', [result.lastID]);
    return res.status(201).json({ success: true, message: 'Article created successfully', data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, description, status } = req.body;

    const existing = await dbGet('SELECT * FROM articles WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    let img = existing.img;
    if (req.file) {
      img = `/uploads/articles/${req.file.filename}`;
      if (existing.img && existing.img.startsWith('/uploads/articles/')) {
        const oldPath = path.resolve(__dirname, '..', existing.img.replace(/^\//, ''));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    } else if (req.body.img) {
      img = req.body.img;
    }

    const aTitle = title || existing.title;
    const aDate = date || existing.date;
    const aDesc = description !== undefined ? description : existing.description;
    const aStatus = status || existing.status;

    await dbRun(
      'UPDATE articles SET title = ?, date = ?, img = ?, description = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [aTitle, aDate, img, aDesc, aStatus, id]
    );

    const updated = await dbGet('SELECT * FROM articles WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Article updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await dbGet('SELECT * FROM articles WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    if (existing.img && existing.img.startsWith('/uploads/articles/')) {
      const imgPath = path.resolve(__dirname, '..', existing.img.replace(/^\//, ''));
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await dbRun('DELETE FROM articles WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};
