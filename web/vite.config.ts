import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
	build: {
		target: 'esnext',
	},
	plugins: [react(), wasm()],
});
