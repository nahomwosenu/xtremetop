const mongoose = require('mongoose')
const Game = require('../src/model/Game')

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/tpg_dev' // Update with your MongoDB URI

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

// Supported games with known gameIds
const supportedGames = {
  '7 Days to Die': 'sdtd',
  'ARK Survival Ascended': 'asa',
  'ARK Survival Evolved': 'ase',
  'Arma 3': 'arma3',
  'Counter Strike 1.6': 'counterstrike16',
  'Counter Strike 2': 'counterstrike2',
  'Counter-Strike - Global Offensive': 'csgo',
  'Counter-Strike - Source': 'css',
  DayZ: 'dayz',
  'Discord Servers': 'discord',
  "Garry's Mod": 'garrysmod',
  'Hell Let Loose': 'hll',
  'Left 4 Dead 2': 'l4d2',
  Minecraft: 'minecraft',
  'Project Zomboid': 'projectzomboid',
  Rust: 'rust',
  Squad: 'squad',
  'Team Fortress 2': 'teamfortress2',
  Terraria: 'terrariatshock',
  Unturned: 'unturned',
  'V Rising': 'vrising',
  Valheim: 'valheim'
}

// Function to update games
async function updateGames () {
  const games = [
    { name: '7 Days to Die' },
    { name: 'ACE Online' },
    { name: 'Aion' },
    { name: 'ARK Survival Ascended' },
    { name: 'ARK Survival Evolved' },
    { name: 'Arma 3' },
    { name: 'Battle of the Immortals' },
    { name: 'Black Desert Online' },
    { name: 'Cabal Online' },
    { name: 'Conquer Online' },
    { name: 'Counter Strike 1.6' },
    { name: 'Counter Strike 2' },
    { name: 'Counter-Strike - Global Offensive' },
    { name: 'Counter-Strike - Source' },
    { name: 'DayZ' },
    { name: 'Dekaron' },
    { name: 'Diablo' },
    { name: 'Discord Servers' },
    { name: 'Dragon Nest' },
    { name: 'Fiesta Online' },
    { name: 'Flyff' },
    { name: "Garry's Mod" },
    { name: 'Half Life' },
    { name: 'Hell Let Loose' },
    { name: 'Iris Online' },
    { name: 'Knight Online' },
    { name: 'Last Chaos' },
    { name: 'Left 4 Dead 2' },
    { name: 'Lineage 2' },
    { name: 'Luna Online' },
    { name: 'MapleStory' },
    { name: 'Metin2' },
    { name: 'Minecraft' },
    { name: 'MMORPG & MPOG' },
    { name: 'Mu Online' },
    { name: 'OGame' },
    { name: 'Perfect World' },
    { name: 'Priston Tale' },
    { name: 'Project Zomboid' },
    { name: 'Ragnarok Online' },
    { name: 'Ran Online' },
    { name: 'RF Online' },
    { name: 'Runescape' },
    { name: 'Rust' },
    { name: 'Shaiya' },
    { name: 'Silkroad Online' },
    { name: 'Squad' },
    { name: 'SwordsMan' },
    { name: 'Tales of Pirates' },
    { name: 'Team Fortress 2' },
    { name: 'Terraria' },
    { name: 'Travian' },
    { name: 'Ultima Online' },
    { name: 'Unturned' },
    { name: 'V Rising' },
    { name: 'Valheim' },
    { name: 'World of Warcraft' }
  ]

  for (let game of games) {
    // Determine the gameId
    const gameId =
      supportedGames[game.name] || game.name.toLowerCase().replace(/ /g, '_')

    // Update or create the game document
    await Game.updateOne(
      { name: game.name },
      { $set: { gameId: [gameId] } },
      { upsert: true }
    )
  }
  console.log('Game IDs updated')
  mongoose.connection.close()
}

// Run the update function
updateGames().catch(console.error)
