const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    server: { type: mongoose.Schema.Types.ObjectId, ref: 'Server', required: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
