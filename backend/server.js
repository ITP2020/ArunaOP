const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

//mongo db connection
const uri = process.env.ATLAS_URI;
mongoose.connect (uri, { useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology : true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo DB connection established successfully");
})

const electricityExpensesRouter = require('./routes/electricityExpenses');
const waterExpensesRouter = require('./routes/waterExpenses');
const transactionExpensesRouter = require('./routes/transactionExpenses');
const leaveRouter = require('./routes/leave');
const salaryRouter = require('./routes/salary');
const employeeRouter = require('./routes/employee');
const orderRouter = require('./routes/order');
const vehicleRouter = require('./routes/vehicle');
const finishedproductRouter = require('./routes/finishedproduct');
const rawmaterialRouter = require('./routes/rawmaterial');


const usersRouter = require('./routes/users');
const equipmentRouter = require('./routes/equipments');
const repairRouter = require('./routes/repairs');
const reportRouter = require('./routes/reports');

const supplyRouter = require('./routes/supply');
const supplierRouter = require('./routes/supplier');



app.use('/electricityExpenses', electricityExpensesRouter);
app.use('/waterExpenses', waterExpensesRouter);
app.use('/transactionExpenses', transactionExpensesRouter);
app.use('/leave' , leaveRouter);
app.use('/salary' , salaryRouter);
app.use('/employee', employeeRouter);
app.use('/order', orderRouter);
app.use('/vehicle', vehicleRouter);

app.use('/users',usersRouter);
app.use('/equipments',equipmentRouter);
app.use('/repairs',repairRouter);
app.use('/reports',reportRouter);
app.use('/finishedproduct', finishedproductRouter);
app.use('/rawmaterial', rawmaterialRouter);

app.use('/supply',supplyRouter);
app.use('/supplier',supplierRouter);

app.listen(port, () => {
    console.log(`Server is running on port:-${port}`);
});