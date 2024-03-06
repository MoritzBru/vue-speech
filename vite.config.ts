import {
  fileURLToPath, URL,
} from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-speech/',
  plugins: [
    vue(),
    Icons({
      compiler: 'vue3',
      scale: 1,
      autoInstall: true,
      customCollections: { speech: FileSystemIconLoader('./src/assets/icons') },
    }),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
});
