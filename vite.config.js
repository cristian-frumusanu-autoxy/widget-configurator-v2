import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const plugins = [
    vue(),
    VueDevTools(),
  ];

  let indexFileName = './index.html';

	let entryFileNames = 'assets/widget-configurator.js';
	let chunkFileNames = 'assets/widget-configurator.js';
	let assetFileNames = 'assets/widget-configurator.[ext]';

  if (process.env && (process.env.VITE_BUILD_MODE === 'widget' || process.env.VITE_BUILD_MODE === 'modal') ) {
    plugins.push(viteSingleFile());

		if (process.env.VITE_BUILD_MODE === 'widget') {
			indexFileName = './index-widget.html';
			entryFileNames = 'assets/widget.js';
			chunkFileNames = 'assets/widget.js';
			assetFileNames = 'assets/widget.[ext]';
		}

		if (process.env.VITE_BUILD_MODE === 'modal') {
			indexFileName = './index-modal.html';
			entryFileNames = 'assets/drivek-modal.js';
			chunkFileNames = 'assets/drivek-modal.js';
			assetFileNames = 'assets/drivek-modal.[ext]';
		}
  }

  return {
    plugins,
    build: {
			emptyOutDir: false,
      rollupOptions: {
        input: {
          app: resolve(__dirname, indexFileName),
        },
				output: {
					entryFileNames,
					chunkFileNames,
					assetFileNames,
				}
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  };

});
