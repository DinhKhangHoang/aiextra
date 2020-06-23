const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware("/maps/api/directions/*",
        { target: "https://maps.googleapis.com", changeOrigin: true, }
    ));
}