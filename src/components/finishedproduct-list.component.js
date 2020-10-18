import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/home.css'
import '../css/table.scss'
import '../css/transaction.css'
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';


const Finishedproduct = props => (
    <tr>
        <td>{props.finishedproduct.orderid}</td>
        <td>{props.finishedproduct.productName}</td>
        <td>{props.finishedproduct.storedDate.substring(0,10)}</td>
        <td>{props.finishedproduct.description}</td>
        <td>{props.finishedproduct.quantity}</td>
        <td>
            <button className = 'edit'><Link to = {"/editfinishedproduct/"+props.finishedproduct._id } className="link">Edit</Link></button>  <button className = 'delete' onClick ={() => {props.deleteFinishedproduct(props.finishedproduct._id)}}>Delete</button>
        </td>
    </tr>
)


export default class FinishedproductList extends Component {

    constructor(props){
        super(props);

        this.deleteFinishedproduct = this.deleteFinishedproduct.bind(this);

        this.state = {finishedproduct : []};
    }


    componentDidMount() {
        axios.get('http://localhost:5000/finishedproduct/')
        .then(response => {
            this.setState({ finishedproduct : response.data })
        })
        .catch((error) => {
            console.log(error);
        })
        }

        deleteFinishedproduct(id){
            axios.delete('http://localhost:5000/finishedproduct/' +id)
            .then(res => console.log(res.data));
            this.setState({
                finishedproduct : this.state.finishedproduct.filter(el => el._id !== id)
            })
        }

        finishedproductList(){
            return this.state.finishedproduct.map(currentfinishedproduct => {
                return <Finishedproduct finishedproduct = {currentfinishedproduct} deleteFinishedproduct = {this.deleteFinishedproduct} key = {currentfinishedproduct._id}/>;
            })
        }

        exportFinishedproduct = () => {
            console.log( "SSSSSSSSSS" )
    
    
            const unit = "pt";
            const size = "A3"; 
            const orientation = "portrait"; 
            const marginLeft = 40;
            const doc = new jsPDF( orientation, unit, size );
    
            const title = "Finished Products Report ";
            const headers = [["Product Name","Stored Date","Description","Quantity"]];
    
            const elec = this.state.finishedproduct.map(
                Finishedproduct=>[
                    Finishedproduct.productName,
                    Finishedproduct.storedDate,
                    Finishedproduct.description,
                    Finishedproduct.quantity
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
            doc.save( "Finishedproducts.pdf" )
        }

        filterContent(finishedproduct, searchTerm){
            const result = finishedproduct.filter((finishedproduct) => finishedproduct.title.includes(searchTerm));
            this.setState({finishedproduct : result})
        }

        handleTextSearch = (e) =>{
            console.log(e.currentTarget.value);
            const searchTerm = e.currentTarget.value;

            axios.get('http://localhost:5000/finishedproduct/')
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
                        <th><h3>Finished Product Details</h3></th>
                        <td><button className = "add" ><Link to = {"/createfinishedproduct" } className = "linkaddE">Add Finished Product</Link></button>
                        <button className = "download" onClick={() => this.exportFinishedproduct
                            ()}>Download Report Here</button></td>
                    </tr>
                </table>
            
            
                <CardContent>
                <table className = "tbproduct">
                <thead >
                    <tr>
                        <th className = "tbhead">Order ID</th>
                        <th className = "tbhead">Product Name</th>
                        <th className = "tbhead">Stored Date</th>
                        <th className = "tbhead">Description</th>
                        <th className = "tbhead">Quantity</th>
                        <th className = "tbhead">Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    { this.finishedproductList() }
                </tbody>
            </table>
            </CardContent>
            </Card>
        </div>
        )
    }
}