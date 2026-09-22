import { dbQuery, dbGet, dbRun } from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllGallery = async (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM gallery';
    const params = [];

    if (category && category !== 'all') {
      sql += ' WHERE category = ?';
      params.push(category);
    }

    sql += ' ORDER BY order_index ASC, id DESC';
    const items = await dbQuery(sql, params);

    return res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await dbGet('SELECT * FROM gallery WHERE id = ?', [id]);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    }
    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createGalleryMultiple = async (req, res) => {
  try {
    const { category, title } = req.body;
    const selectedCategory = category || 'fitout';

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one image file is required.' });
    }

    const createdItems = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const src = `/uploads/gallery/${file.filename}`;
      const itemTitle = title
        ? (req.files.length > 1 ? `${title} ${i + 1}` : title)
        : path.parse(file.originalname).name.replace(/[-_]/g, ' ');

      const result = await dbRun(
        'INSERT INTO gallery (title, category, src, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
        [itemTitle, selectedCategory, src]
      );

      const inserted = await dbGet('SELECT * FROM gallery WHERE id = ?', [result.lastID]);
      createdItems.push(inserted);
    }

    return res.status(201).json({
      success: true,
      message: `${createdItems.length} image(s) uploaded successfully`,
      data: createdItems
    });
  } catch (error) {
    console.error('Error uploading gallery images:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category } = req.body;

    const existing = await dbGet('SELECT * FROM gallery WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    }

    const gTitle = title || existing.title;
    const gCategory = category || existing.category;

    await dbRun(
      'UPDATE gallery SET title = ?, category = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [gTitle, gCategory, id]
    );

    const updated = await dbGet('SELECT * FROM gallery WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Gallery item updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await dbGet('SELECT * FROM gallery WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    }

    if (existing.src && existing.src.startsWith('/uploads/gallery/')) {
      const imgPath = path.resolve(__dirname, '..', existing.src.replace(/^\//, ''));
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await dbRun('DELETE FROM gallery WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getAllGallery,
  getGalleryById,
  createGalleryMultiple,
  updateGalleryItem,
  deleteGalleryItem
};
