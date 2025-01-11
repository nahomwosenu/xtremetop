const mongoose = require('mongoose')
const AdvertSlotSchema = new mongoose.Schema(
    {
        slot: { type: String, required: true },
        id: { type: String, required: true },
        bannerWidth: { type: Number, required: true },
        bannerHeight: { type: Number, required: true },
        pricePerDay: { type: Number, required: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model('AdvertSlot', AdvertSlotSchema)
