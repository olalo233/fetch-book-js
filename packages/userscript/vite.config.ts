import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		react(),
		monkey({
			entry: 'src/main.tsx',
			userscript: {
				name: 'fetch-book-js 用户脚本',
				namespace: 'http://tampermonkey.net/',
				version: '0.1.0',
				description: 'fetch-book-js 油猴脚本',
				author: '',
				match: ['https://www.haxs.me/*'],
				grant: ['GM_xmlhttpRequest', 'GM_setValue', 'GM_getValue'],
			},
		}),
	],
});
