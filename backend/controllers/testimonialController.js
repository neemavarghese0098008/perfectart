import { dbQuery, dbGet, dbRun } from '../config/db.js';

export const getAllTestimonials = async (req, res) => {
  try {
    const { activeOnly } = req.query;
    let sql = 'SELECT * FROM testimonials';
    const params = [];

    if (activeOnly === 'true' || activeOnly === '1') {
      sql += ' WHERE is_active = 1';
    }

    sql += ' ORDER BY order_index ASC, id DESC';
    const testimonials = await dbQuery(sql, params);

    return res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await dbGet('SELECT * FROM testimonials WHERE id = ?', [id]);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }
    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, role, message, is_active } = req.body;

    if (!name || !role || !message) {
      return res.status(400).json({ success: false, message: 'Name, role, and message are required.' });
    }

    const active = is_active === 0 || is_active === '0' || is_active === false ? 0 : 1;

    const result = await dbRun(
      'INSERT INTO testimonials (name, role, message, is_active, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
      [name, role, message, active]
    );

    const created = await dbGet('SELECT * FROM testimonials WHERE id = ?', [result.lastID]);
    return res.status(201).json({ success: true, message: 'Testimonial created successfully', data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, message, is_active } = req.body;

    const existing = await dbGet('SELECT * FROM testimonials WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }

    const tName = name || existing.name;
    const tRole = role || existing.role;
    const tMessage = message || existing.message;
    const tActive = is_active !== undefined ? (is_active === 1 || is_active === '1' || is_active === true ? 1 : 0) : existing.is_active;

    await dbRun(
      'UPDATE testimonials SET name = ?, role = ?, message = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [tName, tRole, tMessage, tActive, id]
    );

    const updated = await dbGet('SELECT * FROM testimonials WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Testimonial updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await dbGet('SELECT * FROM testimonials WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }

    await dbRun('DELETE FROM testimonials WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
