import bcrypt from 'bcryptjs';
import { dbGet, dbRun } from './config/db.js';
import { initSchema } from './models/schema.js';

const initialProjects = [
  {
    id: 1,
    category: 'retail',
    category_label: 'Retail Outlet',
    title: 'Brands for Less - Store',
    place: 'Riyadh',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/brands_for_less_store.jpeg',
    featured: 1
  },
  {
    id: 2,
    category: 'spa',
    category_label: 'Health Clubs & Spa',
    title: 'Gymnation - Female Gym',
    place: 'Riyadh',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/gymnation_female_gym.jpeg',
    featured: 0
  },
  {
    id: 3,
    category: 'spa',
    category_label: 'Health Clubs & Spa',
    title: 'Gymnation - Male Gym',
    place: 'Riyadh',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/gymnation_male_gym.jpeg',
    featured: 0
  },
  {
    id: 4,
    category: 'residential',
    category_label: 'Villa & Residential',
    title: 'Villa Works Luxury Interior',
    place: 'Al Hada District, Riyadh',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/villa_works.jpg',
    featured: 0
  },
  {
    id: 5,
    category: 'retail',
    category_label: 'Retail Outlet',
    title: 'Steve Madden',
    place: 'Kingdom Centre Mall, Riyadh',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/steve_madden.jpg',
    featured: 0
  },
  {
    id: 6,
    category: 'retail',
    category_label: 'Retail Outlet',
    title: 'Home Box',
    place: 'Sahara Mall, Riyadh',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/home_box.jpg',
    featured: 0
  },
  {
    id: 7,
    category: 'retail',
    category_label: 'Retail Outlet',
    title: 'Koton',
    place: 'Riyadh',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/koton.jpg',
    featured: 0
  },
  {
    id: 8,
    category: 'retail',
    category_label: 'Retail Outlet',
    title: 'Max Fashion Store',
    place: 'Thumama, Riyadh',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/max.jpg',
    featured: 0
  },
  {
    id: 9,
    category: 'hospitality',
    category_label: 'Hospitality',
    title: 'Health Club & Hotel Fit-Out Marriott',
    place: 'Riyadh Marriott Hotel, Riyadh',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/health_club_marriott.jpg',
    featured: 0
  },
  {
    id: 10,
    category: 'corporate',
    category_label: 'Corporate Office',
    title: 'Brands For Less Group - E-Commerce Office',
    place: 'Riyadh',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/bfl_ecommerce_office.jpg',
    featured: 1
  },
  {
    id: 11,
    category: 'retail',
    category_label: 'Retail Outlet',
    title: 'Brands For Less - Retail',
    place: 'Jeddah',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/brands_for_less_retail.jpeg',
    featured: 0
  },
  {
    id: 12,
    category: 'fnb',
    category_label: 'F&B',
    title: 'Landmark Arabia (Nando’s)',
    place: 'Boulevard City, Riyadh',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/landmark_arabia_nandos.jpg',
    featured: 0
  },
  {
    id: 13,
    category: 'fnb',
    category_label: 'F&B',
    title: 'Tim Horton’s Cafe',
    place: 'Riyadh',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/tim_hortons.jpg',
    featured: 0
  },
  {
    id: 14,
    category: 'spa',
    category_label: 'Health Clubs & Spa',
    title: 'Fitness First (Ladies)',
    place: 'Riyadh',
    country: 'Saudi Arabia',
    img: '/reactdemo/assets/img/projects/fitness_first_ladies.png',
    featured: 1
  }
];

