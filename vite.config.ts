import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: { alias: { '@': resolve(rootDir, 'src') } },
  server: { host: '0.0.0.0', port: 5000, strictPort: true },
  preview: { host: true },
  build: { target: 'es2020', sourcemap: true },
});
