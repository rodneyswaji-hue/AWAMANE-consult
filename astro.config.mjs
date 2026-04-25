// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://awamaneconsult.co.ke',
  integrations: [mdx(), react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Use Astro's built-in Sharp service for image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
