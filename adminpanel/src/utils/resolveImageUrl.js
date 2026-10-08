import { API_ORIGIN } from './apiConfig';
const PUBLIC_SITE_ORIGIN = (
  import.meta.env.VITE_PUBLIC_SITE_URL ||
  (import.meta.env.DEV ? 'http://localhost:5173' : 'https://www.perfectartcontracting.com')
).replace(/\/$/, '');
const PUBLIC_BASE_PATH = (import.meta.env.VITE_PUBLIC_BASE_PATH || (import.meta.env.DEV ? '/' : '/reactdemo/'))
  .replace(/\\/g, '/')
  .replace(/\/?$/, '/');

export const resolveImageUrl = (img) => {
  if (!img || typeof img !== 'string') return '';

  const value = img.trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;

  const normalized = value.startsWith('/') ? value : `/${value}`;

  if (normalized.startsWith('/uploads')) {
    return `${API_ORIGIN}${normalized}`;
  }

  const targetPath = normalized.replace(/^\/+/, '');
  return `${PUBLIC_SITE_ORIGIN}${PUBLIC_BASE_PATH}${targetPath}`;
};

export default resolveImageUrl;
