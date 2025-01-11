// routes/servers.js
const express = require('express')
const router = express.Router()
const Server = require('../model/Server')
const isAuthenticated = require('../middlewares/auth')
const { queryGameServer } = require('../utils/server-util')
const GameDig = require('gamedig')

/**
 * @swagger
 * tags:
 *   name: Servers
 *   description: Server browsing and management
 */

/**
 * @swagger
 * /servers:
 *   get:
 *     summary: Retrieve a list of servers with optional filters
 *     tags: [Servers]
 *     parameters:
 *       - in: query
 *         name: game
 *         schema:
 *           type: string
 *         description: Game ID to filter servers
 *       - in: query
 *         name: gameMode
 *         schema:
 *           type: string
 *         description: Game mode to filter servers
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Region to filter servers
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [rating, playerCount]
 *         description: Sort servers by rating or player count
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for server names
 *     responses:
 *       200:
 *         description: A list of servers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Server'
 */
router.get('/', async (req, res) => {
  try {
    const { game, gameMode, region, sortBy, search } = req.query
    let filters = {}
    if (game) filters.game = game
    if (gameMode) filters.gameMode = gameMode
    if (region) filters.region = region
    if (search) filters.name = { $regex: search, $options: 'i' }

    let query = Server.find(filters).populate('game')

    // Sorting
    if (sortBy) {
      const sortOptions = {
        rating: { rating: -1 },
        playerCount: { currentPlayerCount: -1 }
      }
      query = query.sort(sortOptions[sortBy])
    }

    const servers = await query.exec()
    res.status(200).json(servers)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * @swagger
 * /servers/{id}:
 *   get:
 *     summary: Get server details
 *     tags: [Servers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The server ID
 *     responses:
 *       200:
 *         description: Server details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Server'
 *       404:
 *         description: Server not found
 */
router.get('/:id', async (req, res) => {
  try {
    const server = await Server.findById(req.params.id)
      .populate('owner', 'username')
      .populate('game')
      .populate({
        path: 'reviews',
        populate: { path: 'user', select: 'username' }
      })
    if (!server) return res.status(404).json({ message: 'Server not found' })
    res.status(200).json(server)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * @swagger
 * /servers:
 *   post:
 *     summary: Add a new server
 *     tags: [Servers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Server'
 *     responses:
 *       201:
 *         description: Server added successfully
 *       400:
 *         description: Error message
 */
router.post('/', isAuthenticated, async (req, res) => {
  try {
    // In the future, get user ID from req.session or token
    const userId = req.user._id
    const newServer = new Server({
      ...req.body,
      owner: userId
    })
    await newServer.save()
    res.status(201).json(newServer)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * @swagger
 * /servers/{id}:
 *   put:
 *     summary: Update a server
 *     tags: [Servers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The server ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Server'
 *     responses:
 *       200:
 *         description: Server updated successfully
 *       400:
 *         description: Error message
 *       403:
 *         description: Not authorized to update this server
 *       404:
 *         description: Server not found
 */
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const server = await Server.findById(req.params.id)
    if (!server) return res.status(404).json({ message: 'Server not found' })

    // Check if the current user is the owner
    const userId = req.user._id
    if (server.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ message: 'Not authorized to update this server' })
    }

    Object.assign(server, req.body)
    await server.save()
    res.status(200).json(server)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/**
 * @swagger
 * /servers/{id}:
 *   delete:
 *     summary: Delete a server
 *     tags: [Servers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The server ID
 *     responses:
 *       200:
 *         description: Server deleted successfully
 *       403:
 *         description: Not authorized to delete this server
 *       404:
 *         description: Server not found
 */
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const server = await Server.findById(req.params.id)
    if (!server) return res.status(404).json({ message: 'Server not found' })

    // Check if the current user is the owner or admin
    const userId = req.user._id
    // In the future, check user role from the session or token
    const isAdmin = false

    if (server.owner.toString() !== userId && !isAdmin) {
      return res
        .status(403)
        .json({ message: 'Not authorized to delete this server' })
    }

    await server.remove()
    res.status(200).json({ message: 'Server deleted successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/*router.get('/server-info/:ip/:port', async (req, res) => {
  const { ip, port } = req.params

  try {
    const serverInfo = await queryGameServer(ip, parseInt(port, 10))
    res.json(serverInfo)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})*/
router.get('/server-info/:type/:ip/:port?', async (req, res) => {
  const { type, ip, port } = req.params

  try {
    const state = await GameDig.query({
      type: type, // Game type, e.g., 'csgo', 'tf2', 'minecraft', etc.
      address: ip, // The IP address of the game server
      port: port ? parseInt(port) : undefined, // Optional port; will use default if not set
      maxRetries: 3, // Number of retries to query server in case of failure
      socketTimeout: 2000, // Time in ms to wait for a single packet
      attemptTimeout: 10000, // Total time for an entire query attempt
      debug: true
    })

    // Respond with the server information
    res.json({
      name: state.name,
      map: state.map,
      maxPlayers: state.maxplayers,
      currentPlayers: state.players.length,
      players: state.players,
      bots: state.bots,
      passwordProtected: state.password,
      raw: state.raw // Includes all information from the server
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Server is offline or unreachable. ', e: error })
  }
})

module.exports = router
