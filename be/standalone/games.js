const mongoose = require('mongoose')
const fs = require('fs')
const Game = require('../src/model/Game')
const GameMeta = require('../src/model/GameMeta')

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/tpg_dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

// Load the games.json file
const gamesData = JSON.parse(fs.readFileSync('games.json', 'utf-8'))

const loadGameData = async () => {
  try {
    for (const gameData of gamesData) {
      // Check if the game already exists
      let game = await Game.findOne({ name: gameData.name })
      if (!game) {
        // Create a new Game document
        game = new Game({
          name: gameData.name,
          iconUrl: '', // Update with appropriate data
          description: '', // Update with appropriate data
          releaseDate: new Date(), // Placeholder date, update accordingly
          developer: '', // Update with appropriate data
          genres: [], // Update with appropriate genres
          platforms: [] // Update with appropriate platforms
        })
        await game.save()
      }

      // Check if the GameMeta already exists for the game
      let gameMeta = await GameMeta.findOne({ game: game._id })
      if (!gameMeta) {
        // Create new GameMeta data
        gameMeta = new GameMeta({
          game: game._id,
          title: gameData.name + ' Metadata',
          fields: gameData.fields
        })
        await gameMeta.save()
      }
    }

    console.log('Game data successfully loaded')
    mongoose.disconnect() // Close the MongoDB connection
  } catch (error) {
    console.error('Error loading game data:', error)
  }
}

// Run the script
loadGameData()
