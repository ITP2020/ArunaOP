const router = require('express').Router();
let Repair = require('../models/repair.model');

router.route('/').get((req, res) => {
Repair.find()
    .then(repairs => res.json(repairs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const model = req.body.model;
    const fault = (req.body.fault);
    const date = Date.parse(req.body.date);

const newRepair = new Repair({
    username,
    model,
    fault,
    date,
});

    newRepair.save()
    .then(() => res.json('New Repair added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/:id').get((req, res) => {
    Repair.findById(req.params.id)
    .then(repair => res.json(repair))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Repair.findByIdAndDelete(req.params.id)
    .then(() => res.json('Repair deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Repair.findById(req.params.id)
    .then(repair => {
        repair.username = req.body.username;
        repair.model = req.body.model;
        repair.fault = (req.body.fault);
        repair.date = Date.parse(req.body.date);

      repair.save()
        .then(() => res.json('Repair updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;