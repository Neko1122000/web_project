const express = require('express')
const routers = express.Router()

const Oauth = require('./middleware/Oauth')

const test = require('./controllers/heartbeat')
routers.get('/ping', test.pong)

const user = require('./controllers/user')
routers.post('/login', user.login)
routers.get('/token/refresh', user.refreshToken)

routers.get('/user/setting', Oauth.authenticate, user.getUserSetting)
routers.post('/user/setting', Oauth.authenticate, user.updateUserSetting)

const sets = require('./controllers/sets')
routers.post('/sets', Oauth.authenticate, sets.create)
module.exports = routers