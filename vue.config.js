module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        port: 8091,     // 端口
        open: true,     // 自动打开浏览器
        proxy: {
            '/api':{
                target:process.env.VUE_APP_API_ROOT,
                changeOrigin:true,
                pathRewrite:{
                    '/api':'http://localhost:8091'
                }
            }
        }
    },
    lintOnSave: false, 
    outputDir:'full-factor'
}