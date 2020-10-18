const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const finishedproductSchema = new Schema({
    orderid: {type :String, required : true},
    productName: {type :String, required : true},
    storedDate : {type : Date, required : true},
    description : {type : String, required : true},
    quantity : {type : Number, required : true},
     
},{
        timestamps : true,
    
});


const Finishedproduct = mongoose.model("Finishedproduct", finishedproductSchema);

module.exports = Finishedproduct;