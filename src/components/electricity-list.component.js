import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/home.css'
import '../css/table.scss'
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
//import { res } from 'express';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';


const Electricity = props => (
    <tr>
        <td>{props.electricityExpenses.year}</td>
        <td>{props.electricityExpenses.month}</td>
        <td>{props.electricityExpenses.amount}</td>
        <td>
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

        exportElectricity = () => {
            console.log( "SSSSSSSSSS" )
    
    
            const unit = "pt";
            const size = "A3"; 
            const orientation = "portrait"; 
            const marginLeft = 40;
            const doc = new jsPDF( orientation, unit, size );
    
            const title = "Electricity Expenses Report ";
            const headers = [["Year","Month","Amount"]];
    
            const elec = this.state.electricityExpenses.map(
                Electricity=>[
                    Electricity.year,
                    Electricity.month,
                    Electricity.amount
                ]
            );
    
            let content = {
                startY: 50,
                head: headers,
                body:elec
            };
            doc.setFontSize( 20 );
            doc.text( title, marginLeft, 40 );
            require('jspdf-autotable');
            doc.autoTable( content );
            doc.save( "ElectricityExpenses.pdf" )
        }

        filterContent(electricityExpenses, searchTerm){
            const result = electricityExpenses.filter((electricityExpense) => electricityExpense.title.includes(searchTerm));
            this.setState({electricityExpenses : result})
        }

        handleTextSearch = (e) =>{
            console.log(e.currentTarget.value);
            const searchTerm = e.currentTarget.value;

            axios.get('http://localhost:5000/electricityExpenses/')
        .then(res => {
            if(res.data.success){
                this.filterContent(res.data,searchTerm)
            }
        
    })
        }

       

    render() {
        return (
            <div >
            
            
            <Card className = "addcard">
                <table className = "topic">
                    <tr>
                        <th><h3>Electricity Expenses</h3></th>
                        <td><button className = "add" ><Link to = {"/createelectricity" } className = "linkaddE">Add Electricity Bill</Link></button>
                        <button className = "download" onClick={() => this.exportElectricity()}>Download Report Here</button></td>
                    </tr>
                    
                            <div className = "searchBar">
                            <input
                            className = "form-control"
                            type = "search"
                            placeholder = "Search"
                            name = "searchTerm"
                            onChange = {this.handleTextSearch}>
                            </input></div>
                    
                </table>


            
            
                <CardContent>
                <table className = "table table-fixed">
                <thead >
                    <tr>
                        <th >Year</th>
                        <th>Month</th>
                        <th>Amount</th>
                        <th>Actions</th>
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