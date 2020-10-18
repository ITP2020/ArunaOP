import React, {Component} from 'react';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
import '../css/home.css'

export default class CreateFinishedproduct extends Component {

    
    constructor(props){
        super(props);
        
        this.onChangeorderid = this.onChangeorderid.bind(this);
        this.onChangeproductName = this.onChangeproductName.bind(this);
        this.onChangestoredDate = this.onChangestoredDate.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        
       

        this.state = {
            orderid : '',
            productName : '',
            storedDate : new Date(),
            description : '',
            quantity : 0
            
        }
    }

    onChangeorderid(e){
        this.setState({
            orderid : e.target.value
        });
    }

    onChangeproductName(e){
        this.setState({
            productName : e.target.value
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

    onChangequantity(e){
        this.setState({
            quantity : e.target.value
        });
    }

    demoClicked(){
        this.setState({
            orderid : 100,
            productName : 'Shopping Bills',
            storedDate : 2020/10/20,
            description : 'Order before 30th',
            quantity : 1000
        })
    }

    onSubmit(e){
        e.preventDefault();

        const finishedproduct = {
            orderid : this.state.orderid,
            productName : this.state.productName,
            storedDate : this.state.storedDate,
            description : this.state.description,
            quantity : this.state.quantity,
        }

        console.log(finishedproduct);

        axios.post('http://localhost:5000/finishedproduct/add', finishedproduct)
        .then(res => console.log("success")).catch(err=>console.log(err));

        window.location = '/finishedproduct';
    }


    render() {
        return (
        <div >
            <Card className = "addcard" >
                <div className = "formdiv">
                <CardContent >
            <h3 className = "billheading">Add Finished Product</h3>

                <form onSubmit = {this.onSubmit}>

                <div className = "form-group">
                        <label>Order ID : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.orderid}
                        onChange = {this.onChangeorderid}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Product Name : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.productName}
                        onChange = {this.onChangeproductName}
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
                        <label>Quantity : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.quantity}
                        onChange = {this.onChangequantity}
                        />
                    </div>


                    <div className = "form-group">
                        <input type = "submit" value = "Add Finished Product" className = "btn-bill" />
                    </div>

                    <div className = "form-group">
                    <button className = "demo"onClick={() => this.demoClicked()}>Demo</button>
                    </div>

                </form>

</CardContent>
</div>
</Card>
                

    </div>

                
        )
    }
}