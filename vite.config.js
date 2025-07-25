// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    // ��Ϊ GitHub Pages �ֿ������� venue����ȷ����Դ·����ȷ
    base: '/venue/',

    build: {
        // ȷ�����������е�����·������Ե�
        rollupOptions: {
            output: {
                // �޸����·������
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`
            }
        }
    },

    plugins: [vue()]
})