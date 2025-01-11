// routes/reviews.js
const express = require('express')
const router = express.Router()
const Review = require('../model/Review')
const Region = require('../model/Region')

const isAuthenticated = require('../middlewares/auth')

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Reviews for servers
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a review to a server
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serverId
 *               - content
 *             properties:
 *               serverId:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Error message
 */
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { serverId, content, rating } = req.body
    const userId = req.user._id

    const newReview = new Review({
      user: userId,
      server: serverId,
      content,
      rating
    })
    await newReview.save()

    // Optionally, you might want to update server's rating based on reviews

    res.status(201).json(newReview)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * @swagger
 * /reviews/server/{serverId}:
 *   get:
 *     summary: Get all reviews for a server
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: serverId
 *         required: true
 *         schema:
 *           type: string
 *         description: The server ID
 *     responses:
 *       200:
 *         description: A list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       400:
 *         description: Error message
 */
router.get('/server/:serverId', async (req, res) => {
  try {
    const reviews = await Review.find({ server: req.params.serverId }).populate(
      'user',
      'username'
    )
    res.status(200).json(reviews)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/regions', async (req, res) => {
  try {
    const regions = await Region.find({})
    res.status(200).json(regions)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
