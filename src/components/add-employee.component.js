import React, {Component} from 'react';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
import '../css/home.css'

export default class CreateEmployee extends Component {

    
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
            emergency : 0,
            nameError : '',
            nicError : '',
            empIDError : '',
            contactNoError : '',
            emergencyError : ''
            
        }
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

    demoClicked(){
        this.setState({
            fullName : "Gihan Perera",
            nic : "931524475V",
            empID : 32984,
            dob : new Date(),
            designation : "Labour",
            section : "Equipment",
            address : "Gampaha",
            contactNo : "0775642134",
            emergency : "0761243212",
    
            
        })
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

        if(this.state.fullName.length < 6){
            this.setState({nameError : "Name should be longer than 6 characters."})
        }
        if(this.state.nic.length != 10){
            this.setState({nicError : "NIC length is invalid."})
        }
        if(this.state.empID.length != 10){
            this.setState({empIDError : "Employee ID length is invalid."})
        }
        if(this.state.contactNo.length != 10){
            this.setState({contactNoError : "Contact number length is invalid."})
        }
        if(this.state.emergency.length != 10){
            this.setState({emergencyError : "Invalid Emergency."})
        }
       
        else if(this.state.fullName.length >= 10 && this.state.nic.length == 10 && this.state.empID.length == 10 && this.state.contactNoError.length == 10 && this.state.emergency.length == 10)
        {
            axios.post('http://localhost:5000/employee/add', employee)
        .then(res => console.log("sucess")).catch(err=>console.log(err));

        window.location = '/employee';
        }
        
    }

    

    

    

    render() {
        return (
        <div >
            <Card className = "addcard" >
                <div className = "formdiv">
                <CardContent >
            <h3 className = "billheading">Add Employee</h3>
        
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
                        <input type = "submit" value = "Add Employee" className = "btn-bill" />
                    </div>
                </form>
                <div className = "form-group">
                    <button className = "demo"onClick={() => this.demoClicked()}>Demo</button>
                    </div>

</CardContent>
</div>
</Card>
                

    </div>

                

                
        )
    }
}