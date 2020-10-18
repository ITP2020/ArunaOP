import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';

export default class CreateEquipment extends Component {

    constructor(props){

        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            username :'',
            model:'',
            country:'',
            date: new Date(),
            users:[]
        }

        
    }

    componentDidMount(){

       axios.get('http://localhost:5000/users/')
       .then(response => {

        if(response.data.length > 0 ){

          this.setState({

            users:response.data.map(user => user.username),
            username:response.data[0].username
          })
        }
       })
    }

    onChangeUsername(e){

        this.setState({
            username:e.target.value
        });
    }
    onChangeModel(e){

        this.setState({
            model:e.target.value
        });
    }
    onChangeCountry(e){

        this.setState({
            country:e.target.value
        });
    }
    onChangeDate(date){

        this.setState({
            date:date
        });
    }

    demoClicked(){
      this.setState({
          model : "Ca",
          country : "Ru"
      })
  }

    onSubmit(e){

        e.preventDefault();

        const equipment = {

            username : this.state.username,
            model : this.state.model,
            country : this.state.country,
            date : this.state.date
        }

        console.log(equipment);

        if (this.state.model.length <= 2 ){
          this.setState({modelError : "Model must longer than 2 characters"})
        }
        else if (this.state.country.length <= 3 ){
          this.setState({countryError : "Country must longer than 3 characters"})
        }
        else if(this.state.model.length > 2 && this.state.country.length > 3){

        axios.post('http://localhost:5000/equipments/add',equipment)
        .then(res => console.log(res.data));


        window.location ='/equipment'
        }
      
        
    }
    
    render() {
        return (
            <div>
              <Card className = "addcard" >
            
            <div className = "formdiv">
            <CardContent >

    <h2 className = "billheading"><b>Add New Equipment</b></h2>
    <h5><i>You can add equipments from here</i></h5>

      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Supervisor: </label>
          <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Model: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.model}
              onChange={this.onChangeModel}
              />
              <p className = "validateMsg">{this.state.modelError}</p>
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input 
              type="text" 
              required
              className="form-control"
              value={this.state.country}
              onChange={this.onChangeCountry}
              />
              <p className = "validateMsg">{this.state.countryError}</p>
        
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker className = "date-control"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Add this equipment" className="btn-bill" />
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