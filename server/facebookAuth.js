const express = require('express')
const routers = express.Router()
const getEnv = require('./env/getEnv')

const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const UserAction = require('./actions/UserAction')

passport.use(
    new FacebookStrategy(
        {
            clientID: getEnv('/facebook_client_id'),
            clientSecret: getEnv('/facebook_client_secret'),
            callbackURL: '/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        async (accessToken, refeshToken, profile, done) => {
            const user = await UserAction.createUser(profile, 'facebook')
            return done(null, user._id)
        }
    )
);

const user = require('./controllers/user')
routers.get('/auth/facebook', passport.authenticate('facebook', {session: false}))
routers.get('/auth/facebook/callback', passport.authenticate('facebook', {session: false}), user.generateToken)

module.exports = routers