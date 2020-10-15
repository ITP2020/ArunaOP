const router = require('express').Router();
let VehicleRepair = require('../models/VehicleRepair.model');

//Return all data from the table

router.route('/').get((req, res) => {
    VehicleRepair.find()
        .then(vehiclerepair => res.json(vehiclerepair))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Add a record to the table

router.route('/add').post((req, res) => {
    const plateNo = (req.body.plateNo);
    const date = Date(req.body.date);
    const repair = (req.body.repair);
    const cost = Number(req.body.cost);
    const place = (req.body.place);
    const reviews = (req.body.reviews);


    const newVehicleRepair = new VehicleRepair({
        plateNo,
        date,
        repair,
        cost,
        place,
        reviews,
    });
    newVehicleRepair.save()
        .then(() => res.json('New Vehicle Repair Added!'))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Return one specific row

router.route('/:id').get((req, res) => {
    VehicleRepair.findById(req.params.id)
        .then(vehiclerepair => res.json(vehiclerepair))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Delete one specific record

router.route('/:id').delete((req, res) => {
    VehicleRepair.findByIdAndDelete(req.params.id)
        .then(() => res.json('Vehicle repair has been deleted!'))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Update a specific record

router.route('/update/:id').post((req, res) => {
    VehicleRepair.findById(req.params.id)
        .then(vehiclerepair => {
            vehiclerepair.plateNo = (req.body.plateNo);
            vehiclerepair.date = (req.body.date);
            vehiclerepair.repair = (req.body.repair);
            vehiclerepair.cost = Number(req.body.cost);
            vehiclerepair.place = (req.body.place);
            vehiclerepair.reviews = Date(req.body.reviews);

            vehiclerepair.save()
                .then(() => res.json('Water Bill updated'))
                .catch(err => res.status(400).json('Error : ' + err));
        })
        .catch(err => res.status(400).json('Error : ' + err));
});
module.exports = router;