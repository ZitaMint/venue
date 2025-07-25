// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    // 设为 GitHub Pages 仓库名（如 venue），确保资源路径正确
    base: '/venue/',

    build: {
        // 确保构建产物中的引用路径是相对的
        rollupOptions: {
            output: {
                // 修复相对路径问题
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`
            }
        }
    },

    plugins: [vue()]
})