// routes/advertPayments.js
const express = require('express');
const router = express.Router();
const AdvertPayment = require('../models/AdvertPayment');
const isAuthenticated = require('../middlewares/auth')

// GET all Advert Payments
router.get('/', async (req, res) => {
    try {
        const payments = await AdvertPayment.find().populate('advertId');
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET specific Advert Payment by advertId
router.get('/:advertId', async (req, res) => {
    try {
        const payment = await AdvertPayment.findOne({ advertId: req.params.advertId });
        if (!payment) return res.status(404).json({ error: 'AdvertPayment not found' });
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// CREATE a new Advert Payment
router.post('/', async (req, res) => {
    try {
        const { advertId, maxDisplayCount, daysToShow } = req.body;

        const newPayment = new AdvertPayment({
            advertId,
            maxDisplayCount,
            daysToShow,
        });

        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE Advert Payment (e.g., increment display count or update payment status)
router.patch('/:id', async (req, res) => {
    try {
        const updatedPayment = await AdvertPayment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedPayment) return res.status(404).json({ error: 'AdvertPayment not found' });
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE Advert Payment
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const deletedPayment = await AdvertPayment.findByIdAndDelete(req.params.id);
        if (!deletedPayment) return res.status(404).json({ error: 'AdvertPayment not found' });
        res.status(200).json({ message: 'AdvertPayment deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
