import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dbGet, dbQuery, dbRun } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const privateDir = path.resolve(__dirname, '..', process.env.UPLOAD_DIR || 'uploads', 'vendor-private');
fs.mkdirSync(privateDir, { recursive: true });
const allowed = new Map([
  ['.pdf', ['application/pdf']], ['.doc', ['application/msword', 'application/octet-stream']],
  ['.docx', ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream']],
  ['.xls', ['application/vnd.ms-excel', 'application/octet-stream']],
  ['.xlsx', ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip', 'application/octet-stream']],
  ['.jpg', ['image/jpeg']], ['.jpeg', ['image/jpeg']], ['.png', ['image/png']]
]);
const allowedCategories = new Set(['Furniture / Accessories Suppliers','Signage','Acoustic Solutions','Water Feature and Fountain','IT & AV Integrators','Glass Films & Frosting','Timber & Wood','Hardware & Accessories','Gypsum & Metal Profile','Paint','Tile, Marble & Stone','Electrical Material','Lighting Fixtures','HVAC Material','Plumbing Materials','Equipment Rental','Waste Management','Safety and PPE Supplier','Other']);
const storage = multer.diskStorage({
  destination: privateDir,
  filename: (req, file, cb) => cb(null, `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`)
});
const uploads = multer({
  storage, limits: { fileSize: 25 * 1024 * 1024, files: 2, fields: 30 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.has(ext) && allowed.get(ext).includes(file.mimetype)) return cb(null, true);
    cb(new Error('Documents must be PDF, DOC, DOCX, JPG, JPEG, or PNG files.'));
  }
}).fields([{ name: 'companyProfileDocument', maxCount: 1 }, { name: 'registrationDocument', maxCount: 1 }]);
const parseCategories = (value) => {
  try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed.map((v) => String(v).trim()).filter(Boolean) : []; }
  catch { return []; }
};
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const normalizeCategories = (value) => {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value !== 'string' || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map((item) => String(item).trim()).filter(Boolean);
    return typeof parsed === 'string' && parsed.trim() ? [parsed.trim()] : [];
  } catch {
    return [value.trim()];
  }
};
const hasExpectedSignature = async (file) => {
  const handle = await fs.promises.open(file.path, 'r');
  try {
    const header = Buffer.alloc(8);
    const { bytesRead } = await handle.read(header, 0, 8, 0);
    const bytes = header.subarray(0, bytesRead);
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.pdf') return bytes.subarray(0, 5).toString() === '%PDF-';
    if (ext === '.jpg' || ext === '.jpeg') return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    if (ext === '.png') return bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
    if (ext === '.doc' || ext === '.xls') return bytes.subarray(0, 8).equals(Buffer.from([0xd0,0xcf,0x11,0xe0,0xa1,0xb1,0x1a,0xe1]));
    if (ext === '.docx' || ext === '.xlsx') return bytes[0] === 0x50 && bytes[1] === 0x4b && [0x03,0x05,0x07].includes(bytes[2]) && [0x04,0x06,0x08].includes(bytes[3]);
    return false;
  } finally { await handle.close(); }
};
const publicRecord = (row) => {
  const { company_profile_document, registration_document, vendor_categories, ...safe } = row;
  return {
  ...safe,
  vendorCategories: normalizeCategories(vendor_categories),
  companyProfileDocument: Boolean(company_profile_document), registrationDocument: Boolean(registration_document)
}; };

