const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ErepairSchema = new Schema({
    username: { type: String, required: true },
    model: { type: String, required: true },
    fault: { type: String, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const ERepair = mongoose.model('ERepair', ErepairSchema);

module.exports = ERepair;