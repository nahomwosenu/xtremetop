const mongoose = require('mongoose')
const GameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    iconUrl: { type: String },
    description: { type: String },
    releaseDate: { type: Date },
    developer: { type: String },
    genres: [{ type: String }],
    platforms: [{ type: String }],
    gameId: [{ type: String }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Game', GameSchema)
