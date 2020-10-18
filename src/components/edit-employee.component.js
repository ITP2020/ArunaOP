import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from 'axios';

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import '../css/home.css'


export default class EditEmployee extends Component {

    
    constructor(props){
        super(props);

        this.onChangefullName = this.onChangefullName.bind(this);
        this.onChangenic = this.onChangenic.bind(this);
        this.onChangeempID = this.onChangeempID.bind(this);
        this.onChangedob = this.onChangedob.bind(this);
        this.onChangedesignation = this.onChangedesignation.bind(this);
        this.onChangesection = this.onChangesection.bind(this);
        this.onChangeaddress = this.onChangeaddress.bind(this);
        this.onChangecontact = this.onChangecontact.bind(this);
        this.onChangeemergency = this.onChangeemergency.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            fullName : '',
            nic : '',
            empID : '',
            dob : new Date(),
            designation : '',
            section : '',
            address : '',
            contactNo : 0,
            emergency : 0
            
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/employee/' +this.props.match.params.id)
        .then(response => {
            this.setState({
            fullName : response.data.fullName,
            nic : response.data.nic,
            empID : response.data.empID,
            dob : new Date(response.data.dob),
            designation : response.data.designation,
            section : response.data.section,
            address : response.data.address,
            contactNo : response.data.contactNo,
            emergency : response.data.emergency,
                })
            })
            .catch(function(error) {
                console.log(error);
            })

        }

        onChangefullName(e){
            this.setState({
                fullName : e.target.value
            });
        }
    
        onChangenic(e){
            this.setState({
                nic : e.target.value
            });
        }
    
        onChangeempID(e){
            this.setState({
                empID : e.target.value
            });
        }
    
        onChangedob(date){
            this.setState({
                dob : date
            });
        }
    
        onChangedesignation(e){
            this.setState({
                designation : e.target.value
            });
        }
    
        onChangesection(e){
            this.setState({
            section : e.target.value
            });
        }
    
        onChangeaddress(e){
            this.setState({
                address : e.target.value
            });
        }
    
        onChangecontact(e){
            this.setState({
                contactNo : e.target.value
            });
        }
    
        onChangeemergency(e){
            this.setState({
                emergency : e.target.value
            });
        }

    onSubmit(e){
        e.preventDefault();

        const employee = {
            fullName : this.state.fullName,
            nic : this.state.nic,
            empID : this.state.empID,
            dob : this.state.dob,
            designation : this.state.designation,
            section : this.state.section,
            address : this.state.address,
            contactNo : this.state.contactNo,
            emergency : this.state.emergency,
        }

        console.log(employee);
        

        axios.post('http://localhost:5000/employee/update/' +this.props.match.params.id, employee)
        .then(res => console.log(res.data),
        window.location = '/employee');
    }

    render() {
        return (
            <div>
                <Card className = "addcard">
                <div className = "formdiv">
                <CardContent >
            <h3 className = "billheading">Edit Employee</h3>

            
            <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Full Name : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.fullName}
                        onChange = {this.onChangefullName}
                        />
                    </div>

                    <div className = "form-group">
                        <label>NIC : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.nic}
                        onChange = {this.onChangenic}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Empoyee ID : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.empID}
                        onChange = {this.onChangeempID}
                        />
                    </div>
                    <div className = "form-group">
                        <label>DOB : </label>
                        <div>
                            <DatePicker
                            selected = {this.state.dob}
                            onChange = {this.onChangedob}
                            />
                        </div>
                    </div>
                    <div className = "form-group">
                        <label>Designation : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.designation}
                        onChange = {this.onChangedesignation}
                        />
                    </div>
                    <div className = "form-group">
                        <label>section : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.section}
                        onChange = {this.onChangesection}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Address : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.address}
                        onChange = {this.onChangeaddress}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Contact : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.contactNo}
                        onChange = {this.onChangecontact}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Emeregency : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.emergency}
                        onChange = {this.onChangeemergency}
                        />
                    </div>


                    <div className = "form-group">
                        <input type = "submit" value = "Edit Employee" className = "btn-bill" />
                    </div>
                </form>

                </CardContent>
            </div>
            </Card>
                </div>
        )
    }
}