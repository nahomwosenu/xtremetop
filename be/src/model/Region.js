const mongoose = require('mongoose');
const RegionSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

module.exports = mongoose.model('Region', RegionSchema);