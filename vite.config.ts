import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import vue from '@vitejs/plugin-vue';
import path, { resolve } from 'path';
import manifest from './manifest.json';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

export default defineConfig({
	plugins: [
		vue(),
		crx({ manifest }),
		Components({
			resolvers: [PrimeVueResolver()],
		}),
	],
	build: {
		rollupOptions: {
			input: {
				popup: resolve(__dirname, 'index.html'),
				background: resolve(__dirname, './src/background.ts'),
				content: resolve(__dirname, './src/content.ts'),
			},
			output: {
				entryFileNames: '[name].js',
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		fs: {
			// Allow serving files from one level up to the project root
			allow: ['..'],
		},
	},
});
