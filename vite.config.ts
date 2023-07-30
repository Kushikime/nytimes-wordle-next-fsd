import react from '@vitejs/plugin-react';
import { configDefaults, defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/tests/setup.ts'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            provider: 'v8',
            all: true,
            lines: 80,
            functions: 50,
            branches: 80,
            statements: 80,
            exclude: [
                ...configDefaults.coverage.exclude!,
                '**/main.tsx',
                '**/shared/events',
                '**/tests',
                'public',
            ],
        },
    },
});
