const router = require("express").Router();
let Supplier = require("../models/supply.model");

router.route("/").get((req, res) => {
  Supplier
    .find()
    .then((suppliers) => res.json(suppliers))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/add").post((req, res) => {
  const supplierName = (req.body.supplierName);
  const address = (req.body.address);
  const contactNumber = (req.body.contactNumber);
  const email = (req.body.email);

  const newSuppliers = new Supplier({
    supplierName,
    address,
    contactNumber,
    email
  });
  newSuppliers
    .save()
    .then(() => res.json("supplier added!"))
    .catch((err) => res.status(400).json("Error : " + err));
});
router.route("/:id").get((req, res) => {
  Supplier.findById(req.params.id)
    .then((supplier) => res.json(supplier))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/:id").delete((req, res) => {
  supplier.findByIdAndDelete(req.params.id)
    .then(() => res.json("supply deleted"))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/update/:id").post((req, res) => {
  Supplier.findById(req.params.id)
    .then((supplieirs) => {
        suppliers.supplierName = (req.body.supplierName);
        suppliers.address = (req.body.address);
        suppliers.contactNumber = (req.body.contactNumber);
        suppliers.email = (req.body.email);

      suppliers
        .save()
        .then(() => res.json("supplier updated"))
        .catch((err) => res.status(400).json("Error : " + err));
    })

    .catch((err) => res.status(400).json("Error : " + err));
});
module.exports = router;
