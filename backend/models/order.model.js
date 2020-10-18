const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderNumber: {type :Number, required : true},
    customerName :{type :String, required : true},
    address :{type :String, required : true},
    contactNo :{type :String, required : true},
    design : {type : String, required : true},
    size : {type : String, required : true},
    quantity : {type : Number, required : true},
    printingMaterials : {type : String, required : true},
    orderType : {type : String, required : true},
    orderStatus : {type : String, required:true},

},{

    timestamps : true,

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;