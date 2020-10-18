const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    supplierName : { type : String , required : true},
    address : { type : String, required : true},
    contactNumber : {type : String, required : false},
    email: {type: String, required: false}
     
},{
        timestamps : true,
    
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;