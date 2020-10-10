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
      basicSalary: '',
      otRate: '',
      empIdError:'',
      basicSalaryError: '',
      otRateError:''
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

    if(this.state.empId.length < 10 ){
      this.setState({empIdError : "Invalid Employee ID."})
    }
    
    else if(this.state.empId.length > 10){
      this.setState({empIdError : "Format of the Employee ID should be 'IT********'"})
    }
    else if(this.state.basicSalary === "0"){
      this.setState({basicSalaryError : "Basic salary can not be 0."})
    }
    else if(this.state.basicSalary < "0"){
      this.setState({basicSalaryError : "Basic salary can not be negative."})
    }
    else if(this.state.otRate === "0"){
      this.setState({otRateError : "OT Rate can not be 0."})
    }
    else if(this.state.otRate < "0"){
      this.setState({otRateError : "OT Rate can not be negative."})
    }
    else if(this.state.empId.length === 10 && this.state.basicSalary !== "0" && this.state.otRate !== "0"){

      axios.post('http://localhost:5000/salary/add', salary)
      .then(res => console.log(res.data));

    window.location = '/salary';
    }
   
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
              <p className = "validateMsg">{this.state.empIdError}</p>
        </div>
        <div className="form-group">
          <label>basic Salary : </label>
          <input 
              type="text"
              required 
              className="form-control"
              value={this.state.basicSalary}
              onChange={this.onChangeBasicSalary}
              />
              <p className = "validateMsg">{this.state.basicSalaryError}</p>
        </div>

        <div className="form-group">
          <label>OT Rate : </label>
          <input 
              type="text" 
              required
              className="form-control"
              value={this.state.otRate}
              onChange={this.onChangeOtRate}
              />
              <p className = "validateMsg">{this.state.otRateError}</p>
        </div>

        <div className="form-group">
          <input type="submit" required value="Insert salary detail" className="btn-bill" />
        </div>
      </form>
      </CardContent>
      </div>
      </Card>
    </div>
    )
  }
}