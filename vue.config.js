module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    devServer: {
        open:true,
        port: 8080,//前端端口
        host: "localhost",
        proxy: {
            '/down': {
                target: "http://10.6.98.55:8009/",
                ws:true,
                changeOrigin: true,
                pathRewrite: {
                    '^/down':'/'
                }
            }
        }
    },
    productionSourceMap: false
}