// models/AdvertPayment.js
const mongoose = require('mongoose');

const AdvertPaymentSchema = new mongoose.Schema({
    advertId: { type: mongoose.Schema.Types.ObjectId, ref: 'Advert', required: true },
    isPaid: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    displayCount: { type: Number, default: 0 },
    maxDisplayCount: { type: Number, required: true }, // e.g., max number of times the ad can be shown
    daysToShow: { type: Number, required: true }, // Duration in days
    expiresAt: { type: Date, required: true }, // Automatically calculated based on `createdAt` and `daysToShow`
    paymentMethod: { type: String, required: true },
    paymentReference: { type: String, required: true }
});

// Middleware to calculate the expiry date
AdvertPaymentSchema.pre('save', function (next) {
    if (!this.expiresAt) {
        this.expiresAt = new Date(this.createdAt);
        this.expiresAt.setDate(this.expiresAt.getDate() + this.daysToShow);
    }
    next();
});

module.exports = mongoose.model('AdvertPayment', AdvertPaymentSchema);
