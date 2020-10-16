import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';

export default class EditEquipment extends Component {

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

        axios.get('http://localhost:5000/equipments/'+this.props.match.params.id)
        .then(response => {
          this.setState({
            username: response.data.username,
            model: response.data.model,
            country: response.data.country,
            date: new Date(response.data.date)
          })   
        })
        .catch(function (error) {
          console.log(error);
        })
        



        axios.get('http://localhost:5000/users/')
        .then(response => {

        if(response.data.length > 0 ){

          this.setState({

            users:response.data.map(user => user.username),
            
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

    onSubmit(e){

        e.preventDefault();

        const equipment = {

            username : this.state.username,
            model : this.state.model,
            country : this.state.country,
            date : this.state.date
        }

        console.log(equipment);

        axios.post('http://localhost:5000/equipments/update/'+this.props.match.params.id,equipment)
        .then(res => console.log(res.data));

        window.location ='/equipment'
    }
    
    render() {
        return (
            <div>
              <Card className = "addcard">
                <div className = "formdiv">
                <CardContent >
    <h2 className = "billheading"><b>Edit Equipment</b></h2>
    
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label><b>Username</b></label>
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
          <label><b>Model</b></label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.model}
              onChange={this.onChangeModel}
              />
        </div>
        <div className="form-group">
          <label><b>Country</b></label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.country}
              onChange={this.onChangeCountry}
              />
        </div>
        <div className="form-group">
          <label><b>Date</b></label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Equipment" className="btn-bill" />
        </div>
      </form>
      </CardContent>
      </div>
      </Card>
            </div>
        )
    }
}

