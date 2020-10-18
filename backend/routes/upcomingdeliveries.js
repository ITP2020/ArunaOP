const router = require('express').Router();
let UpcomingDeliveries = require('../models/UpcomingDeliveries.model');

//Return all data from the table

router.route('/').get((req, res) => {
    UpcomingDeliveries.find()
        .then(upcomingdelivery => res.json(upcomingdelivery))
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


    const newUpcomingDeliveries = new UpcomingDeliveries({
        OrderId,
        CustomerName,
        ContactNo,
        Item,
        Quantity,
        Location,
    });
    newUpcomingDeliveries.save()
        .then(() => res.json('New Upcoming Delivery Added!'))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Return one specific row

router.route('/:id').get((req, res) => {
    UpcomingDeliveries.findById(req.params.id)
        .then(upcomingdelivery => res.json(upcomingdelivery))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Delete one specific record

router.route('/:id').delete((req, res) => {
    UpcomingDeliveries.findByIdAndDelete(req.params.id)
        .then(() => res.json('Upcoming Delivery has been deleted!'))
        .catch(err => res.status(400).json('Error : ' + err));
});

//Update a specific record

router.route('/update/:id').post((req, res) => {
    UpcomingDeliveries.findById(req.params.id)
        .then(upcomingdelivery => {
            upcomingdelivery.OrderId = (req.body.OrderId);
            upcomingdelivery.CustomerName = (req.body.CustomerName);
            upcomingdelivery.ContactNo = Number(req.body.ContactNo);
            upcomingdelivery.Item = (req.body.Item);
            upcomingdelivery.Quantity = Number(req.body.Quantity);
            upcomingdelivery.Location = (req.body.Location);

            upcomingdelivery.save()
                .then(() => res.json('Upcoming Delivery updated'))
                .catch(err => res.status(400).json('Error : ' + err));
        })

        .catch(err => res.status(400).json('Error : ' + err));
});
module.exports = router;