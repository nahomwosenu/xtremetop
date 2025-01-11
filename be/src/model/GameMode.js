const mongoose = require('mongoose');
const GameModeSchema = new mongoose.Schema({
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    name: { type: String, required: true },
});

module.exports = mongoose.model('GameMode', GameModeSchema);