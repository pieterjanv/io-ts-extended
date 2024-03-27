/** @type {import('vite').UserConfig} */
export default {
	build: {
		lib: {
			formats: ['cjs'],
			entry: '/src/index.ts',
			name: 'IoTsExtended',
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
