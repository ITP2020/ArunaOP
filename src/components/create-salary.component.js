import React, { Component } from 'react';
import axios from 'axios';

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
import '../css/home.css'

export default class CreateSalary extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmpId = this.onChangeEmpId.bind(this);
    this.onChangeBasicSalary = this.onChangeBasicSalary.bind(this);
    this.onChangeOtRate = this.onChangeOtRate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      empId: '',
      basicSalary: 0,
      otRate: 0
    }
  }

  onChangeEmpId(e) {
    this.setState({
      empId: e.target.value
    })
  }

  onChangeBasicSalary(e) {
    this.setState({
      basicSalary: e.target.value
    })
  }

  onChangeOtRate(e) {
    this.setState({
        otRate: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const salary = {
      empId: this.state.empId,
      basicSalary: this.state.basicSalary,
      otRate: this.state.otRate,
    }

    console.log(salary);

    axios.post('http://localhost:5000/salary/add', salary)
      .then(res => console.log(res.data));

    window.location = '/salary';
  }

  render() {
    return (
    <div>
      <Card className = "addcard" >
                <div className = "formdiv">
                <CardContent >
      <h3>Add a salary detail</h3>
      <form onSubmit={this.onSubmit}>
        
        <div className="form-group"> 
          <label> Employee ID : </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.empId}
              onChange={this.onChangeEmpId}
              />
        </div>
        <div className="form-group">
          <label>basic Salary : </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.basicSalary}
              onChange={this.onChangeBasicSalary}
              />
        </div>

        <div className="form-group">
          <label>OT Rate : </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.otRate}
              onChange={this.onChangeOtRate}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Insert salary detail" className="btn-bill" />
        </div>
      </form>
      </CardContent>
      </div>
      </Card>
    </div>
    )
  }
}