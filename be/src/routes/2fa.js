const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middlewares/auth')
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const User = require('../model/User')

// Setup 2FA
router.post('/setup', isAuthenticated, async (req, res) => {
  const secret = speakeasy.generateSecret()
  const user = req.user
  user.twoFactorSecret = secret.base32
  await user.save()

  qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
    if (err)
      return res.status(500).json({ message: 'Error generating QR code' })
    res.status(200).json({ qrCode: data_url })
  })
})

// Verify 2FA Token
router.post('/verify', isAuthenticated, async (req, res) => {
  const { token } = req.body
  const user = req.user
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token
  })

  if (verified) {
    user.isTwoFactorEnabled = true
    await user.save()
    res.status(200).json({ message: '2FA enabled' })
  } else {
    res.status(400).json({ message: 'Invalid token' })
  }
})

// Login with 2FA Token
router.post('/login', isAuthenticated, (req, res) => {
  const { token } = req.body
  const user = req.user
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token
  })

  if (verified) {
    res.status(200).json({ message: 'Logged in successfully' })
  } else {
    req.logout()
    res.status(400).json({ message: 'Invalid token' })
  }
})

module.exports = router
