const router = require('express').Router();
let OngoingDeliveries = require('../models/OngoingDeliveries.model');

//Return all data from the table

router.route('/').get((req, res) => {
    OngoingDeliveries.find()
        .then(ongoingdeliveries => res.json(ongoingdeliveries))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Add a record to the table

router.route('/add').post((req, res) => {
    const OrderId = (req.body.OrderId);
    const CustomerName = (req.body.CustomerName);
    const ContactNo = Number(req.body.ContactNo);
    const Item = (req.body.Item);
    const Quantity = Number(req.body.Quantity);
    const Location = (req.body.Location);
    const Driver = (req.body.Driver);
    const Vehicle = (req.body.Vehicle);
    const DeleveryDate = Date(req.body.DeleveryDate);


    const newOngoingDeliveries = new OngoingDeliveries({
        OrderId,
        CustomerName,
        ContactNo,
        Item,
        Quantity,
        Location,
        Driver,
        Vehicle,
        DeleveryDate,
    });
    newOngoingDeliveries.save()
        .then(() => res.json('Ongoing Delivery Added!'))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Return one specific row

router.route('/:id').get((req, res) => {
    OngoingDeliveries.findById(req.params.id)
        .then(ongoingdeliveries => res.json(ongoingdeliveries))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Delete one specific record

router.route('/:id').delete((req, res) => {
    OngoingDeliveries.findByIdAndDelete(req.params.id)
        .then(() => res.json('Ongoing Delivery has been deleted!'))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Update a specific record

router.route('/update/:id').post((req, res) => {
    OngoingDeliveries.findById(req.params.id)
        .then(ongoingdeliveries => {
            ongoingdeliveries.OrderId = (req.body.OrderId);
            ongoingdeliveries.CustomerName = (req.body.CustomerName);
            ongoingdeliveries.ContactNo = Number(req.body.ContactNo);
            ongoingdeliveries.Item = (req.body.Item);
            ongoingdeliveries.Quantity = Number(req.body.Quantity);
            ongoingdeliveries.Location = (req.body.Location);
            ongoingdeliveries.Driver = (req.body.Driver);
            ongoingdeliveries.Vehicle = (req.body.Vehicle);
            ongoingdeliveries.DeleveryDate = Date(req.body.DeleveryDate);

            ongoingdeliveries.save()
                .then(() => res.json('Ongoing Delivery updated'))
                .catch(err => res.status(400).json('Error : ' + err));
        })

        .catch(err => res.status(400).json('Error : ' + err));
});
module.exports = router;