const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const transactionExpensesSchema = new Schema({
    year : { type : Number , required : true},
    month : { type : Number, required : true},
    day : { type : Number, required : true},
    reason : { type : String, required : true},
    amount : {type : Number, required : true},
    issuedPerson : { type : String, required : true},
     
},{
        timestamps : true,
    
});
//utilityBillSchema.index({ year: 1, month: 1 }, { unique: true })

const Transaction = mongoose.model('Transaction', transactionExpensesSchema);

module.exports = Transaction;