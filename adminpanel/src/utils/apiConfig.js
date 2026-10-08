const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const defaultApiOrigin = import.meta.env.DEV ? 'http://localhost:5000' : window.location.origin;

export const API_ORIGIN = (configuredApiUrl || defaultApiOrigin)
  .replace(/\/+$/, '')
  .replace(/\/api$/i, '');

export const API_BASE_URL = `${API_ORIGIN}/api`;
