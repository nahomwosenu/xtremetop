// routes/advertPayments.js
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth');
const AdvertSlot = require('../model/AdvertSlot');

router.get('/', async (req, res) => {
    try {
        const payments = await AdvertSlot.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', isAuthenticated, async (req, res) => {
    try {
        let ad = await AdvertSlot.create(req.body);
        ad = await ad.save();
        res.status(201).json(ad);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;