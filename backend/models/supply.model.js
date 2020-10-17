const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const supplySchema = new Schema({
    itemName : { type : String , required : true},
    supplierName : { type : String, required : true},
    price : {type : String, required : true},
    date: {type: String, required: true },
    description: {type: String, required: false}
     
},{
        timestamps : true,
    
});
//utilityBillSchema.index({ year: 1, month: 1 }, { unique: true })

const supply = mongoose.model('Supply', supplySchema);

module.exports = supply;