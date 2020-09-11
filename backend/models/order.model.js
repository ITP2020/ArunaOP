const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderNumber: {type :Number, required : true},
    customerName :{type :String, required : true},
    design : {type : String, required : true},
    length : {type : Number, required : true},
    height : {type : Number, required : true},
    quantity : {type : Number, required : true},
    printingMaterials : {type : String, required : true},
    specialNotes : {type : String, required : true},
    orderStatus : {type : String, required:true},

},{

    timestamps : true,

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;