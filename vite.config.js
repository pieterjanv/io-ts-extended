export default {
	build: {
		manifest: true,
		rollupOptions: {
			input: '/src/index.ts',
			external: [
				'io-ts',
				'fp-ts',
			],
		},
	},
}
  