const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    fullName: {type :String, required : true},
    nic :{type :String, required : true},
    empID : {type : String, required : true},
    dob : {type : Date, required : true},
    designation : {type : String, required : true},
    section : {type : String, required : true},
    address : {type : String, required : true},
    contactNo : {type : Number, required : true},
    emergency : {type : Number, required : true},
     
},{
        timestamps : true,
    
});


const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;