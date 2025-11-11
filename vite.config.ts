import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react(), 
        laravel({
            input: ['resources/js-react/app.tsx'],
            ssr: 'resources/js-react/ssr.tsx',
            refresh: true,
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js-react'),
        },
    },
});
