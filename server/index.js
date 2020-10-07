const express = require('express')
const app = express()

const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const logger = require('morgan')

const getEnv = require('./env/getEnv')

/**
 * Express configuration.
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(logger('dev', {
    skip: function (req, res) {
        return req.originalUrl.includes('/heartbeat/')
    }
}))
app.use(errorHandler())

/**
 * Start Express server.
 */
setTimeout(async () => {
    /**
     * Config routes.
     */
    app.use(require('./routers'))
    app.use(require('./googleAuth'))
    app.use(require('./facebookAuth'))

    const server = require('http').createServer(app)
    const port = getEnv('/port')
    server.listen(port, () => {
        console.log(`Listening on port ${port}...`)
    })
}, 0)

process.on('uncaughtException', (err) => {
    console.error('Caught exception: ', err)
})


