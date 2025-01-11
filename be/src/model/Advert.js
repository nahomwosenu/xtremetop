const mongoose = require('mongoose')
const AdvertSchema = new mongoose.Schema(
    {
        slot: { type: mongoose.Schema.Types.ObjectId, ref: 'AdvertSlot', required: true },
        game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
        title: { type: String },
        tags: [{ type: String }],
        website: { type: String, required: true },
        banner: { type: String },
        email: { type: String },
        period: { type: Number, required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Advert', AdvertSchema)
