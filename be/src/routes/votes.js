// routes/votes.js
const express = require('express')
const router = express.Router()
const Vote = require('../model/Vote')
const Server = require('../model/Server')
const isAuthenticated = require('../middlewares/auth')

/**
 * @swagger
 * tags:
 *   name: Votes
 *   description: Voting on servers
 */

/**
 * @swagger
 * /votes:
 *   post:
 *     summary: Vote for a server
 *     tags: [Votes]
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
 *               - rating
 *             properties:
 *               serverId:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Vote recorded successfully
 *       400:
 *         description: Error message
 */
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { serverId, rating } = req.body
    const userId = req.user._id

    // Check if vote already exists
    const existingVote = await Vote.findOne({ user: userId, server: serverId })
    if (existingVote) {
      return res
        .status(400)
        .json({ message: 'You have already voted for this server' })
    }

    const newVote = new Vote({ user: userId, server: serverId, rating })
    await newVote.save()

    // Update server's totalVotes and rating
    const server = await Server.findById(serverId)
    server.totalVotes += 1
    server.rating =
      (server.rating * (server.totalVotes - 1) + rating) / server.totalVotes
    await server.save()

    res.status(201).json({ message: 'Vote recorded successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
