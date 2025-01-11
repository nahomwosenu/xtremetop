const express = require('express')
const router = express.Router()
const GameMeta = require('../model/GameMeta')

// Read a specific GameMeta by Game ID
router.get('/:gameId', async (req, res) => {
  try {
    const gameMeta = await GameMeta.findOne({
      game: req.params.gameId
    }).populate('game')
    if (!gameMeta)
      return res.status(404).json({ message: 'GameMeta not found' })
    res.status(200).json(gameMeta)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Read all GameMeta entries
router.get('/', async (req, res) => {
  try {
    const gameMetas = await GameMeta.find().populate('game')
    res.status(200).json(gameMetas)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
