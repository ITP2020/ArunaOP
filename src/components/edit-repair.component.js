import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditRepair extends Component {

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

        axios.get('http://localhost:5000/repairs/'+this.props.match.params.id)
        .then(response => {
          this.setState({
            username: response.data.username,
            model: response.data.model,
            fault: response.data.fault,
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

        axios.post('http://localhost:5000/repairs/update/'+this.props.match.params.id,repair)
        .then(res => console.log(res.data));

        window.location ='/replist'
    }
    
    render() {
        return (
            <div>
    <h2><b>Edit Repair</b></h2>
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
          <label><b>Fault</b></label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.fault}
              onChange={this.onChangeFault}
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
          <input type="submit" value="Edit Repair Details" className="btn btn-primary" />
        </div>
      </form>
            </div>
        )
    }
}