const initialTestimonials = [
  {
    name: 'Michael',
    role: 'Commercial Client',
    message: 'Throughout the project, the team was incredibly responsive and professional. They kept me informed about the progress, answered any questions I had, and provided valuable guidance along the way. Their attention to detail was exceptional, ensuring that every aspect of the design was meticulously executed.',
    is_active: 1
  },
  {
    name: 'John',
    role: 'Corporate Client',
    message: 'First and foremost, the team took the time to understand my vision and personal style. They asked thoughtful questions and really listened to my needs and preferences. This initial consultation gave me confidence that they would be able to create a space that reflected my personality and met my functional requirements.',
    is_active: 1
  },
  {
    name: 'Sandra',
    role: 'Villa & Residential Client',
    message: "Once the design phase began, I was blown away by the team's creativity. They presented me with a range of ideas, color schemes, and furniture options that perfectly captured the look and feel I had envisioned. Their ability to combine different elements and create a cohesive design was truly impressive.",
    is_active: 1
  }
];

const initialArticles = [
  {
    title: "Vision 2030 and the Interior Fit-Out Boom: What Saudi Arabia's Construction Market Looks Like Right Now",
    date: 'Aug 27, 2025',
    img: '/reactdemo/assets/img/blog/blog_1_1.jpg',
    description: "An in-depth analysis of Saudi Arabia's booming construction and fit-out landscape under Vision 2030, highlighting giga-projects, hospitality expansion, and corporate headquarters demand in Riyadh.",
    status: 'published'
  },
  {
    title: 'Custom Interiors and Furniture in Riyadh: Designed for Your Home, Built in Our Own Workshop',
    date: 'Aug 27, 2025',
    img: '/reactdemo/assets/img/blog/blog_1_2.jpg',
    description: 'How our dedicated PACE Joinery and Woodworking Workshop in Riyadh manufactures custom cabinetry, bespoke furniture, and precision architectural millwork with zero supply chain delays.',
    status: 'published'
  }
];

const initialGallery = [
  { cat: 'fitout', src: '/reactdemo/assets/img/gallery/gallery_2_1.jpg', title: 'Luxury Commercial Fit-Out' },
  { cat: 'fitout', src: '/reactdemo/assets/img/gallery/gallery_2_2.jpg', title: 'Interior Architecture Execution' },
  { cat: 'corporate', src: '/reactdemo/assets/img/gallery/gallery_2_3.jpg', title: 'Corporate Headquarters Office' },
  { cat: 'corporate', src: '/reactdemo/assets/img/gallery/gallery_2_4.jpg', title: 'Executive Boardroom Interiors' },
  { cat: 'retail', src: '/reactdemo/assets/img/gallery/gallery_2_5.jpg', title: 'Retail Storefront & Joinery' },
  { cat: 'retail', src: '/reactdemo/assets/img/gallery/gallery_2_6.jpg', title: 'F&B Dining Space Fit-Out' },
  { cat: 'villa', src: '/reactdemo/assets/img/gallery/gallery_2_7.jpg', title: 'Custom Villa Living Interior' },
  { cat: 'villa', src: '/reactdemo/assets/img/gallery/gallery_2_8.jpg', title: 'Master Bedroom Custom Cabinetry' },
  { cat: 'fitout', src: '/reactdemo/assets/img/gallery/gallery_2_9.jpg', title: 'Acoustic Ceiling & Lighting' },
  { cat: 'corporate', src: '/reactdemo/assets/img/gallery/gallery_5_1.jpg', title: 'Modern Office Reception Area' },
  { cat: 'retail', src: '/reactdemo/assets/img/gallery/gallery_5_2.jpg', title: 'High-End Retail Display Cabinets' },
  { cat: 'villa', src: '/reactdemo/assets/img/gallery/gallery_5_3.jpg', title: 'Private Villa Bespoke Kitchen' },
  { cat: 'fitout', src: '/reactdemo/assets/img/gallery/gallery_7_1.jpg', title: 'Health Club & Spa Interior' },
  { cat: 'corporate', src: '/reactdemo/assets/img/gallery/gallery_7_2.jpg', title: 'Executive Conference Suite' },
  { cat: 'retail', src: '/reactdemo/assets/img/gallery/gallery_8_1.jpg', title: 'Boutique Showroom Fit-Out' },
  { cat: 'villa', src: '/reactdemo/assets/img/gallery/gallery_9_1.jpg', title: 'Luxury Residential Dining Concept' }
];

