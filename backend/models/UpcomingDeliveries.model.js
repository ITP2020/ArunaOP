const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UpcomingDeliveriesSchema = new Schema(
{
    OrderId: { type: String, required: true },
    CustomerName: { type: String, required: true },
    ContactNo: { type: Number, required: true },
    Item: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Location: { type: String, required: true },
},
{
    timestamps: true,
}
);

const UpcomingDeliveries = mongoose.model("UpcomingDeliveries",UpcomingDeliveriesSchema);

module.exports = UpcomingDeliveries;
