module.exports = {
    // lintOnSave:false, //关闭语法检查
    publicPath : process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: 'dist',
    devServer : {
        proxy : {
            '/api' :{
                // target: 'http://www.codeman.ink:3000',
                target: 'http://101.33.214.39:3000',
                // target: 'http://localhost:3000/',
                pathRewrite: {'^/api':''},
                ws: true, //websocket
                changeOrigin: true
            },  //设置代理，跨域通信
        }
    }
}