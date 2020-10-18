const router = require('express').Router();
let Finishedproduct = require("../models/finishedproduct.model");

router.route('/').get((req,res) => {
    Finishedproduct.find()
        .then(finishedproduct => res.json(finishedproduct))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/add').post((req,res) => {
    const orderid = req.body.orderid;
    const productName = req.body.productName;
    const storedDate = Date.parse(req.body.storedDate);
    const description = req.body.description;
    const quantity = Number(req.body.quantity);
    
    const newFinishedproduct = new Finishedproduct({
        orderid,
        productName,
        storedDate,
        description,
        quantity,
       
    });

    newFinishedproduct.save()

        .then(() => res.json('Finished Product added!'))
        .catch(err => res.status(400).json('Error : ' +err));
});
router.route('/:id').get((req,res) => {
    Finishedproduct.findById(req.params.id)
        .then((finishedproduct) => {res.json(finishedproduct)})
        .catch((err) => res.status(400).json('Error : ' +err));
});

router.route('/:id').delete((req,res) => {
    Finishedproduct.findByIdAndDelete(req.params.id)
        .then(() => res.json('Finished Product deleted'))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/update/:id').post((req,res) => {
    Finishedproduct.findById(req.params.id)
        .then(finishedproduct => {
            finishedproduct.orderid = req.body.orderid;
            finishedproduct.productName = req.body.productName;
            finishedproduct.storedDate = Date.parse(req.body.storedDate);
            finishedproduct.description = req.body.description;
            finishedproduct.quantity = Number(req.body.quantity);

            finishedproduct.save()
                .then(() => res.json('Finished Product updated'))
                .catch(err => res.status(400).json('Error : ' +err));
        })

        .catch(err => res.status(400).json('Error : ' +err));
});
module.exports = router;