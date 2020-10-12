const express = require('express')
const routers = express.Router()
const getEnv = require('./env/getEnv')

const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const {LocalStorage} = require('node-localstorage')
const localStorage = new LocalStorage('./scratch')

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

routers.get('/auth/facebook', passport.authenticate('facebook', {session: false}))
routers.get('/auth/facebook/callback', passport.authenticate('facebook', {session: false}), async (req, res) => {
    const token = await UserAction.generateToken(req.user)
    localStorage.setItem('token', token)
    res.redirect(`/`)
})

module.exports = routers