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
routers.get('/sets', Oauth.authenticate, sets.search)
routers.post('/sets', Oauth.authenticate, sets.create)
routers.post('/sets/:id', Oauth.authenticate, sets.update)
routers.get('/sets/:id', Oauth.authenticate, sets.getDetailSet)
routers.delete('/sets/:id', Oauth.authenticate, sets.delete)

const folder = require('./controllers/folder')
routers.get('/folder', Oauth.authenticate, folder.search)
routers.get('/folder/:id', Oauth.authenticate, folder.getFolderDetail)
routers.post('/folder', Oauth.authenticate, folder.create)
routers.post('/folder/:id', Oauth.authenticate, folder.updateFolder)
routers.delete('/folder/:id', Oauth.authenticate, folder.deleteFolder)
routers.post('/folder/:id/sets', Oauth.authenticate, folder.updateSet)

const classCtrl = require('./controllers/class')
routers.post('/class', Oauth.authenticate, classCtrl.create)
routers.get('/class/:id', Oauth.authenticate, classCtrl.getDetail)
routers.post('/class/:id', Oauth.authenticate, classCtrl.update)
routers.delete('/class/:id', Oauth.authenticate, classCtrl.delete)
routers.get('/classes', Oauth.authenticate, classCtrl.search)

const classRequest = require('./controllers/class-request')
routers.post('/class/:id/join', Oauth.authenticate, classRequest.create)
routers.get('/class/:id/pending-member', Oauth.authenticate, classRequest.getPendingMembers)
routers.post('/class/:id/approve-members', Oauth.authenticate, classRequest.approveMembers)
routers.post('/class/:id/reject-members', Oauth.authenticate, classRequest.rejectMembers)

const history = require('./controllers/user-history')
routers.post('/user/history', Oauth.authenticate, history.updateOrCreateIfNotExist)
routers.get('/user/history', Oauth.authenticate, history.getUserHistory)

const game = require('./controllers/game')
routers.get('/set/:id/game-record', Oauth.authenticate, game.getRecord)
module.exports = routers