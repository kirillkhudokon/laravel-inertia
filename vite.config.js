import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
/* import vue from '@vitejs/plugin-vue' */
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        /* vue(),
        laravel({
            input: ['resources/js-vue/app.js'],
            ssr: 'resources/js-vue/ssr.js',
            refresh: true,
        }), */
         
        react(), 
        laravel({
            input: ['resources/js-react/app.jsx'],
            ssr: 'resources/js-react/ssr.jsx',
            refresh: true,
        })
       
    ],
});
