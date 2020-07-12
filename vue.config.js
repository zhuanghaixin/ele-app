module.exports = {
    // publicPath:"/wxzf/dist/" ,   //打包文件相对路径
    devServer: {
        open: true,
        // host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            // 配置跨域
            '/api': {
                target: 'https://ele-interface.herokuapp.com/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            // '/wxzf': {
            //     target: 'http://www.thenewstep.cn/wxzf/example/jsapi.php',
            //     ws: true,
            //     changOrigin: true,
            //     pathRewrite: {
            //         '^/wxzf': ''
            //     }
            // }
        }
    },
    chainWebpack:(config)=>{
        config.plugins.delete('prefetch')
    }
};
