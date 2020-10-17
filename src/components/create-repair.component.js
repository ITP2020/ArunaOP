import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';

export default class CreateRepair extends Component {

    constructor(props){

        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeFault = this.onChangeFault.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            username :'',
            model:'',
            fault:'',
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
    onChangeFault(e){

        this.setState({
            fault:e.target.value
        });
    }
    onChangeDate(date){

        this.setState({
            date:date
        });
    }

    onSubmit(e){

        e.preventDefault();

        const repair = {

            username : this.state.username,
            model : this.state.model,
            fault : this.state.fault,
            date : this.state.date
        }

        console.log(repair);

        axios.post('http://localhost:5000/repairs/add',repair)
        .then(res => console.log(res.data));

        window.location ='/replist'
    }
    
    render() {
        return (
            <div>
            
            <Card className = "addcard" >
            
                <div className = "formdiv">
                <CardContent>
            
    <h2 className = "billheading"><b>Add To Repair</b></h2>
    <h5><i>You can add repairs from here</i></h5>
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
        </div>
        <div className="form-group">
          <label>Fault:</label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.fault}
              onChange={this.onChangeFault}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Add Repair Details" className="btn-bill" />
        </div>
      </form>
      </CardContent>
      </div>
      </Card>
            </div>
        )
    }
}
