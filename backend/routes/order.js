const router = require('express').Router();
let Order = require('../models/order.model');

router.post('/add', async(req, res) => {
    const orderNumber = Number(req.body.orderNumber);
    const customerName = req.body.customerName;
    const address = req.body.address;
    const contactNo = req.body.contactNo;
    const design = req.body.design;
    const size = req.body.size;
    const quantity = Number(req.body.quantity);
    const printingMaterials = req.body.printingMaterials;
    const orderType = req.body.orderType;
    const orderStatus = req.body.orderStatus;

    const order = {
        orderNumber: orderNumber,
        customerName: customerName,
        address: address,
        contactNo: contactNo,
        design: design,
        size : size,
        quantity: quantity,
        printingMaterials: printingMaterials,
        orderType: orderType,
        orderStatus: orderStatus
    }

    const newOrder = new Order(order);
    await newOrder.save()
        .then(() => res.json('New Order added!'))
        .catch((error) => {
            console.log(error.message)
        });
})


router.route('/:id').get((req,res) => {
    Order.findById(req.params.id)
        .then(order => res.json(order))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/:id').delete((req,res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(() => res.json('Order deleted'))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/update/:id').post((req,res) => {
    Order.findById(req.params.id)
        .then(order => {
            order.orderNumber = Number(req.body.orderNumber);
            order.customerName = req.body.customerName;
            order.address = req.body.address;
            order.$isDefaultcontactNo = req.body.contactNo;
            order.design = req.body.design;
            order.size = req.body.size;
            order.quantity = Number(req.body.quantity);
            order.printingMaterials = req.body.printingMaterials;
            order.orderType = req.body.orderType;
            order.orderStatus = req.body.orderStatus;

            order.save()
                .then(() => res.json('Order updated'))
                .catch(err => res.status(400).json('Error : ' +err));
        })

        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/').get((req,res) => {
    Order.find()
        .then(order => res.json(order))
        .catch(err => res.status(400).json('Error : ' +err));
});


module.exports = router;