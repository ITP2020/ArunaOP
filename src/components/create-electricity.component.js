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
            year : '',
            month : '',
            amount : '',
            yearError : '',
            monthError : '',
            amountError : ''
            
        }
    }

    validateYear(){
        if(this.state.year.length === 4){
            this.setState({yearError : "Invalid Year"})
        }else{
            return true;
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

   /* submit(){
        
        
        if(this.validateYear()){
            alert("Submit");
        }
        
    }*/

    demoClicked(){
        this.setState({
            year : 20200,
            month : 11,
            amount : 25000
        })
    }

    onSubmit1(e){
        
            e.preventDefault();
        
            const electricityExpenses = {
                year : this.state.year,
                month : this.state.month,
                amount : this.state.amount,
            }
        
            console.log(electricityExpenses);

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
            else if(this.state.month > "12" ){
                    this.setState({monthError : "Month can only have values from 01 to 12."})          
            }
            else if(this.state.month === "0"){
                this.setState({monthError : "Month can only have values from 01 to 12."})
            }
            else if(this.state.amount === "0"){
                this.setState({amountError : "Amount can not be 0."})
            }
            else if(this.state.year.length === 4  && this.state.month <= "12"  && this.state.amount !== "0"){
               
                    axios.post('http://localhost:5000/electricityExpenses/add', electricityExpenses)
                .then(res => console.log(res.data));

                alert("Form is submitted successfully")

                window.location = '/electricity';  
                
            }
            else if(this.state.year.length === 0 && this.state.month.length === 0 && this.state.amount.length === 0){
                alert("You haven't filled the form")
            }
            else{
                    alert("Can not submit the form")
            }
        
            
    
            
           
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
                        onChange  = {this.onChangeYear}
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
                        <input type = "submit" value = "Add Electricity Bill" className = "btn-bill"  />
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