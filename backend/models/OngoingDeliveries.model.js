const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OngoingDeliveriesSchema = new Schema(
{
    OrderId: { type: String, required: true },
    CustomerName: { type: String, required: true },
    ContactNo: { type: Number, required: true },
    Item: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Location: { type: String, required: true },
    Driver: { type: String, required: true },
    Vehicle: { type: String, required: true },
    Date: { type: Date, required: true },
},
{
    timestamps: true,
}
);

const OngoingDeliveries = mongoose.model("OngoingDeliveries",OngoingDeliveriesSchema);

module.exports = OngoingDeliveries;
