import React, {Component} from 'react';
import axios from 'axios';

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
//import './home.css'

export default class CreateTransaction extends Component {

    
    constructor(props){
        super(props);

        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeDay = this.onChangeDay.bind(this);
        this.onChangeReason = this.onChangeReason.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeIssuedPerson = this.onChangeIssuedPerson.bind(this);
        this.onSubmit1 = this.onSubmit1.bind(this);
        
       

        this.state = {
            year : 0,
            month : 0,
            day : 0,
            reason : '',
            amount : 0,
            issuedPerson : ''
            
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
    onChangeDay(e){
        this.setState({
            day : e.target.value
        });
    }

    onChangeReason(e){
        this.setState({
            reason : e.target.value
        });
    }

    onChangeAmount(e){
        this.setState({
            amount : e.target.value
        });
    }

    onChangeIssuedPerson(e){
        this.setState({
            issuedPerson : e.target.value
        });
    }

    onSubmit1(e){
        e.preventDefault();

        const transactionExpenses = {
            year : this.state.year,
            month : this.state.month,
            day : this.state.day,
            reason : this.state.reason,
            amount : this.state.amount,
            issuedPerson : this.state.issuedPerson,
        }

        console.log(transactionExpenses);

        axios.post('http://localhost:5000/transactionExpenses/add', transactionExpenses)
        .then(res => console.log(res.data));

        window.location = '/transaction';
    }

    

    

    

    render() {
        return (
        <div >
            <Card className = "addcard" >
                <div className = "formdiv">
                <CardContent >
            <h3 className = "billheading">Add Transaction</h3>
        
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
                        <label>Date : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.day}
                        onChange = {this.onChangeDay}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Reason : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.reason}
                        onChange = {this.onChangeReason}
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
                        <label>Issued Person : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.issuedPerson}
                        onChange = {this.onChangeIssuedPerson}
                        />
                    </div>
                    

                    <div className = "form-group">
                        <input type = "submit" value = "Add Transaction" className = "btn-bill" />
                    </div>
                </form>

</CardContent>
</div>
</Card>
                

    </div>

                

                
        )
    }
}