import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../utils/apiConfig';

const AuthContext = createContext(null);
const TOKEN_KEY = 'perfectart_admin_token';
const ADMIN_KEY = 'perfectart_admin_user';

const readStoredToken = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token || token === 'undefined' || token === 'null') {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return token;
  } catch {
    return null;
  }
};

const readStoredAdmin = () => {
  try {
    const saved = localStorage.getItem(ADMIN_KEY);
    if (!saved || saved === 'undefined' || saved === 'null') {
      localStorage.removeItem(ADMIN_KEY);
      return null;
    }

    const admin = JSON.parse(saved);
    if (!admin || typeof admin !== 'object' || Array.isArray(admin) || admin.id == null) {
      localStorage.removeItem(ADMIN_KEY);
      return null;
    }
    return admin;
  } catch {
    try { localStorage.removeItem(ADMIN_KEY); } catch { /* storage may be unavailable */ }
    return null;
  }
};

const clearStoredSession = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
  } catch { /* storage may be unavailable */ }
};

const saveStoredSession = (token, admin) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
  } catch {
    clearStoredSession();
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(readStoredToken);
  const [admin, setAdmin] = useState(readStoredAdmin);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setToken(null);
    setAdmin(null);
    clearStoredSession();
  };

  useEffect(() => {
    let active = true;
    const checkAuth = async () => {
      if (!token) {
        if (active) {
          setAdmin(null);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json().catch(() => null);

        if (res.status === 401 || res.status === 403 || res.status === 404) {
          if (active) logout();
          return;
        }
        if (!res.ok) throw new Error(data?.message || 'Unable to validate admin session.');
        if (!data?.success || !data.admin || data.admin.id == null) {
          if (active) logout();
          return;
        }

        if (active) {
          setAdmin(data.admin);
          saveStoredSession(token, data.admin);
        }
      } catch (err) {
        console.warn('Admin session validation failed:', err.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    setLoading(true);
    checkAuth();
    return () => { active = false; };
  }, [token]);

  const login = async (username, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success || !data.token || !data.admin || data.admin.id == null) {
        throw new Error(data?.message || 'The server returned an invalid login response.');
      }

      saveStoredSession(data.token, data.admin);
      setToken(data.token);
      setAdmin(data.admin);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || 'Login failed. Please try again.' };
    }
  };

  return (
    <AuthContext.Provider value={{ token, admin, isAuthenticated: !!token && !!admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export default AuthContext;
