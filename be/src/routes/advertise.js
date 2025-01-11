// routes/advertise.js
const express = require('express')
const router = express.Router()
const Advert = require('../model/Advert')
const isAuthenticated = require('../middlewares/auth')

router.get("/", async (req, res) => {
    try {
        const adverts = await Advert.find()
        res.status(200).json(adverts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

router.post("/", async (req, res) => {
    try {
        const newAd = new Advert(req.body)
        await newAd.save()
        res.status(201).json(newAd)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})