router.post('/', (req, res, next) => uploads(req, res, (error) => {
  if (error) return next(error);
  (async () => {
    const files = Object.values(req.files || {}).flat();
    try {
      const b = req.body;
      const categories = parseCategories(b.vendorCategories);
      const required = ['companyName', 'contactPersonName', 'jobTitle', 'country', 'email', 'phone', 'registrationNumber', 'productsServices'];
      for (const file of files) {
        if (!await hasExpectedSignature(file)) {
          files.forEach((uploadedFile) => fs.promises.unlink(uploadedFile.path).catch(() => {}));
          return res.status(400).json({ success: false, message: 'One of the uploaded files does not match its file type.' });
        }
      }
      if (required.some((key) => !String(b[key] || '').trim()) || categories.length !== 1 || !allowedCategories.has(categories[0]) || (categories[0] === 'Other' && !String(b.otherVendorCategory || '').trim()) || !req.files?.companyProfileDocument?.[0] || !req.files?.registrationDocument?.[0] || !validateEmail(String(b.email || '').trim()) || !/^\d+$/.test(String(b.yearsInBusiness)) || Number(b.yearsInBusiness) < 0) {
        files.forEach((file) => fs.promises.unlink(file.path).catch(() => {}));
        return res.status(400).json({ success: false, message: 'Complete all required fields, select one category, attach both required documents, and use a valid email and non-negative years in business.' });
      }
      const result = await dbRun(`INSERT INTO vendor_registrations
        (company_name,contact_person_name,vendor_categories,other_vendor_category,job_title,country,email,phone,registration_number,years_in_business,products_services,certifications,company_profile_document,registration_document,references_text,additional_notes)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
        b.companyName.trim(), b.contactPersonName.trim(), JSON.stringify(categories), categories[0] === 'Other' ? (b.otherVendorCategory || '').trim() : '', b.jobTitle.trim(), b.country.trim(), b.email.trim(), b.phone.trim(), b.registrationNumber.trim(), Number(b.yearsInBusiness), b.productsServices.trim(), (b.certifications || '').trim(), req.files.companyProfileDocument[0].filename, req.files.registrationDocument[0].filename, (b.references || '').trim(), (b.additionalNotes || '').trim()
      ]);
      return res.status(201).json({ success: true, message: 'Vendor application submitted successfully.', id: result.lastID });
    } catch (error) {
      files.forEach((file) => fs.promises.unlink(file.path).catch(() => {}));
      throw error;
    }
  })().catch(next);
}));

router.get('/', requireAuth, async (req, res, next) => {
  try { const rows = await dbQuery('SELECT * FROM vendor_registrations ORDER BY created_at DESC, id DESC'); res.json({ success: true, data: rows.map(publicRecord) }); }
  catch (e) { next(e); }
});
router.get('/:id', requireAuth, async (req, res, next) => {
  try { const row = await dbGet('SELECT * FROM vendor_registrations WHERE id = ?', [req.params.id]); if (!row) return res.status(404).json({ success: false, message: 'Vendor application not found.' }); res.json({ success: true, data: publicRecord(row) }); }
  catch (e) { next(e); }
});
router.patch('/:id', requireAuth, async (req, res, next) => {
  try { const status = String(req.body.status || ''); if (!['New', 'Reviewed', 'Contacted'].includes(status)) return res.status(400).json({ success: false, message: 'Invalid status.' }); const result = await dbRun('UPDATE vendor_registrations SET status = ? WHERE id = ?', [status, req.params.id]); if (!result.changes) return res.status(404).json({ success: false, message: 'Vendor application not found.' }); res.json({ success: true }); }
  catch (e) { next(e); }
});
router.get('/:id/documents/:kind', requireAuth, async (req, res, next) => {
  try {
    const col = req.params.kind === 'company-profile' ? 'company_profile_document' : req.params.kind === 'registration' ? 'registration_document' : null;
    if (!col) return res.status(404).json({ success: false, message: 'Document not found.' });
    const row = await dbGet(`SELECT \`${col}\` AS filename FROM vendor_registrations WHERE id = ?`, [req.params.id]);
    if (!row?.filename) return res.status(404).json({ success: false, message: 'Document not found.' });
    const filePath = path.resolve(privateDir, row.filename);
    if (!filePath.startsWith(`${privateDir}${path.sep}`)) return res.status(400).json({ success: false, message: 'Invalid document path.' });
    res.download(filePath, row.filename);
  } catch (e) { next(e); }
});
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const row = await dbGet('SELECT company_profile_document, registration_document FROM vendor_registrations WHERE id = ?', [req.params.id]);
    if (!row) return res.status(404).json({ success: false, message: 'Vendor application not found.' });
    await dbRun('DELETE FROM vendor_registrations WHERE id = ?', [req.params.id]);
    [row.company_profile_document, row.registration_document].filter(Boolean).forEach((file) => fs.promises.unlink(path.join(privateDir, file)).catch(() => {}));
    res.json({ success: true });
  } catch (e) { next(e); }
});
export default router;
