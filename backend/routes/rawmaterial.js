const router = require('express').Router();
let Rawmaterial = require("../models/rawmaterial.model");

router.route('/').get((req,res) => {
    Rawmaterial.find()
        .then(rawmaterial => res.json(rawmaterial))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/add').post((req,res) => {
    const materialName = req.body.materialName;
    const storedDate = Date.parse(req.body.storedDate);
    const description = req.body.description;
    const category = req.body.category;
    const quantity = Number(req.body.quantity);
    
    const newRawmaterial = new Rawmaterial({
        materialName,
        storedDate,
        description,
        category,
        quantity,
       
    });

    newRawmaterial.save()

        .then(() => res.json('Raw Material added!'))
        .catch(err => res.status(400).json('Error : ' +err));
});
router.route('/:id').get((req,res) => {
    Rawmaterial.findById(req.params.id)
        .then(rawmaterial => res.json(rawmaterial))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/:id').delete((req,res) => {
    Rawmaterial.findByIdAndDelete(req.params.id)
        .then(() => res.json('Raw Material deleted'))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/update/:id').post((req,res) => {
    Rawmaterial.findById(req.params.id)
        .then(rawmaterial => {
            rawmaterial.materialName = req.body.materialName;
            rawmaterial.storedDate = Date.parse(req.body.storedDate);
            rawmaterial.description = req.body.description;
            rawmaterial.category = req.body.category;
            rawmaterial.quantity = Number(req.body.quantity);

            rawmaterial.save()
                .then(() => res.json('Raw Material updated'))
                .catch(err => res.status(400).json('Error : ' +err));
        })

        .catch(err => res.status(400).json('Error : ' +err));
});
module.exports = router;