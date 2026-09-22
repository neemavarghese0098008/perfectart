import { dbGet, dbRun, dbQuery } from '../config/db.js';

export const getContactInfo = async (req, res) => {
  try {
    let info = await dbGet('SELECT * FROM contact_info WHERE id = 1');
    if (!info) {
      // Default fallback
      info = {
        id: 1,
        address: 'Building 3547, Hafsah Bint Omar, Al Nahdah District, Riyadh 13221, Kingdom of Saudi Arabia',
        phone_primary: '+966 57 979 7607',
        phone_secondary: '+966 11 456 0555',
        email: 'info@perfectartcontracting.com',
        whatsapp: '+966579797607',
        map_iframe_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.577265882329!2d46.77258957608821!3d24.707106451480112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f038f830bbefb%3A0x8e8331d22227d884!2sHafsah%20Bint%20Omar%2C%20Al%20Nahdah%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
        facebook_url: 'https://www.facebook.com/',
        twitter_url: 'https://www.twitter.com/',
        linkedin_url: 'https://www.linkedin.com/',
        youtube_url: 'https://www.youtube.com/'
      };
    }
    return res.status(200).json({ success: true, data: info });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateContactInfo = async (req, res) => {
  try {
    const {
      address,
      phone_primary,
      phone_secondary,
      email,
      whatsapp,
      map_iframe_url,
      facebook_url,
      twitter_url,
      linkedin_url,
      youtube_url
    } = req.body;

    await dbRun(
      `INSERT INTO contact_info (
        id, address, phone_primary, phone_secondary, email, whatsapp,
        map_iframe_url, facebook_url, twitter_url, linkedin_url, youtube_url, updated_at
      ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        address = excluded.address,
        phone_primary = excluded.phone_primary,
        phone_secondary = excluded.phone_secondary,
        email = excluded.email,
        whatsapp = excluded.whatsapp,
        map_iframe_url = excluded.map_iframe_url,
        facebook_url = excluded.facebook_url,
        twitter_url = excluded.twitter_url,
        linkedin_url = excluded.linkedin_url,
        youtube_url = excluded.youtube_url,
        updated_at = CURRENT_TIMESTAMP`,
      [
        address || '',
        phone_primary || '',
        phone_secondary || '',
        email || '',
        whatsapp || '',
        map_iframe_url || '',
        facebook_url || '',
        twitter_url || '',
        linkedin_url || '',
        youtube_url || ''
      ]
    );

    const updated = await dbGet('SELECT * FROM contact_info WHERE id = 1');
    return res.status(200).json({ success: true, message: 'Contact information updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating contact info:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitInquiry = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, phone, email, and message are required.' });
    }

    const result = await dbRun(
      'INSERT INTO contact_inquiries (name, phone, email, subject, message) VALUES (?, ?, ?, ?, ?)',
      [name, phone, email, subject || '', message]
    );

    return res.status(201).json({ success: true, message: 'Message sent successfully!', inquiryId: result.lastID });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitQuote = async (req, res) => {
  try {
    const { name, company, phone, email, city, service, budget, details } = req.body;
    if (!name || !phone || !email || !city || !service) {
      return res.status(400).json({ success: false, message: 'Name, phone, email, city, and service are required.' });
    }

    const result = await dbRun(
      `INSERT INTO quote_requests (name, company, phone, email, city, service, budget, details)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, company || '', phone, email, city, service, budget || '', details || '']
    );

    return res.status(201).json({ success: true, message: 'Quote request submitted successfully!', quoteId: result.lastID });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await dbQuery('SELECT * FROM contact_inquiries ORDER BY id DESC');
    return res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await dbQuery('SELECT * FROM quote_requests ORDER BY id DESC');
    return res.status(200).json({ success: true, data: quotes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await dbRun('DELETE FROM contact_inquiries WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getContactInfo,
  updateContactInfo,
  submitInquiry,
  submitQuote,
  getAllInquiries,
  getAllQuotes,
  deleteInquiry
};
