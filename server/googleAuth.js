const express = require('express')
const routers = express.Router()
const getEnv = require('./env/getEnv')

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const {LocalStorage} = require('node-localstorage')
const localStorage = new LocalStorage('./scratch')

const UserAction = require('./actions/UserAction')

passport.use(
    new GoogleStrategy(
        {
            clientID: getEnv('/google_client_id'),
            clientSecret: getEnv('/google_client_secret'),
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refeshToken, profile, done) => {
            const user = await UserAction.createUser(profile, 'google')
            return done(null, user._id)
        }
    )
);

routers.get('/auth/google', passport.authenticate("google", {scope: ["profile", "email"], session: false}))
routers.get('/auth/google/callback', passport.authenticate('google', {session: false}), async (req, res) => {
    const token = await UserAction.generateToken(req.user)
    localStorage.setItem('token', token)
    res.redirect(`/`)
});

module.exports = routers