const router = require("express").Router();
let supply = require("../models/supply.model");

router.route("/").get((req, res) => {
  supply
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

  const newSupplies = new supply({
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
  supply.findById(req.params.id)
    .then((supplies) => res.json(supplies))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/:id").delete((req, res) => {
  supply.findByIdAndDelete(req.params.id)
    .then(() => res.json("supply deleted"))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/update/:id").post((req, res) => {
  supply.findById(req.params.id)
    .then((supplies) => {
        supplies.itemName = String(req.body.itemName);
        supplies.supplierName = String(req.body.supplierName);
        supplies.price = String(req.body.price);
        supplies.quantity = String(req.body.quantity);
        supplies.date = String(req.body.date);
        supplies.description = String(req.body.description);

      supplies
        .save()
        .then(() => res.json("supply updated"))
        .catch((err) => res.status(400).json("Error : " + err));
    })

    .catch((err) => res.status(400).json("Error : " + err));
});
module.exports = router;
