const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware(['/api', '/auth/google', '/ping'], {
      target: 'http://localhost:8080',
    })
  )
}
