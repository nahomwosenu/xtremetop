// config/passport.js
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const User = require('../model/User')

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findById(id, done)
})

// Local Strategy for basic authentication
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user)
          return done(null, false, { message: 'Incorrect email or password.' })

        const isMatch = await bcrypt.compare(password, user.passwordHash)
        if (!isMatch)
          return done(null, false, { message: 'Incorrect email or password.' })

        // Check if 2FA is enabled
        if (user.isTwoFactorEnabled) {
          return done(null, user, { twoFactorRequired: true })
        }

        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

// Google Strategy for social login
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          'socialProviders.providerId': profile.id,
          'socialProviders.provider': 'google'
        })

        if (!user) {
          user = new User({
            displayName: profile.displayName,
            email: profile.emails[0].value,
            avatarUrl: profile.photos[0].value,
            socialProviders: [
              {
                provider: 'google',
                providerId: profile.id,
                accessToken,
                refreshToken
              }
            ]
          })
          await user.save()
        } else {
          // Update tokens
          const provider = user.socialProviders.find(
            p => p.provider === 'google'
          )
          provider.accessToken = accessToken
          provider.refreshToken = refreshToken
          await user.save()
        }

        done(null, user)
      } catch (err) {
        done(err)
      }
    }
  )
)

// Facebook Strategy for social login
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'emails', 'displayName', 'photos']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          'socialProviders.providerId': profile.id,
          'socialProviders.provider': 'facebook'
        })

        if (!user) {
          user = new User({
            displayName: profile.displayName,
            email: profile.emails[0].value,
            avatarUrl: profile.photos[0].value,
            socialProviders: [
              {
                provider: 'facebook',
                providerId: profile.id,
                accessToken,
                refreshToken
              }
            ]
          })
          await user.save()
        } else {
          // Update tokens
          const provider = user.socialProviders.find(
            p => p.provider === 'facebook'
          )
          provider.accessToken = accessToken
          provider.refreshToken = refreshToken
          await user.save()
        }

        done(null, user)
      } catch (err) {
        done(err)
      }
    }
  )
)

module.exports = passport
