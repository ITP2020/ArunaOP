import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../css/home.css'
import '../css/table.scss'
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';

const Salary = props => (
  <tr>
    <td>{props.salary.empId}</td>
    <td>{props.salary.basicSalary}</td>
    <td>{props.salary.otRate}</td>    
    <td>
      <button className = 'edit'><Link to={"/updateSalary/"+props.salary._id} className="link">Edit</Link></button>  <button className = 'delete' onClick={() => { props.deleteSalary(props.salary._id) }}>Delete</button>
    </td>
  </tr>
)

export default class SalaryList extends Component {
  constructor(props) {
    super(props);

    this.deleteSalary = this.deleteSalary.bind(this)

    this.state = {salary: [],
    searchSalary : ""};
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

  searchSalaryList(){

    return this.state.salary.map((currentsalary) => {
        if (
          currentsalary.empId.toLowerCase().includes(this.state.searchSalary.toLowerCase())
        ){
            return (
                <tr>
                <td style={{ width: "25.5%" }}>{currentsalary.empId}</td>
                <td style={{ width: "25.5%" }}>{currentsalary.basicSalary}</td>
                <td style={{ width: "25.5%" }}>{currentsalary.otRate}</td>
                
                
                <td style={{ width: "20%" }}>
                    {
                    <button className="edit">
                        <Link
                        to={"/updateSalary/" + currentsalary._id}
                        className="link"
                        >
                        Edit
                        </Link>
                    </button>
                    }
                    {"  "}
                    {
                    <button
                        className="delete"
                        onClick={() => {
                          //Delete the selected record
                        axios
                            .delete(
                            "http://localhost:5000/salary/" + currentsalary._id
                            )
                            .then(() => {
                            alert("Delete Success");
                              //Get data again after delete
                            axios
                                .get("http://localhost:5000/salary")
                                .then((res) => {
                                console.log(res.data);
                                this.setState({
                                  salary: res.data,
                                });
                                })
                                .catch((err) => console.log(err));
                            })
                            .catch((err) => {
                            alert(err);
                            });
                        }}
                    >
                        Delete
                    </button>
                    }
                </td>
                </tr>
            );
        }
    });
}


  exportSalary = () => {
    console.log( "SSSSSSSSSS" )


    const unit = "pt";
    const size = "A3"; 
    const orientation = "portrait"; 
    const marginLeft = 40;
    const doc = new jsPDF( orientation, unit, size );

    const title = "Employee Salary Report ";
    const headers = [["Employee ID", "Basic Salary", "OT Rate"]];

    const sal = this.state.salary.map(
        Salary=>[
            Salary.empId,
            Salary.basicSalary,
            Salary.otRate
        ]
    );

    let content = {
        startY: 50,
        head: headers,
        body:sal
    };
    doc.setFontSize( 20 );
    doc.text( title, marginLeft, 40 );
    require('jspdf-autotable');
    doc.autoTable( content );
    doc.save( "EmployeeSalary.pdf" )
}

  render() {
    return (
      <div>
        <Card className = "addcard">
                <table className = "topic">
                    <tr>
                        <th><h3>Salary Details</h3></th>
                        <td><button className = "add" ><Link to = {"/createSalary" } className = "linkaddE">Add Salary</Link></button>
                        <button className = "download" onClick={() => this.exportSalary()}>Download Report Here</button></td>
                    </tr>
                    <div className="col-md-9">
                    <input style={{ width: "250px", marginTop:"10px"}}
                    class="form-control"
                    type="text"
                    placeholder="Search by Employee ID"
                    aria-label="Search"
                    onChange={(e) => {
                        this.setState({
                        searchSalary: e.target.value
                        });
                    }}
                    />
            </div>
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
            { this.state.searchSalary == "" ? this.salaryList() : this.searchSalaryList() }
          </tbody>
        </table>
        </CardContent>
        </Card>
      </div>
    )
  }
}