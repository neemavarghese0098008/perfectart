import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import { db, dbGet, dbRun } from './config/db.js';
import { initSchema } from './models/schema.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.resolve(root, process.env.UPLOAD_DIR || 'uploads', 'articles');
const api = process.env.LEGACY_BLOG_API || 'https://www.perfectartcontracting.com/wp-json/wp/v2/posts?per_page=100&_embed=1';
const downloadImage = async (url) => {
  const parsed = new URL(url);
  if (!['perfectartcontracting.com', 'www.perfectartcontracting.com'].includes(parsed.hostname)) return '';
  const response = await fetch(url);
  const mime = response.headers.get('content-type')?.split(';')[0];
  const ext = ({ 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif' })[mime];
  if (!response.ok || !ext) return '';
  const name = `${randomUUID()}${ext}`;
  await fs.writeFile(path.join(uploadDir, name), Buffer.from(await response.arrayBuffer()));
  return `/uploads/articles/${name}`;
};
const importInlineImages = async (html) => {
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const paths = [];
  for (const tag of imgs) {
    const match = tag.match(/\bsrc=["']([^"']+)["']/i);
    if (!match) continue;
    try {
      const local = await downloadImage(match[1]);
      if (local) {
        paths.push(local);
        html = html.replace(tag, tag.replace(match[0], `src="${local}"`).replace(/\s+srcset=["'][^"']*["']/i, ''));
      } else html = html.replace(tag, tag.replace(/\s+srcset=["'][^"']*["']/i, ''));
    } catch (error) { console.warn(`Skipped article image: ${error.message}`); }
  }
  return { html, paths };
};

await initSchema();
await fs.mkdir(uploadDir, { recursive: true });
const response = await fetch(api);
if (!response.ok) throw new Error(`Legacy WordPress API returned HTTP ${response.status}`);
const posts = await response.json();
if (!Array.isArray(posts)) throw new Error('Legacy WordPress API response was not a post list.');
let imported = 0;
for (const post of posts.filter((item) => item.status === 'publish')) {
  const slug = String(post.slug || '').slice(0, 490);
  if (!slug || await dbGet('SELECT id FROM articles WHERE slug = ? LIMIT 1', [slug])) continue;
  const featuredUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  const featured = featuredUrl ? await downloadImage(featuredUrl).catch(() => '') : '';
  const { html, paths } = await importInlineImages(post.content?.rendered || '');
  const image = featured || paths[0];
  if (!image) { console.warn(`Skipped ${slug}: no source image could be imported.`); continue; }
  const title = post.title?.rendered?.replace(/<[^>]+>/g, '').trim() || slug;
  const summary = post.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || '';
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || null;
  const date = post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : new Date().toLocaleDateString('en-US');
  await dbRun('INSERT INTO articles (title, slug, category, date, published_at, img, description, excerpt, content, images, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)', [title, slug, category, date, post.date ? new Date(post.date).toISOString().slice(0, 19).replace('T', ' ') : null, image, summary, summary, html, JSON.stringify(paths), 'published']);
  imported += 1;
}
console.log(`Legacy blog import finished: ${imported} article(s) imported. Existing slugs were preserved.`);
await db.end();

