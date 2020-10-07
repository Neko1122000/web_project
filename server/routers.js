const express = require('express')
const routers = express.Router()

const test = require('./controllers/heartbeat')
routers.get('/ping', test.pong)

const user = require('./controllers/user')
routers.post('/login', user.login)

module.exports = routers