const router = require('express').Router();
let Vehicle = require('../models/Vehicle.model');

//Return all data from the table

router.route('/').get((req, res) => {
    Vehicle.find()
        .then(vehicles => res.json(vehicles))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Add a record to the table

router.route('/add').post((req, res) => {
    const plateNo = (req.body.plateNo);
    const vehicle = (req.body.vehicle);
    const brand = (req.body.brand);
    const year = Number(req.body.year);
    const type = (req.body.type);
    const purchaseDate = Date(req.body.purchaseDate);


    const newVehicle = new Vehicle({
        plateNo,
        vehicle,
        brand,
        year,
        type,
        purchaseDate,
    });
    newVehicle.save()
        .then(() => res.json('New Vehicle Added!'))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Return one specific row

router.route('/:id').get((req, res) => {
    Vehicle.findById(req.params.id)
        .then(vehicle => res.json(vehicle))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Delete one specific record

router.route('/:id').delete((req, res) => {
    Vehicle.findByIdAndDelete(req.params.id)
        .then(() => res.json('Vehicle has been deleted!'))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Update a specific record

router.route('/update/:id').post((req, res) => {
    Vehicle.findById(req.params.id)
        .then(vehicle => {
            vehicle.plateNo = (req.body.plateNo);
            vehicle.vehicle = (req.body.vehicle);
            vehicle.brand = (req.body.brand);
            vehicle.year = Number(req.body.year);
            vehicle.type = (req.body.type);
            vehicle.purchaseDate = Date(req.body.purchaseDate);

            vehicle.save()
                .then(() => res.json('Vehicle updated'))
                .catch(err => res.status(400).json('Error : ' + err));
        })

        .catch(err => res.status(400).json('Error : ' + err));
});
module.exports = router;