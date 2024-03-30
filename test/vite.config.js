/** @type {import('vite').UserConfig} */
export default {
	build: {
		outDir: './out',
		lib: {
			formats: ['es'],
			entry: '/extensionLogic/index.ts',
			name: 'IoTsExtendedTests',
			fileName: 'index',
		},
		rollupOptions: {
			external: (id) => id.includes('/node_modules/'),
		},
	},
	esbuild: {
		keepNames: true,
	}
};
