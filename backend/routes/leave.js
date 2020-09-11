const router = require('express').Router();
let Leave = require('../models/leave.model');

router.route('/').get((req, res) => {
  Leave.find()
    .then(leave => res.json(leave))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const leaveType = req.body.leaveType;
  const numOfDays = Number(req.body.numOfDays);
  const startDate = Date.parse(req.body.startDate);
  const endDate = Date.parse(req.body.endDate);
  const description = req.body.description;

  const newLeave = new Leave({
    leaveType,
    numOfDays,
    startDate,
    endDate,
    description,
  });

  newLeave.save()
  .then(() => res.json('Leave added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Leave.findById(req.params.id)
    .then(leave => res.json(leave))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Leave.findByIdAndDelete(req.params.id)
    .then(() => res.json('Leave deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Leave.findById(req.params.id)
    .then(leave => {
      leave.leaveType = req.body.leaveType;
      leave.numOfDays = Number(req.body.numOfDays);
      leave.startDate = Date.parse(req.body.startDate);
      leave.endDate = Date.parse(req.body.endDate);
      leave.description = req.body.description;
 
      leave. save()
        .then(() => res.json('Leave updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;