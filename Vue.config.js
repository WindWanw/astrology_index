module.exports = {
    publicPath: "./",
    devServer: {
        proxy: {
            "/dev": {
                target: "http://www.ast.gold.com/",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/dev': ''
                }
            },
            "/api": {
                target: "http://www.ast.gold/",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        open: true
    },
    lintOnSave: false,
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
};