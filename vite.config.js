export default {
	build: {
		manifest: true,
		rollupOptions: {
			// overwrite default .html entry
			input: '/src/index.ts',
		},
	},
}
  