export const seedDatabase = async () => {
  console.log('Initializing database tables...');
  await initSchema();

  // 1. Seed Admin
  const adminExists = await dbGet('SELECT * FROM admins WHERE username = ?', ['admin']);
  if (!adminExists) {
    console.log('Creating default admin account...');
    const hash = await bcrypt.hash('Admin@12345', 10);
    await dbRun(
      'INSERT INTO admins (username, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)',
      ['admin', 'admin@perfectartcontracting.com', hash, 'Perfect Art Admin', 'superadmin']
    );
    console.log('Default admin created: username = admin, password = Admin@12345');
  }

  // 2. Seed Projects
  const projectCount = await dbGet('SELECT COUNT(*) as count FROM projects');
  if (projectCount.count === 0) {
    console.log(`Seeding ${initialProjects.length} initial projects...`);
    for (const p of initialProjects) {
      await dbRun(
        `INSERT INTO projects (category, category_label, title, place, country, img, featured, description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.category, p.category_label, p.title, p.place, p.country, p.img, p.featured, '']
      );
    }
    console.log('Projects seeded successfully.');
  }

  // 3. Seed Testimonials
  const testCount = await dbGet('SELECT COUNT(*) as count FROM testimonials');
  if (testCount.count === 0) {
    console.log(`Seeding ${initialTestimonials.length} testimonials...`);
    for (const t of initialTestimonials) {
      await dbRun(
        'INSERT INTO testimonials (name, role, message, is_active) VALUES (?, ?, ?, ?)',
        [t.name, t.role, t.message, t.is_active]
      );
    }
    console.log('Testimonials seeded successfully.');
  }

  // 4. Seed Articles
  const artCount = await dbGet('SELECT COUNT(*) as count FROM articles');
  if (artCount.count === 0) {
    console.log(`Seeding ${initialArticles.length} articles...`);
    for (const a of initialArticles) {
      await dbRun(
        'INSERT INTO articles (title, date, img, description, status) VALUES (?, ?, ?, ?, ?)',
        [a.title, a.date, a.img, a.description, a.status]
      );
    }
    console.log('Articles seeded successfully.');
  }

  // 5. Seed Gallery
  const galCount = await dbGet('SELECT COUNT(*) as count FROM gallery');
  if (galCount.count === 0) {
    console.log(`Seeding ${initialGallery.length} gallery images...`);
    for (const g of initialGallery) {
      await dbRun(
        'INSERT INTO gallery (title, category, src) VALUES (?, ?, ?)',
        [g.title, g.cat, g.src]
      );
    }
    console.log('Gallery seeded successfully.');
  }

  // 6. Seed Contact Info
  const contactExists = await dbGet('SELECT * FROM contact_info WHERE id = 1');
  if (!contactExists) {
    console.log('Seeding default contact information...');
    await dbRun(
      `INSERT INTO contact_info (
        id, address, phone_primary, phone_secondary, email, whatsapp,
        map_iframe_url, facebook_url, twitter_url, linkedin_url, youtube_url
      ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Building 3547, Hafsah Bint Omar, Al Nahdah District, Riyadh 13221, Kingdom of Saudi Arabia',
        '+966 57 979 7607',
        '+966 11 456 0555',
        'info@perfectartcontracting.com',
        '+966579797607',
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.577265882329!2d46.77258957608821!3d24.707106451480112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f038f830bbefb%3A0x8e8331d22227d884!2sHafsah%20Bint%20Omar%2C%20Al%20Nahdah%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
        'https://www.facebook.com/',
        'https://www.twitter.com/',
        'https://www.linkedin.com/',
        'https://www.youtube.com/'
      ]
    );
    console.log('Contact info seeded successfully.');
  }

  console.log('Database seeding complete!');
};

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}

export default seedDatabase;
