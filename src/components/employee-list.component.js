import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/home.css'
import '../css/table.scss'
import '../css/transaction.css'
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';





const Employee = props => (
    <tr>
        <td>{props.employee.fullName}</td>
        <td>{props.employee.nic}</td>
        <td>{props.employee.empID}</td>
        <td>{props.employee.dob.substring(0,10)}</td>
        <td>{props.employee.designation}</td>
        <td>{props.employee.section}</td>
        <td>{props.employee.address}</td>
        <td>{props.employee.contactNo}</td>
        <td>{props.employee.emergency}</td>
        <td>
            <button className = 'edit'><Link to = {"/editemployee/"+props.employee._id } className="link">Edit</Link></button><button className = 'delete' onClick ={() => {props.deleteEmployee(props.employee._id)}}>Delete</button>
        </td>
    </tr>
)


export default class EmployeeList extends Component {

    constructor(props){
        super(props);

        this.deleteEmployee = this.deleteEmployee.bind(this);

        this.state = {employee : []};
    }


    componentDidMount() {
        axios.get('http://localhost:5000/employee/')
        .then(response => {
            this.setState({ employee : response.data })
        })
        .catch((error) => {
            console.log(error);
        })
        }

        deleteEmployee(id){
            axios.delete('http://localhost:5000/employee/' +id)
            .then(res => console.log(res.data));
            this.setState({
                employee : this.state.employee.filter(el => el._id !== id)
            })
        }

        employeeList(){
            return this.state.employee.map(currentemployee => {
                return <Employee employee = {currentemployee} deleteEmployee = {this.deleteEmployee} key = {currentemployee._id}/>;
            })
        }

    render() {
        return (
            <div >
            
            
            <Card className = "addcard">
                <table className = "topic">
                    <tr>
                        <th><h3>Employee Details</h3></th>
                        <td><button className = "add" ><Link to = {"/createemployee" } className = "linkaddE">Add Employee</Link></button></td>
                    </tr>
                </table>
            
            
                <CardContent>
                <table className = "tbtransaction">
                <thead >
                    <tr>
                        <th className = "tbhead">Full Name</th>
                        <th className = "tbhead">NIC</th>
                        <th className = "tbhead">Employee ID</th>
                        <th className = "tbhead">DOB</th>
                        <th className = "tbhead">Designation</th>
                        <th className = "tbhead">Section</th>
                        <th className = "tbhead">Address</th>
                        <th className = "tbhead">Contact</th>
                        <th className = "tbhead">Emergency</th>
                        <th className = "tbhead">Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    { this.employeeList() }
                </tbody>
            </table>
            </CardContent>
            </Card>
        </div>
        )
    }
}