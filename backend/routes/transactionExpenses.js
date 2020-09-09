const router = require('express').Router();
let Transaction = require('../models/transactionExpenses.model');

router.route('/').get((req,res) => {
    Transaction.find()
        .then(transactionExpenses => res.json(transactionExpenses))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/add').post((req,res) => {
    const year = Number(req.body.year);
    const month = Number(req.body.month);
    const day = Number(req.body.day);
    const reason = req.body.reason;
    const amount = Number(req.body.amount);
    const issuedPerson = req.body.issuedPerson;
    

    const newTransaction = new Transaction({
        year,
        month,
        day,
        reason,
        amount,
        issuedPerson,
       
    });
    newTransaction.save()
        .then(() => res.json('New Transaction added!'))
        .catch(err => res.status(400).json('Error : ' +err));
});
router.route('/:id').get((req,res) => {
    Transaction.findById(req.params.id)
        .then(transactionExpenses => res.json(transactionExpenses))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/:id').delete((req,res) => {
    Transaction.findByIdAndDelete(req.params.id)
        .then(() => res.json('Transaction deleted'))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/update/:id').post((req,res) => {
    Transaction.findById(req.params.id)
        .then(transactionExpenses => {
            transactionExpenses.year = Number(req.body.year);
            transactionExpenses.month = Number(req.body.month);
            transactionExpenses.day = Number(req.body.day);
            transactionExpenses.reason = req.body.reason;
            transactionExpenses.amount = Number(req.body.amount);
            transactionExpenses.issuedPerson = req.body.issuedPerson;

            transactionExpenses.save()
                .then(() => res.json('Transaction updated'))
                .catch(err => res.status(400).json('Error : ' +err));
        })

        .catch(err => res.status(400).json('Error : ' +err));
});
module.exports = router;