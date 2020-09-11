const router = require('express').Router();
let Salary = require('../models/salary.model');

router.route('/').get((req, res) => {
  Salary.find()
    .then(salary => res.json(salary))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const empId = req.body.empId;
  const basicSalary = Number(req.body.basicSalary);
  const otRate = Number(req.body.otRate);

  const newSalary = new Salary({
    empId,
    basicSalary,
    otRate
  });

  newSalary.save()
  .then(() => res.json('Salary added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Salary.findById(req.params.id)
    .then(salary => res.json(salary))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Salary.findByIdAndDelete(req.params.id)
    .then(() => res.json('Salary deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Salary.findById(req.params.id)
    .then(salary => {
      salary.empId = req.body.empId;
      salary.basicSalary = Number(req.body.basicSalary);
      salary.otRate = Number(req.body.otRate);
      salary.save()
        .then(() => res.json('Salary updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;