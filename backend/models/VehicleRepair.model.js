const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RepairSchema = new Schema({
    plateNo: { type: String, required: true },
    date: { type: Date, required: true },
    repair: { type: String, required: true },
    cost: { type: Number, required: true },
    place: { type: String, required: true },
    reviews: { type: String, required: true },

}, {
    timestamps: true,

});
//utilityBillSchema.index({ year: 1, month: 1 }, { unique: true })

const Repair = mongoose.model('Repair', RepairSchema);

module.exports = Repair;