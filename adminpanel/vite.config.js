import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const adminBasePath = env.VITE_ADMIN_BASE_PATH || (mode === 'production' ? '/admin/' : '/');

  return {
    base: adminBasePath.endsWith('/') ? adminBasePath : `${adminBasePath}/`,
    plugins: [react()],
    server: {
      port: 5174,
      strictPort: true,
      host: '0.0.0.0'
    },
    preview: {
      port: 4174,
      strictPort: true
    }
  };
});
