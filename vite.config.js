// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
	plugins: [
		cssInjectedByJsPlugin({
			styleId: 'custom-style',
			injectCode: (cssCode) => {
				return `
				try {
                    if (typeof document != 'undefined') {
                        const elementStyle = document.createElement('style');
                        elementStyle.appendChild(document.createTextNode(${cssCode}));
						document.head.appendChild(elementStyle);
                    }
                } catch (e) {console.error('inject style error', e)}`;
			},
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	build: {
		// TODO sourcemap
		// sourcemap: 'inline',
		target: 'es2015',
		lib: {
			name: 'hook',
			entry: [resolve(__dirname, './src/views/home/index.js')],
			// fileName: (format, entryName) => {
			// 	console.log(format, entryName);
			// 	return ;
			// },
			formats: ['umd'],
		},
		cssMinify: true,
		minify: true,
		// rollupOptions: {
		// 	// 确保外部化处理那些你不想打包进库的依赖
		// 	external: ['vue'],
		// 	output: {
		// 		// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
		// 		globals: {
		// 			vue: 'Vue',
		// 		},
		// 	},
		// },
	},
});
