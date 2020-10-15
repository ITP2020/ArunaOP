import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/home.css'
import '../css/table.scss'
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';





const Electricity = props => (
    <tr>
        <td style={{width:"20%"}}>{props.electricityExpenses.amount}</td>
        <td style={{width:"20%"}}>{props.electricityExpenses.year}</td>
        <td style={{width:"20%"}}>{props.electricityExpenses.month}</td>
        <td style={{width:"20%"}}>{props.electricityExpenses.amount}</td>
        <td style={{width:"20%"}}>
            <button className = 'edit'><Link to = {"/editelectricity/"+props.electricityExpenses._id } className="link">Edit</Link></button> | <button className = 'delete' onClick ={() => {props.deleteElectricity(props.electricityExpenses._id)}}>Delete</button>
        </td>
    </tr>
)


export default class ElectricityExpensesList extends Component {

    constructor(props){
        super(props);
        this.deleteElectricity = this.deleteElectricity.bind(this);
        this.state = {electricityExpenses : []};
    }
    componentDidMount() {
        axios.get('http://localhost:5000/electricityExpenses/')
        .then(response => {
            this.setState({ electricityExpenses : response.data })
        })
        .catch((error) => {
            console.log(error);
        })
        }
        deleteElectricity(id){
            axios.delete('http://localhost:5000/electricityExpenses/' +id)
            .then(res => console.log(res.data));
            this.setState({
                electricityExpenses : this.state.electricityExpenses.filter(el => el._id !== id)
            })
        }
        electricityList(){
            return this.state.electricityExpenses.map(currentelectricity => {
                return <Electricity electricityExpenses = {currentelectricity} deleteElectricity = {this.deleteElectricity} key = {currentelectricity._id}/>;
            })
        }

    render() {
        return (
            <div >
            <Card className = "addcard">
                <table className = "topic">
                    <tr>
                        <th><h3>Upcoming Deliveries</h3></th>
                    </tr>
                </table>
                <CardContent>
                <table className = "table table-fixed">
                <thead >
                    <tr>
                    <th style={{width:"20%"}}>Order</th>
                    <th style={{width:"20%"}}>Customer</th>
                    <th style={{width:"20%"}}>Item</th>
                    <th style={{width:"20%"}}>Location</th>
                    <th style={{width:"20%"}}>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    { this.electricityList() }
                </tbody>
            </table>
            </CardContent>
            </Card>
        </div>
        )
    }
}