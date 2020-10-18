const router = require('express').Router();
let CompletedDeliveries = require('../models/CompletedDeliveries.model');

//Return all data from the table

router.route('/').get((req, res) => {
    CompletedDeliveries.find()
        .then(completeddeliveries => res.json(completeddeliveries))
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


    const newCompletedDeliveries = new CompletedDeliveries({
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
    newCompletedDeliveries.save()
        .then(() => res.json('Completed Delivery Added!'))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Return one specific row

router.route('/:id').get((req, res) => {
    CompletedDeliveries.findById(req.params.id)
        .then(completeddeliveries => res.json(completeddeliveries))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Delete one specific record

router.route('/:id').delete((req, res) => {
    CompletedDeliveries.findByIdAndDelete(req.params.id)
        .then(() => res.json('Completed Delivery has been deleted!'))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Update a specific record

router.route('/update/:id').post((req, res) => {
    CompletedDeliveries.findById(req.params.id)
        .then(completeddeliveries => {
            completeddeliveries.OrderId = (req.body.OrderId);
            completeddeliveries.CustomerName = (req.body.CustomerName);
            completeddeliveries.ContactNo = Number(req.body.ContactNo);
            completeddeliveries.Item = (req.body.Item);
            completeddeliveries.Quantity = Number(req.body.Quantity);
            completeddeliveries.Location = (req.body.Location);
            completeddeliveries.Driver = (req.body.Driver);
            completeddeliveries.Vehicle = (req.body.Vehicle);
            completeddeliveries.DeleveryDate = Date(req.body.DeleveryDate);

            completeddeliveries.save()
                .then(() => res.json('Completed Delivery updated'))
                .catch(err => res.status(400).json('Error : ' + err));
        })

        .catch(err => res.status(400).json('Error : ' + err));
});
module.exports = router;