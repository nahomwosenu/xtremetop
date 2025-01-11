const mongoose = require('mongoose');
const VoteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    server: { type: mongoose.Schema.Types.ObjectId, ref: 'Server', required: true },
    rating: { type: Number, min: 1, max: 5 },
}, { timestamps: true });

// Ensure a user can only vote once per server
VoteSchema.index({ user: 1, server: 1 }, { unique: true });

module.exports = mongoose.model('Vote', VoteSchema);
