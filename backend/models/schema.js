import { dbExec, dbGet } from '../config/db.js';

const ensureIndex = async (tableName, indexName, columns) => {
  const existing = await dbGet(
    `SELECT 1
     FROM information_schema.statistics
     WHERE table_schema = DATABASE()
       AND table_name = ?
       AND index_name = ?
     LIMIT 1`,
    [tableName, indexName]
  );

  if (!existing) {
    await dbExec(`ALTER TABLE \`${tableName}\` ADD INDEX \`${indexName}\` (${columns})`);
  }
};

const ensureColumn = async (tableName, columnName, definition) => {
  const existing = await dbGet(
    `SELECT 1 FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ? LIMIT 1`,
    [tableName, columnName]
  );
  if (!existing) await dbExec(`ALTER TABLE \`${tableName}\` ADD COLUMN \`${columnName}\` ${definition}`);
};

export const initSchema = async () => {
  const schemaSQL = `
    CREATE TABLE IF NOT EXISTS admins (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(191) UNIQUE NOT NULL,
      email VARCHAR(191) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INT PRIMARY KEY AUTO_INCREMENT,
      category VARCHAR(100) NOT NULL,
      category_label VARCHAR(191) NOT NULL,
      title VARCHAR(255) NOT NULL,
      place VARCHAR(255) NOT NULL,
      country VARCHAR(100) NOT NULL DEFAULT 'Saudi Arabia',
      img VARCHAR(500) NOT NULL,
      images JSON,
      description TEXT,
      featured TINYINT(1) DEFAULT 0,
      order_index INT DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_projects_category (category),
      INDEX idx_projects_featured (featured)
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      is_active TINYINT(1) DEFAULT 1,
      order_index INT DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS articles (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(500) NOT NULL,
      date VARCHAR(100) NOT NULL,
      img VARCHAR(500) NOT NULL,
      description TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'published',
      order_index INT DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL DEFAULT 'fitout',
      src VARCHAR(500) NOT NULL,
      order_index INT DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_gallery_category (category)
    );

    CREATE TABLE IF NOT EXISTS contact_info (
      id INT PRIMARY KEY,
      address VARCHAR(500) NOT NULL,
      phone_primary VARCHAR(100) NOT NULL,
      phone_secondary VARCHAR(100),
      email VARCHAR(255) NOT NULL,
      whatsapp VARCHAR(100) NOT NULL,
      map_iframe_url TEXT NOT NULL,
      facebook_url VARCHAR(500),
      twitter_url VARCHAR(500),
      linkedin_url VARCHAR(500),
      youtube_url VARCHAR(500),
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_inquiries (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS quote_requests (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      company VARCHAR(255),
      phone VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      service VARCHAR(255) NOT NULL,
      budget VARCHAR(255),
      details TEXT,
      status VARCHAR(50) DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS vendor_registrations (
      id INT PRIMARY KEY AUTO_INCREMENT,
      company_name VARCHAR(255) NOT NULL,
      contact_person_name VARCHAR(255) NOT NULL,
      vendor_categories JSON NOT NULL,
      other_vendor_category VARCHAR(255),
      job_title VARCHAR(255) NOT NULL,
      country VARCHAR(150) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(100) NOT NULL,
      registration_number VARCHAR(255) NOT NULL,
      years_in_business INT NOT NULL,
      products_services TEXT NOT NULL,
      certifications TEXT,
      company_profile_document VARCHAR(255),
      registration_document VARCHAR(255),
      references_text TEXT,
      additional_notes TEXT,
      status VARCHAR(30) NOT NULL DEFAULT 'New',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_vendor_registrations_created (created_at),
      INDEX idx_vendor_registrations_status (status)
    );
  `;

  await dbExec(schemaSQL);
  // Safe additive upgrades preserve existing project images and article records.
  await ensureColumn('projects', 'images', 'JSON NULL');
  await ensureColumn('articles', 'slug', 'VARCHAR(500) NULL');
  await ensureColumn('articles', 'published_at', 'DATETIME NULL');
  await ensureColumn('articles', 'category', 'VARCHAR(191) NULL');
  await ensureColumn('articles', 'content', 'LONGTEXT NULL');
  await ensureColumn('articles', 'images', 'JSON NULL');
  await ensureColumn('articles', 'excerpt', 'TEXT NULL');
  await ensureIndex('projects', 'idx_projects_category', '`category`');
  await ensureIndex('projects', 'idx_projects_featured', '`featured`');
  await ensureIndex('gallery', 'idx_gallery_category', '`category`');
  console.log('Database tables and indexes initialized successfully.');
};

export default initSchema;

