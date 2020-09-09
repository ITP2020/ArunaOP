const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const electricityExpensesSchema = new Schema({
    year : { type : Number , required : true},
    month : { type : Number, required : true},
    amount : {type : Number, required : true},
     
},{
        timestamps : true,
    
});
//utilityBillSchema.index({ year: 1, month: 1 }, { unique: true })

const Electricity = mongoose.model('Electricity', electricityExpensesSchema);

module.exports = Electricity;