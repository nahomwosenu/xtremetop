const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../model/User')
const isAuthenticated = require('../middlewares/auth')
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and login
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Error message
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body
    let user = await User.findOne({ email })
    if (user)
      return res.status(400).json({ message: 'Email already registered' })

    const passwordHash = await bcrypt.hash(password, 10)
    user = new User({ username, email, passwordHash })
    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Error message
 */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.status(400).json({ message: info.message })
    req.logIn(user, async err => {
      if (err) return next(err)

      if (info && info.twoFactorRequired) {
        // 2FA is required
        return res
          .status(200)
          .json({ message: '2FA required', twoFactorRequired: true })
      }
      console.log('user', user)
      if (!user.emailVerified) {
        return res.status(403).json({
          message:
            "You haven't verified your email address yet, please check your inbox for confirmation"
        })
      }

      res.status(200).json({
        message: 'Logged in successfully',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          avatarUrl: user.avatarUrl
        }
      })
    })
  })(req, res, next)
})

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', isAuthenticated, (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logged out successfully' })
  })
})

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *               bio:
 *                 type: string
 *               socialLinks:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/profile', isAuthenticated, async (req, res) => {
  res
    .status(200)
    .json({ message: 'Update profile endpoint (to be implemented)' })
})

// Get user profile (protected)
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const user = req.user // Retrieved from the session by Passport

    // Return user data
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl
      // Include any other necessary user fields
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user profile' })
  }
})

// Export the router
module.exports = router
