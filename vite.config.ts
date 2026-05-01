import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Carga las variables de entorno (.env)
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // IMPORTANTE: Asegúrate de que el nombre del repo sea 'acumaster'
    base: '/acumaster/', 
    plugins: [react(), tailwindcss()],
    define: {
      // Esto permite que el código acceda a la API KEY en GitHub y en local
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        // Ajustado para que apunte correctamente a la raíz del proyecto
        '@': path.resolve(__dirname, './'),
      },
    },
    server: {
      // Configuración de HMR para compatibilidad con editores
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      outDir: 'dist',
      // Esto asegura que los activos se manejen correctamente en subcarpetas
      assetsDir: 'assets',
    }
  };
});
