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
            <button className = 'edit'><Link to = {"/editelectricity/"+props.electricityExpenses._id } className="link">Edit</Link></button>  <button className = 'delete' onClick ={() => {props.deleteElectricity(props.electricityExpenses._id)}}>Delete</button>
        </td>
    </tr>
)


export default class ElectricityExpensesList extends Component {

    constructor(props){
        super(props);

        this.deleteElectricity = this.deleteElectricity.bind(this);

        this.state = {electricityExpenses : [],
        searchElectricity : ""};
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

        searchElectricityList(){

            return this.state.electricityExpenses.map((currentelectricity) => {
                if (
                    this.state.searchElectricity ==
                    currentelectricity.year
                ){
                    return (
                        <tr>
                        <td>{currentelectricity.year}</td>
                        <td>{currentelectricity.month}</td>
                        <td>{currentelectricity.amount}</td>
                        
                        <td style={{ width: "20%" }}>
                            {
                            <button className="edit">
                                <Link
                                to={"/editelectricity/" + currentelectricity._id}
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
                                    "http://localhost:5000/electricityExpenses/" + currentelectricity._id
                                    )
                                    .then(() => {
                                    alert("Delete Success");
                                      //Get data again after delete
                                    axios
                                        .get("http://localhost:5000/electricityExpenses")
                                        .then((res) => {
                                        console.log(res.data);
                                        this.setState({
                                            electricityExpenses: res.data,
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
                    
                           <tr>
                           <div className="col-md-9">
                    <input style={{ width: "200px", marginTop:"10px"}}
                    class="form-control"
                    type="text"
                    placeholder="Search by Year"
                    aria-label="Search"
                    onChange={(e) => {
                        this.setState({
                        searchElectricity: e.target.value
                        });
                    }}
                    />
            </div>
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
                    { this.state.searchElectricity == "" ? this.electricityList() : this.searchElectricityList() }
                </tbody>
            </table>

            
            
            </CardContent>
            </Card>
        </div>
        )
    }
}