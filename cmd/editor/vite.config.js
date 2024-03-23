export default {
    build: {
        outDir: '../../public/js',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: 'editor.js',
                chunkFileNames: `[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        }
    }
}
