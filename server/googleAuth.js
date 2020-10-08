const express = require('express')
const routers = express.Router()
const getEnv = require('./env/getEnv')

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

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

const user = require('./controllers/user')
routers.get('/auth/google', passport.authenticate("google", {scope: ["profile", "email"], session: false}))
routers.get('/auth/google/callback', passport.authenticate('google', {session: false}), user.generateToken);

module.exports = routers