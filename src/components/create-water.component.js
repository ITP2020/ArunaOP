import React, {Component} from 'react';
import axios from 'axios';

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
//import './home.css'

export default class CreateWater extends Component {

    
    constructor(props){
        super(props);

        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);
       

        this.state = {
            year : '',
            month : '',
            amount : '',
            yearError : '',
            monthError : '',
            amountError : ''
            
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

    onSubmit2(e){
        e.preventDefault();

        const waterExpenses = {
            year : this.state.year,
            month : this.state.month,
            amount : this.state.amount,
        }

        console.log(waterExpenses);

        if (this.state.year.length !== 4 && this.state.month > "12" && this.state.amount === "0"){
            this.setState({yearError : "Year can only have four digits.", monthError : "Month can only have values from 01 to 12.", amountError :"Amount can not be 0."})
        }
        else if(this.state.year.length !== 4 && this.state.month > "12"){
            this.setState({yearError : "Year can only have four digits.", monthError : "Month can only have values from 01 to 12."})
        }
        else if(this.state.year.length !== 4 && this.state.amount === "0"){
            this.setState({yearError : "Year can only have four digits.", amountError : "Amount can not be 0."})
        }
        else if (this.state.month > "12" && this.state.amount === "0"){
            this.setState({monthError : "Month can only have values from 01 to 12.", amountError : "Amount can not be 0."})
        }
        
        else if(this.state.year.length !== 4){
            this.setState({yearError : "Year can only have four digits."})
        }
        else if(this.state.month > "12"){
                this.setState({monthError : "Month can only have values from 01 to 12."})          
        }
        else if(this.state.amount === "0"){
            this.setState({amountError : "Amount can not be 0."})
        }
        else if(this.state.year.length === 4  && this.state.month < "12"  && this.state.amount !== "0"){
        
            axios.post('http://localhost:5000/waterExpenses/add', waterExpenses)
            .then(res => console.log(res.data));
            alert("Form is submitted successfully")

        window.location = '/water';
        }
        else{
            alert("Can not submit the form")
        }
    }

    

    render() {
        return (
        <div>
            <Card className = "addcard">
                <div className = "formdiv">
                <CardContent >
            <h3 className = "billheading">Add Water Bill</h3>
        
                <form onSubmit = {this.onSubmit2}>
                    <div className = "form-group">
                        <label>Year : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.year}
                        onChange = {this.onChangeYear}
                        />
                        <p className = "validateMsg">{this.state.yearError}</p>
                    </div>

                    <div className = "form-group">
                        <label>Month : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.month}
                        onChange = {this.onChangeMonth}
                        />
                        <p className = "validateMsg">{this.state.monthError}</p>
                    </div>

                    <div className = "form-group">
                        <label>Amount : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.amount}
                        onChange = {this.onChangeAmount}
                        />
                        <p className = "validateMsg">{this.state.amountError}</p>
                    </div>

                    <div className = "form-group">
                        <input type = "submit" value = "Add Water Bill" className = "btn-bill" />
                    </div>
                </form>

</CardContent>
</div>
</Card>
                </div>

                

                
        )
    }
}