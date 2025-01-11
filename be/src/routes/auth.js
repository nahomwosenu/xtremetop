const express = require('express')
const router = express.Router()
const passport = require('passport')

// Google Auth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/') // Redirect to frontend homepage
  }
)

// Facebook Auth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/') // Redirect to frontend homepage
  }
)

module.exports = router
