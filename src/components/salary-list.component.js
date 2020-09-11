import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../css/home.css'
import '../css/table.scss'
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';

const Salary = props => (
  <tr>
    <td>{props.salary.empId}</td>
    <td>{props.salary.basicSalary}</td>
    <td>{props.salary.otRate}</td>    
    <td>
      <button className = 'edit'><Link to={"/update/"+props.salary._id} className="link">Edit</Link></button>  <button className = 'delete' onClick={() => { props.deleteSalary(props.salary._id) }}>Delete</button>
    </td>
  </tr>
)

export default class SalaryList extends Component {
  constructor(props) {
    super(props);

    this.deleteSalary = this.deleteSalary.bind(this)

    this.state = {salary: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/salary/')
      .then(response => {
        this.setState({ salary: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteSalary(id) {
    axios.delete('http://localhost:5000/salary/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      salary: this.state.salary.filter(el => el._id !== id)
    })
  }

  salaryList() {
    return this.state.salary.map(currentsalary => {
      return <Salary salary={currentsalary} deleteSalary={this.deleteSalary} key={currentsalary._id}/>;
    })
  }

  render() {
    return (
      <div>
        <Card className = "addcard">
                <table className = "topic">
                    <tr>
                        <th><h3>Salary Details</h3></th>
                        <td><button className = "add" ><Link to = {"/createSalary" } className = "linkaddE">Add Salary</Link></button></td>
                    </tr>
                </table>
            
            
                <CardContent>
        
        <table className="table table-fixed">
          <thead >
            <tr>
              <th>Employee ID</th>
              <th>Basic Salary</th>
              <th>Over Time Rate(OT)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.salaryList() }
          </tbody>
        </table>
        </CardContent>
        </Card>
      </div>
    )
  }
}