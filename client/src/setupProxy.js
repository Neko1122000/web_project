const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware(['/api', '/auth', '/ping'], {
      target: 'http://localhost:8080'
    }
  ))
}
