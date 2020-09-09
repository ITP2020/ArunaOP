const router = require('express').Router();
let Electricity = require('../models/electricityExpenses.model');

router.route('/').get((req,res) => {
    Electricity.find()
        .then(electricityExpenses => res.json(electricityExpenses))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/add').post((req,res) => {
    const year = Number(req.body.year);
    const month = Number(req.body.month);
    const amount = Number(req.body.amount);
    

    const newElectricity = new Electricity({
        year,
        month,
        amount,
       
    });
    newElectricity.save()
        .then(() => res.json('Electricity Bill added!'))
        .catch(err => res.status(400).json('Error : ' +err));
});
router.route('/:id').get((req,res) => {
    Electricity.findById(req.params.id)
        .then(electricityExpenses => res.json(electricityExpenses))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/:id').delete((req,res) => {
    Electricity.findByIdAndDelete(req.params.id)
        .then(() => res.json('Electricity bill deleted'))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/update/:id').post((req,res) => {
    Electricity.findById(req.params.id)
        .then(electricityExpenses => {
            electricityExpenses.year = Number(req.body.year);
            electricityExpenses.month = Number(req.body.month);
            electricityExpenses.amount = Number(req.body.amount);

            electricityExpenses.save()
                .then(() => res.json('Electricity Bill updated'))
                .catch(err => res.status(400).json('Error : ' +err));
        })

        .catch(err => res.status(400).json('Error : ' +err));
});
module.exports = router;