// @ts-check
import { defineConfig } from 'astro/config';
import path from 'node:path';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:3000',
  base: '',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@web-components': path.resolve('./src/components/web-components/'),
        '@wrappers': path.resolve('./src/components/wrappers/'),
        '@pages': path.resolve('./src/pages'),
        '@scripts': path.resolve('./src/scripts'),
        '@animations': path.resolve("./src/scripts/animations/"),
        '@utils': path.resolve("./src/scripts/utils/"),
        '@styles': path.resolve('./src/styles'),
        '@layouts': path.resolve('./src/layouts'),
      }
    }
  }
});
