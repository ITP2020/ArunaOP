const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    plateNo: { type: String, required: true },
    vehicle: { type: String, required: true },
    brand: { type: String, required: true },
    year: { type: Number, required: true },
    type: { type: String, required: true },
    purchaseDate: { type: Date, required: true },

}, {
    timestamps: true,

});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;