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


const Rawmaterial = props => (
    <tr>
        <td>{props.rawmaterial.materialName}</td>
        <td>{props.rawmaterial.storedDate.substring(0,10)}</td>
        <td>{props.rawmaterial.description}</td>
        <td>{props.rawmaterial.category}</td>
        <td>{props.rawmaterial.quantity}</td>
        <td>
            <button className = 'edit'><Link to = {"/editrawmaterial/"+props.rawmaterial._id } className="link">Edit</Link></button> <button className = 'delete' onClick ={() => {props.deleteRawmaterial(props.rawmaterial._id)}}>Delete</button>
        </td>
    </tr>
)


export default class RawmaterialList extends Component {

    constructor(props){
        super(props);

        this.deleteRawmaterial = this.deleteRawmaterial.bind(this);

        this.state = {rawmaterial : []};
    }


    componentDidMount() {
        axios.get('http://localhost:5000/rawmaterial/')
        .then(response => {
            this.setState({ rawmaterial : response.data })
        })
        .catch((error) => {
            console.log(error);
        })
        }

        deleteRawmaterial(id){
            axios.delete('http://localhost:5000/rawmaterial/' +id)
            .then(res => console.log(res.data));
            this.setState({
                rawmaterial : this.state.rawmaterial.filter(el => el._id !== id)
            })
        }

        rawmaterialList(){
            return this.state.rawmaterial.map(currentrawmaterial => {
                return <Rawmaterial rawmaterial = {currentrawmaterial} deleteRawmaterial = {this.deleteRawmaterial} key = {currentrawmaterial._id}/>;
            })
        }

        exportRawmaterial = () => {
            console.log( "SSSSSSSSSS" )
    
    
            const unit = "pt";
            const size = "A3"; 
            const orientation = "portrait"; 
            const marginLeft = 40;
            const doc = new jsPDF( orientation, unit, size );
    
            const title = "Raw Materials Report ";
            const headers = [["Material Name","Stored Date","Description","Category","Quantity"]];
    
            const elec = this.state.rawmaterial.map(
                Rawmaterial=>[
                    Rawmaterial.materialName,
                    Rawmaterial.storedDate,
                    Rawmaterial.description,
                    Rawmaterial.category,
                    Rawmaterial.quantity
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
            doc.save( "Rawmaterials.pdf" )
        }

        filterContent(rawmaterial, searchTerm){
            const result = rawmaterial.filter((rawmaterial) => rawmaterial.title.includes(searchTerm));
            this.setState({rawmaterial : result})
        }

        handleTextSearch = (e) =>{
            console.log(e.currentTarget.value);
            const searchTerm = e.currentTarget.value;

            axios.get('http://localhost:5000/rawmaterial/')
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
                        <th><h3>Raw Material Details</h3></th>
                        <td><button className = "add" ><Link to = {"/createrawmaterial" } className = "linkaddE">Add Raw Material</Link></button>
                        <button className = "download" onClick={() => this.exportRawmaterial
                            ()}>Download Report Here</button></td>
                    </tr>
                </table>
            
            
                <CardContent>
                <table className = "tbmaterial">
                <thead >
                    <tr>
                        <th className = "tbhead">Material Name</th>
                        <th className = "tbhead">Stored Date</th>
                        <th className = "tbhead">Description</th>
                        <th className = "tbhead">Category</th>
                        <th className = "tbhead">Quantity</th>
                        <th className = "tbhead">Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    { this.rawmaterialList() }
                </tbody>
            </table>
            </CardContent>
            </Card>
        </div>
        )
    }
}