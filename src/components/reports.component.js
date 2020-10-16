import React, { Component } from 'react';
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';

export default class Reports extends Component {
    constructor(props){
        super(props);
        this.state = {repairs:[]};
    }

    generateReport = () => {
    }

    render() {
        return (
          <div>
            <Card className = "addcard" >
                <div >
                <CardContent >
            <h2 className = "billheading">Generate reports</h2>
           <button className = "btn-finance"> <a href="http://localhost:5000/reports/equipments" target="_blank" rel="noopener noreferrer">Current equipments</a></button>
            
            <button className = "btn-finance"><a href="http://localhost:5000/reports/repairs" target="_blank" rel="noopener noreferrer">Repair list</a></button>
            </CardContent>
            </div>
            </Card>
          </div>
        );
    }
}