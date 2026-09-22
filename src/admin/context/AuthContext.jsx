import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('perfectart_admin_token'));
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('perfectart_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setAdmin(data.admin);
          localStorage.setItem('perfectart_admin_user', JSON.stringify(data.admin));
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Backend currently unreachable or session check failed, using cached credentials:', err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const login = async (username, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      setToken(data.token);
      setAdmin(data.admin);
      localStorage.setItem('perfectart_admin_token', data.token);
      localStorage.setItem('perfectart_admin_user', JSON.stringify(data.admin));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('perfectart_admin_token');
    localStorage.removeItem('perfectart_admin_user');
  };

  return (
    <AuthContext.Provider value={{ token, admin, isAuthenticated: !!token, loading, login, logout }}>
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
