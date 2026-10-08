import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AdminApp from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_ADMIN_BASE_PATH || (import.meta.env.PROD ? '/admin' : '/')}>
      <AdminApp />
    </BrowserRouter>
  </React.StrictMode>
);
