import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
//import './home.css'
import '../css/table.scss'
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';



const Water = props => (
    <tr>
        <td>{props.waterExpenses.year}</td>
        <td>{props.waterExpenses.month}</td>
        <td>{props.waterExpenses.amount}</td>
        <td>
            <button className = 'edit'><Link to = {"/editwater/"+props.waterExpenses._id } className="link">Edit</Link></button> | <button className = 'delete' onClick ={() => {props.deleteWater(props.waterExpenses._id)}}>Delete</button>
        </td>
    </tr>
)


export default class WaterExpensesList extends Component {

    constructor(props){
        super(props);

        this.deleteWater = this.deleteWater.bind(this);

        this.state = {waterExpenses : []};
    }


    componentDidMount() {
        axios.get('http://localhost:5000/waterExpenses/')
        .then(response => {
            this.setState({ waterExpenses : response.data })
        })
        .catch((error) => {
            console.log(error);
        })
        }

        deleteWater(id){
            axios.delete('http://localhost:5000/waterExpenses/' +id)
            .then(res => console.log(res.data));
            this.setState({
                waterExpenses : this.state.waterExpenses.filter(el => el._id !== id)
            })
        }

        waterList(){
            return this.state.waterExpenses.map(currentwater => {
                return <Water waterExpenses = {currentwater} deleteWater = {this.deleteWater} key = {currentwater._id}/>;
            })
        }

        exportWater = () => {
            console.log( "SSSSSSSSSS" )
    
    
            const unit = "pt";
            const size = "A3"; 
            const orientation = "portrait"; 
            const marginLeft = 40;
            const doc = new jsPDF( orientation, unit, size );
    
            const title = "Water Expenses Report ";
            const headers = [["Year","Month","Amount"]];
    
            const wat = this.state.waterExpenses.map(
                Water=>[
                    Water.year,
                    Water.month,
                    Water.amount
                ]
            );
    
            let content = {
                startY: 50,
                head: headers,
                body:wat
            };
            doc.setFontSize( 24 );
            doc.text( title, marginLeft, 40 );
            require('jspdf-autotable');
            doc.autoTable( content );
            doc.save( "WaterExpenses.pdf" )
        }

    render() {
        return (
            <div>
            
            
            <Card className = "addcard">
                <table className = "topic">
                    <tr>
                        <th><h3>Water Expenses</h3></th>
                        <td><button className = "add" ><Link to = {"/createwater" } className = "linkaddE">Add Water Bill</Link></button>
                        <button className = "download" onClick={() => this.exportWater()}>Download Report Here</button></td>
                    </tr>

                    
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
                    { this.waterList() }
                </tbody>
            </table>
            </CardContent>
            </Card>
        </div>
        )
    }
}