import React, { Component } from 'react';

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
            <h1><b>Generate reports</b></h1>
            <a href="http://localhost:5000/reports/equipments" target="_blank" rel="noopener noreferrer">Current equipments</a>
            <br/>
            <a href="http://localhost:5000/reports/repairs" target="_blank" rel="noopener noreferrer">Repair list</a>
          </div>
        );
    }
}