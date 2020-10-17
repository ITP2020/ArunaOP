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
//utilityBillSchema.index({ year: 1, month: 1 }, { unique: true })

const supplier = mongoose.model('supplier', supplierSchema);

module.exports = supplier;