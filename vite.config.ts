import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  // Base debe coincidir exactamente con el nombre de tu repositorio
  base: '/acumaster/',
  
  plugins: [
    react(),
    tailwindcss()
  ],

  resolve: {
    alias: {
      // Configuración estándar para que el símbolo @ apunte a la carpeta src
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Esto ayuda a evitar problemas de archivos grandes en GitHub Pages
    chunkSizeWarningLimit: 1600,
  },

  // Manejo de variables de entorno de forma nativa para Vite
  define: {
    'process.env': {}
  }
});
