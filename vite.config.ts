import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import vue from '@vitejs/plugin-vue';
import path, { resolve } from 'path';
import manifest from './manifest.json';

export default defineConfig({
	plugins: [vue(), crx({ manifest })],
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
});
