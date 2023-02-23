const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = app => {
    app.use(
        createProxyMiddleware('user/home', {
            target: 'http://localhost:9000',
            changeOrigin: true
        })
    )
}