const mongoose = require('mongoose')
const GameMetaSchema = new mongoose.Schema(
  {
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    title: { type: String, required: true, unique: true },
    fields: {
      type: mongoose.Schema.Types.Mixed, // To handle the flexible structure for fields
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('GameMeta', GameMetaSchema)
