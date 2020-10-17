const router = require('express').Router();
let Employee = require("../models/employee.model");

router.route('/').get((req,res) => {
    Employee.find()
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/add').post((req,res) => {
    const fullName = req.body.fullName;
    const nic = req.body.nic;
    const empID = req.body.empID;
    const dob = Date.parse(req.body.dob);
    const designation = req.body.designation;
    const section = req.body.section;
    const address = req.body.address;
    const contactNo = req.body.contactNo;
    const emergency = req.body.emergency;
    

    const newEmployee = new Employee({
        fullName,
        nic,
        empID,
        dob,
        designation,
        section,
        address,
        contactNo,
        emergency,
       
    });
    newEmployee.save()
        .then(() => res.json('Employee added!'))
        .catch(err => res.status(400).json('Error : ' +err));
});
router.route('/:id').get((req,res) => {
    Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/:id').delete((req,res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then(() => res.json('Employee deleted'))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/update/:id').post((req,res) => {
    Employee.findById(req.params.id)
        .then(employee => {
            employee.fullName = req.body.fullName;
            employee.nic= req.body.nic;
            employee.empID = req.body.empID;
            employee.dob = Date.parse(req.body.dob);
            employee.designation = req.body.designation;
            employee.section = req.body.section;
            employee.address = req.body.address;
            employee.contact = req.body.contact;
            employee.emergency = req.body.emergency;

            employee.save()
                .then(() => res.json('Employee updated'))
                .catch(err => res.status(400).json('Error : ' +err));
        })

        .catch(err => res.status(400).json('Error : ' +err));
});
module.exports = router;