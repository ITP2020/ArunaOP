import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from 'axios';

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import '../css/home.css'


export default class EditRawmaterial extends Component {

    
    constructor(props){
        super(props);

        this.onChangematerialName = this.onChangematerialName.bind(this);
        this.onChangestoredDate = this.onChangestoredDate.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);
        this.onChangecategory = this.onChangecategory.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            productName : '',
            storedDate : new Date(),
            description : '',
            category : '',
            quantity : 0
            
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/rawmaterial/' +this.props.match.params.id)
        .then(response => {
            this.setState({
            materialName : response.data.materialName,
            storedDate : new Date(response.data.storedDate),
            description : response.data.description,
            category : response.data.category,
            quantity : response.data.quantity,
                })
            })
            .catch(function(error) {
                console.log(error);
            })

        }

        onChangematerialName(e){
            this.setState({
                materialName : e.target.value
            });
        }
    
        onChangestoredDate(date){
            this.setState({
                storedDate : date
            });
        }
    
        onChangedescription(e){
            this.setState({
                description : e.target.value
            });
        }

        onChangecategory(e){
            this.setState({
                category : e.target.value
            });
        }
    
        onChangequantity(e){
            this.setState({
                quantity : e.target.value
            });
        }

    onSubmit(e){
        e.preventDefault();

        const rawmaterial = {
            materialName : this.state.materialName,
            storedDate : this.state.storedDate,
            description : this.state.description,
            category : this.state.category,
            quantity : this.state.quantity,
        }

        console.log(rawmaterial);

        axios.post('http://localhost:5000/rawmaterial/update/' +this.props.match.params.id, rawmaterial)
        .then(res => console.log(res.data));

        window.location = '/rawmaterial';
    }

    render() {
        return (
            <div>
                <Card className = "addcard">
                <div className = "formdiv">
                <CardContent >
            <h3 className = "billheading">Edit Raw Material</h3>

            
            <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Material Name : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.materialName}
                        onChange = {this.onChangematerialName}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Stored Date : </label>
                        <div>
                            <DatePicker
                            selected = {this.state.storedDate}
                            onChange = {this.onChangestoredDate}
                            />
                        </div>
                    </div>

                    <div className = "form-group">
                        <label>Description : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.description}
                        onChange = {this.onChangedescription}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Category : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.category}
                        onChange = {this.onChangecategory}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Quantity : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.quantity}
                        onChange = {this.onChangequantity}
                        />
                    </div>


                    <div className = "form-group">
                        <input type = "submit" value = "Edit RawMaterial" className = "btn-bill" />
                    </div>
                </form>

                </CardContent>
            </div>
            </Card>
                </div>
        )
    }
}