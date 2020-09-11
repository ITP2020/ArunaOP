const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const electricityExpensesSchema = new Schema({
    year : { type : Number , maxlength : 4, minlength : 2,required : true,},
    month : { type : Number, required : true},
    amount : {type : Number, required : true},
     
},{
        timestamps : true,
    
});


const Electricity = mongoose.model('Electricity', electricityExpensesSchema);

module.exports = Electricity;