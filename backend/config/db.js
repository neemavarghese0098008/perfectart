import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const requiredDatabaseSettings = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
const missingDatabaseSettings = requiredDatabaseSettings.filter((setting) => !process.env[setting]);

if (missingDatabaseSettings.length > 0) {
  throw new Error(`Missing database configuration: ${missingDatabaseSettings.join(', ')}`);
}

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  queueLimit: 0
});

export const dbQuery = async (sql, params = []) => {
  const [rows] = await db.execute(sql, params);
  return rows;
};

export const dbGet = async (sql, params = []) => {
  const rows = await dbQuery(sql, params);
  return rows[0];
};

export const dbRun = async (sql, params = []) => {
  const [result] = await db.execute(sql, params);
  return { lastID: result.insertId, changes: result.affectedRows };
};

export const dbExec = async (sql) => {
  await db.query(sql);
};

export default { db, dbQuery, dbGet, dbRun, dbExec };
