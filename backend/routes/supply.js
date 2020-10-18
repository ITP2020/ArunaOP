const router = require("express").Router();
let Supply = require("../models/supply.model");

router.route("/").get((req, res) => {
  Supply
    .find()
    .then((supplies) => res.json(supplies))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/add").post((req, res) => {
  const itemName = (req.body.itemName);
  const supplierName = (req.body.supplierName);
  const price = (req.body.price);
  const quantity = (req.body.quantity);
  const date = (req.body.date);
  const description = (req.body.description);

  const newSupplies = new Supply({
    itemName,
    supplierName,
    price,
    quantity,
    date,
    description,
  });
  newSupplies
    .save()
    .then(() => res.json("supply added!"))
    .catch((err) => res.status(400).json("Error : " + err));
});
router.route("/:id").get((req, res) => {
  Supply.findById(req.params.id)
    .then((supplies) => res.json(supplies))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/:id").delete((req, res) => {
  Supply.findByIdAndDelete(req.params.id)
    .then(() => res.json("supply deleted"))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/update/:id").post((req, res) => {
  Supply.findById(req.params.id)
    .then((supplies) => {
        supplies.itemName = (req.body.itemName);
        supplies.supplierName = (req.body.supplierName);
        supplies.price = (req.body.price);
        supplies.quantity = (req.body.quantity);
        supplies.date = (req.body.date);
        supplies.description = (req.body.description);

      supplies
        .save()
        .then(() => res.json("supply updated"))
        .catch((err) => res.status(400).json("Error : " + err));
    })

    .catch((err) => res.status(400).json("Error : " + err));
});
module.exports = router;
