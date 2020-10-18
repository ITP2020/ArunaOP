const router = require('express').Router();
let DeliveryQueue = require('../models/DeliveryQueue.model');

//Return all data from the table

router.route('/').get((req, res) => {
    DeliveryQueue.find()
        .then(deliveryqueue => res.json(deliveryqueue))
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


    const newDeliveryQueue = new DeliveryQueue({
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
    newDeliveryQueue.save()
        .then(() => res.json('Delivery Queue Added!'))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Return one specific row

router.route('/:id').get((req, res) => {
    DeliveryQueue.findById(req.params.id)
        .then(deliveryqueue => res.json(deliveryqueue))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Delete one specific record

router.route('/:id').delete((req, res) => {
    DeliveryQueue.findByIdAndDelete(req.params.id)
        .then(() => res.json('Delivery Queue has been deleted!'))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Update a specific record

router.route('/update/:id').post((req, res) => {
    DeliveryQueue.findById(req.params.id)
        .then(deliveryqueue => {
            deliveryqueue.OrderId = (req.body.OrderId);
            deliveryqueue.CustomerName = (req.body.CustomerName);
            deliveryqueue.ContactNo = Number(req.body.ContactNo);
            deliveryqueue.Item = (req.body.Item);
            deliveryqueue.Quantity = Number(req.body.Quantity);
            deliveryqueue.Location = (req.body.Location);
            deliveryqueue.Driver = (req.body.Driver);
            deliveryqueue.Vehicle = (req.body.Vehicle);
            deliveryqueue.DeleveryDate = Date(req.body.DeleveryDate);

            deliveryqueue.save()
                .then(() => res.json('Delivery Queue updated'))
                .catch(err => res.status(400).json('Error : ' + err));
        })

        .catch(err => res.status(400).json('Error : ' + err));
});
module.exports = router;