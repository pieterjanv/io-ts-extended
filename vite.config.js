export default {
	build: {
		lib: {
			entry: '/src/index.ts',
			name: 'IoTsExtended',
			fileName: 'index',
		},
		rollupOptions: {
			external: [
				'io-ts',
				'fp-ts',
			],
		},
	},
};
