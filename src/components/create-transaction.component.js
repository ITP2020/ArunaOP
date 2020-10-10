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
            year : '',
            month : '',
            day : '',
            reason : '',
            amount : '',
            issuedPerson : '',
            yearError : '',
            monthError : '',
            dayError : '',
            reasonError : '',
            amountError : '',
            personError : ''

            
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

    demoClicked(){
        this.setState({
            year : 20200,
            month : 11,
            day : 12,
            reason : "Buying color ink",
            amount : 25000,
            issuedPerson : "Dewapura"
        })
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
        if(this.state.year.length !== 4 && this.state.month > "12" && this.state.day > "31" && this.state.reason.length < 10 && this.state.amount === "0" && this.state.issuedPerson.length < 5){
            this.setState({yearError : "Year can only have four digits.", monthError : "Month can only have values from 01 to 12.",
            dayError : "Day can only have values from 01 to 31.",reasonError : "Reason should be atleast 10 digits long.",
             amountError : "Amount can not be 0.", personError : "Issued person should atlesat 5 characters long."})
        }
        else if(this.state.year.length !== 4 && this.state.month > "12" && this.state.day > "31" && this.state.reason.length < 10 && this.state.amount === "0"){
            this.setState({yearError : "Year can only have four digits.", monthError : "Month can only have values from 01 to 12.",
            dayError : "Day can only have values from 01 to 31.",reasonError : "Reason should be atleast 10 digits long.",
             amountError : "Amount can not be 0."})
        }
        else if(this.state.year.length !== 4 && this.state.month > "12" && this.state.day > "31" && this.state.reason.length < 10 && this.state.issuedPerson.length < 5){
            this.setState({yearError : "Year can only have four digits.", monthError : "Month can only have values from 01 to 12.",
            dayError : "Day can only have values from 01 to 31.",reasonError : "Reason should be atleast 10 digits long.", personError : "Issued person should atlesat 5 characters long."})
        }
        else if(this.state.year.length !== 4 && this.state.month > "12" && this.state.day > "31" && this.state.amount === "0" && this.state.issuedPerson.length < 5){
            this.setState({yearError : "Year can only have four digits.", monthError : "Month can only have values from 01 to 12.",
            dayError : "Day can only have values from 01 to 31.",amountError : "Amount can not be 0.", personError : "Issued person should atlesat 5 characters long."})
        }
        else if(this.state.year.length !== 4 && this.state.month > "12" && this.state.reason.length < 10 && this.state.amount === "0" && this.state.issuedPerson.length < 5){
            this.setState({yearError : "Year can only have four digits.", monthError : "Month can only have values from 01 to 12.",
            reasonError : "Reason should be atleast 10 digits long.",amountError : "Amount can not be 0.", personError : "Issued person should atlesat 5 characters long."})
        }
        else if(this.state.year.length !== 4 && this.state.day > "31" && this.state.reason.length < 10 && this.state.amount === "0" && this.state.issuedPerson.length < 5){
            this.setState({yearError : "Year can only have four digits.", dayError : "Day can only have values from 01 to 31.",reasonError : "Reason should be atleast 10 digits long.",
             amountError : "Amount can not be 0.", personError : "Issued person should atlesat 5 characters long."})
        }
       else if(this.state.year.length !== 4){
        this.setState({yearError : "Year can only have four digits."})
       }
       else if(this.state.month > "12"){
        this.setState({monthError : "Month can only have values from 01 to 12."})
       }
       else if(this.state.day > "31"){
        this.setState({dayError : "Day can only have values from 01 to 31."})
       }
       else if(this.state.reason.length < 10){
        this.setState({reasonError : "Reason should be atleast 10 digits long."})
       }
       else if(this.state.amount === "0"){
        this.setState({amountError : "Amount can not be 0."})
       }
       else if(this.state.issuedPerson.length < 5){
        this.setState({personError : "Issued person should atlesat 5 characters long."})
       }
       else if(this.state.year.length === 4 && this.state.month <= "12" && this.state.day <= "31" && this.state.reason.length >= 10 && this.state.amount !== "0" && this.state.issuedPerson.length >= 5){
        
        axios.post('http://localhost:5000/transactionExpenses/add', transactionExpenses)
        .then(res => console.log(res.data));
        alert("Form is submitted successfully")

        window.location = '/transaction';
       }
       else{
           alert("Form can not be submitted")
       }
            
        
        
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
                        <label>Date : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.day}
                        onChange = {this.onChangeDay}
                        />
                        <p className = "validateMsg">{this.state.dayError}</p>
                    </div>

                    <div className = "form-group">
                        <label>Reason : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.reason}
                        onChange = {this.onChangeReason}
                        />
                        <p className = "validateMsg">{this.state.reasonError}</p>
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
                        <label>Issued Person : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.issuedPerson}
                        onChange = {this.onChangeIssuedPerson}
                        />
                        <p className = "validateMsg">{this.state.personError}</p>
                    </div>
                    

                    <div className = "form-group">
                        <input type = "submit" value = "Add Transaction" className = "btn-bill" />
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