const router = require('express').Router();
let Equipment = require('../models/equipment.model');

router.route('/').get((req, res) => {
Equipment.find()
    .then(equipments => res.json(equipments))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const model = req.body.model;
    const country = (req.body.country);
    const date = Date.parse(req.body.date);

const newEquipment = new Equipment({
    username,
    model,
    country,
    date,
});

    newEquipment.save()
    .then(() => res.json('New Equipment added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/:id').get((req, res) => {
    Equipment.findById(req.params.id)
    .then(equipment => res.json(equipment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Equipment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Equipment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Equipment.findById(req.params.id)
    .then(equipment => {
        equipment.username = req.body.username;
        equipment.model = req.body.model;
        equipment.country = (req.body.country);
        equipment.date = Date.parse(req.body.date);

      equipment.save()
        .then(() => res.json('Equipment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;