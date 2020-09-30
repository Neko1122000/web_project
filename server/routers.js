const express = require('express')
const routers = express.Router()

const test = require('./controllers/heartbeat')

routers.get('/ping', test.pong)

module.exports = routers