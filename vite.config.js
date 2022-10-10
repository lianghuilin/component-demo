import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default ({ mode }) => ({
    plugins: [
        vue(),
        viteMockServe({
            mockPath: './src/mock',
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@assets': resolve(__dirname, './src/assets'),
            '@util': resolve(__dirname, './src/util'),
            '@router': resolve(__dirname, './src/router'),
            '@store': resolve(__dirname, './src/store'),
        },
    },
    base: './',
    server: {
        port: 4000,
        open: true,
        cors: true,
        proxy: {
            '/api': {
                target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
                changeOrigin: true, // 是否跨域
                rewrite: path => path.replace('^/api', '/api'),
            },
            '/report_api': {
                target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
                changeOrigin: true, // 是否跨域
                rewrite: path => path.replace('^/report_api', loadEnv(mode, process.cwd()).VITE_BASE_URL),
            },
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/assets/scss/common.scss";',
            },
        },
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            }
        }
    }
});
