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
routers.post('/sets/:id', Oauth.authenticate, sets.update)
routers.get('/sets/:id', Oauth.authenticate, sets.getDetailSet)
routers.delete('/sets/:id', Oauth.authenticate, sets.delete)

const folder = require('./controllers/folder')
routers.post('/folder', Oauth.authenticate, folder.create)
routers.post('/folder/:id', Oauth.authenticate, folder.updateFolder)
routers.delete('/folder/:id', Oauth.authenticate, folder.deleteFolder)
routers.post('/folder/:id/sets', Oauth.authenticate, folder.updateSet)

const history = require('./controllers/user-history')
routers.post('/user/history', Oauth.authenticate, history.create)
module.exports = routers