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

app.use('/electricityExpenses', electricityExpensesRouter);
app.use('/waterExpenses', waterExpensesRouter);
app.use('/transactionExpenses', transactionExpensesRouter);

app.listen(port, () => {
    console.log(`Server is running on port:-${port}`);
});