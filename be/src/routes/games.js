// routes/games.js
const express = require('express')
const router = express.Router()
const Game = require('../model/Game')
const isAuthenticated = require('../middlewares/auth')

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Game management
 */

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Retrieve a list of games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: A list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
router.get('/', async (req, res) => {
  try {
    const games = await Game.find()
    res.status(200).json(games)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The game ID
 *     responses:
 *       200:
 *         description: Game retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Game not found
 */
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
    if (!game) return res.status(404).json({ message: 'Game not found' })
    res.status(200).json(game)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Add a new game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       201:
 *         description: Game added successfully
 *       400:
 *         description: Error message
 */

router.post('/', isAuthenticated, async (req, res) => {
  try {
    const newGame = new Game(req.body)
    await newGame.save()
    res.status(201).json(newGame)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update a game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The game ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       200:
 *         description: Game updated successfully
 *       400:
 *         description: Error message
 *       404:
 *         description: Game not found
 */
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!updatedGame) return res.status(404).json({ message: 'Game not found' })
    res.status(200).json(updatedGame)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The game ID
 *     responses:
 *       200:
 *         description: Game deleted successfully
 *       404:
 *         description: Game not found
 */
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id)
    if (!deletedGame) return res.status(404).json({ message: 'Game not found' })
    res.status(200).json({ message: 'Game deleted successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
