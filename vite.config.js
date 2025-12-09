import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // or your plugin

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'   // default is 'dist' — change to 'build' if you want
  }
});
