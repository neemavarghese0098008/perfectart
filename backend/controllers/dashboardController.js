import { dbGet, dbQuery } from '../config/db.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await dbGet('SELECT COUNT(*) as count FROM projects');
    const retailProjects = await dbGet("SELECT COUNT(*) as count FROM projects WHERE category = 'retail'");
    const fnbProjects = await dbGet("SELECT COUNT(*) as count FROM projects WHERE category = 'fnb'");
    const corporateProjects = await dbGet("SELECT COUNT(*) as count FROM projects WHERE category = 'corporate'");
    const spaProjects = await dbGet("SELECT COUNT(*) as count FROM projects WHERE category = 'spa'");
    const hospitalityProjects = await dbGet("SELECT COUNT(*) as count FROM projects WHERE category = 'hospitality'");
    const residentialProjects = await dbGet("SELECT COUNT(*) as count FROM projects WHERE category = 'residential'");

    const totalTestimonials = await dbGet('SELECT COUNT(*) as count FROM testimonials');
    const totalArticles = await dbGet('SELECT COUNT(*) as count FROM articles');
    const totalGallery = await dbGet('SELECT COUNT(*) as count FROM gallery');
    const totalInquiries = await dbGet('SELECT COUNT(*) as count FROM contact_inquiries');
    const totalQuotes = await dbGet('SELECT COUNT(*) as count FROM quote_requests');

    const recentProjects = await dbQuery('SELECT id, title, category, category_label, place, country, created_at FROM projects ORDER BY id DESC LIMIT 5');
    const recentInquiries = await dbQuery('SELECT id, name, phone, email, subject, created_at FROM contact_inquiries ORDER BY id DESC LIMIT 5');

    return res.status(200).json({
      success: true,
      data: {
        counts: {
          totalProjects: totalProjects.count,
          retail: retailProjects.count,
          fnb: fnbProjects.count,
          corporate: corporateProjects.count,
          spa: spaProjects.count,
          hospitality: hospitalityProjects.count,
          residential: residentialProjects.count,
          totalTestimonials: totalTestimonials.count,
          totalArticles: totalArticles.count,
          totalGallery: totalGallery.count,
          totalInquiries: totalInquiries.count,
          totalQuotes: totalQuotes.count
        },
        recentProjects,
        recentInquiries
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default { getDashboardStats };
