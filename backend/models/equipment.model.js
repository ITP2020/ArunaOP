const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
    username: { type: String, required: true },
    model: { type: String, required: true },
    country: { type: String, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;