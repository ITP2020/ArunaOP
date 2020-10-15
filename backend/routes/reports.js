const router = require('express').Router();
let User = require('../models/users.model');
var pdf = require("pdf-creator-node");
const Equipment = require('../models/equipment.model');
const Repair = require('../models/repair.model');


const htmlEq = `
    <!DOCTYPE html>
    <html>
        <header>
            <style>
                td,
                th {
                    min-width: 100px;
                    border: 1px solid grey;
                }
            </style>
        </header>
        <h1>Equipment Report</h1>
        <br><br>

        <table>
            <tr>
                <th>Supervisor</th>
                <th>Model</th>
                <th>Country</th>
                <th>Date</th>
            </tr>
           {{#each equipments}}
            <tr>
                <td>{{this.username}}</td>
                <td>{{this.model}}</td>
                <td>{{this.country}}</td>
                <td>{{this.date}}</td>
            </tr>
           {{/each}}
        </table>
    </html>
`;

const htmlRep = `
    <!DOCTYPE html>
    <html>
        <header>
            <style>
                td,
                th {
                    min-width: 100px;
                    border: 1px solid grey;
                }
            </style>
        </header>
        <h1>Repair Report</h1>
        <br><br>

        <table>
            <tr>
                <th>Supervisor</th>
                <th>Model</th>
                <th>Fault</th>
                <th>Date</th>
            </tr>
           {{#each faults}}
            <tr>
                <td>{{this.username}}</td>
                <td>{{this.model}}</td>
                <td>{{this.fault}}</td>
                <td>{{this.date}}</td>
            </tr>
           {{/each}}
        </table>
    </html>
`;

var options = {
    format: "A4",
    orientation: "portrait",
};

router.route('/equipments').get((req, res) => {
    Equipment.find().lean()
    .then(equipments => {
        const document = {
            html: htmlEq,
            data: {
                name: 'Equipment',
                equipments: equipments.map(x => ({ ...x, date: new Date(x.date).toDateString() })),
            },
            path: "equipments-report.pdf"
        };
    
        pdf.create(document, options)
        .then(resp => {
            res.download('equipments-report.pdf');
        });
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/repairs').get((req, res) => {
    Repair.find().lean()
    .then(faults => {
        const document = {
            html: htmlRep,
            data: {
                name: 'Equipment',
                faults: faults.map(x => ({ ...x, date: new Date(x.date).toDateString() })),
            },
            path: "repair-report.pdf"
        };
    
        pdf.create(document, options)
        .then(resp => {
            res.download('repair-report.pdf');
        });
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
