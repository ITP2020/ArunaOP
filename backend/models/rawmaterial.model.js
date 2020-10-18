const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const rawmaterialSchema = new Schema({
    materialName: {type :String, required : true},
    storedDate : {type : Date, required : false},
    description : {type : String, required : true},
    category : {type : String, required : true},
    quantity : {type : Number, required : true},
     
},{
        timestamps : true,
    
});


const Rawmaterial = mongoose.model("Rawmaterial", rawmaterialSchema);

module.exports = Rawmaterial;