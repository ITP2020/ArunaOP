const router = require('express').Router();
let Water = require('../models/WaterExpenses.model');

router.route('/').get((req,res) => {
    Water.find()
        .then(waterExpenses => res.json(waterExpenses))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/add').post((req,res) => {
    const year = Number(req.body.year);
    const month = Number(req.body.month);
    const amount = Number(req.body.amount);
    

    const newWater = new Water({
        year,
        month,
        amount,
       
    });
    newWater.save()
        .then(() => res.json('Water Bill added!'))
        .catch(err => res.status(400).json('Error : ' +err));
});
router.route('/:id').get((req,res) => {
    Water.findById(req.params.id)
        .then(waterExpenses => res.json(waterExpenses))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/:id').delete((req,res) => {
    Water.findByIdAndDelete(req.params.id)
        .then(() => res.json('Water bill deleted'))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/update/:id').post((req,res) => {
    Water.findById(req.params.id)
        .then(waterExpenses => {
            waterExpenses.year = Number(req.body.year);
            waterExpenses.month = Number(req.body.month);
            waterExpenses.amount = Number(req.body.amount);

            waterExpenses.save()
                .then(() => res.json('Water Bill updated'))
                .catch(err => res.status(400).json('Error : ' +err));
        })

        .catch(err => res.status(400).json('Error : ' +err));
});
module.exports = router;