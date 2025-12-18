import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ isSsrBuild }) => ({
    plugins: [
        react(),
        tailwindcss(),
        ...(!isSsrBuild ? [federation({
            name: 'host_app',
            remotes: {
                ui: 'https://d2yeshvqijproh.cloudfront.net/assets/remoteEntry.js',
                //ui: 'http://localhost:5000/assets/remoteEntry.js', 
            },
            exposes: {},
            shared: {
                react: {
                    singleton: true,
                },
                'react-dom': {
                    singleton: true,
                },
            },
        })] : []),
        laravel({
            input: ['resources/js-react/app.tsx'],
            ssr: 'resources/js-react/ssr.tsx',
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js-react'),
        },
    },
    ssr: {
        noExternal: ['@inertiajs/react'],
    },
    ...(isSsrBuild && {
        build: {
            rollupOptions: {
                external: (id: string) => id.startsWith('ui/'),
            },
        },
    }),
    server: {
        port: 5173,
        strictPort: true,
    }
}));
