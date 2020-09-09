import React, {Component} from 'react';
import axios from 'axios';

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
//import './home.css'

export default class CreateElectricity extends Component {

    
    constructor(props){
        super(props);

        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onSubmit1 = this.onSubmit1.bind(this);
        
       

        this.state = {
            year : 0,
            month : 0,
            amount : 0
            
        }
    }

    onChangeYear(e){
        this.setState({
            year : e.target.value
        });
    }

    onChangeMonth(e){
        this.setState({
            month : e.target.value
        });
    }

    onChangeAmount(e){
        this.setState({
            amount : e.target.value
        });
    }

    onSubmit1(e){
        e.preventDefault();

        const electricityExpenses = {
            year : this.state.year,
            month : this.state.month,
            amount : this.state.amount,
        }

        console.log(electricityExpenses);

        axios.post('http://localhost:5000/electricityExpenses/add', electricityExpenses)
        .then(res => console.log(res.data));

        window.location = '/electricity';
    }

    

    

    

    render() {
        return (
        <div >
            <Card className = "addcard" >
                <div className = "formdiv">
                <CardContent >
            <h3 className = "billheading">Add Electricity Bill</h3>
        
                <form onSubmit = {this.onSubmit1}>
                    <div className = "form-group">
                        <label>Year : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.year}
                        onChange = {this.onChangeYear}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Month : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.month}
                        onChange = {this.onChangeMonth}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Amount : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.amount}
                        onChange = {this.onChangeAmount}
                        />
                    </div>

                    <div className = "form-group">
                        <input type = "submit" value = "Add Electricity Bill" className = "btn-bill" />
                    </div>
                </form>

</CardContent>
</div>
</Card>
                

    </div>

                

                
        )
    }
}