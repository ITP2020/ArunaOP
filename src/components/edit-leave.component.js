import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
import '../css/home.css'

export default class EditLeave extends Component {
  constructor(props) {
    super(props);

    this.onChangeLeaveType = this.onChangeLeaveType.bind(this);
    this.onChangeNumOfDays = this.onChangeNumOfDays.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        leaveType: '',
        numOfDays: 0,
        startDate: new Date(),
        endDate: new Date(),
        description: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/leave/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          leaveType: response.data.leaveType,
          numOfDays: response.data.numOfDays,
          startDate: new Date(response.data.startDate),
          endDate: new Date(response.data.endDate),
          description: response.data.description
          
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    

  }

  onChangeLeaveType(e) {
    this.setState({
      leaveType: e.target.value
    })
  }

  onChangeNumOfDays(e) {
    this.setState({
      numOfDays: e.target.value
    })
  }
  onChangeStartDate(date) {
    this.setState({
      startDate: date
    })
  }
  onChangeEndDate(date) {
    this.setState({
      endDate: date
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  

  onSubmit(e) {
    e.preventDefault();

    const leave = {
      leaveType: this.state.leaveType,
      numOfDays: this.state.numOfDays,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      description: this.state.description
    }
      
     

    console.log(leave);

    axios.post('http://localhost:5000/leave/update/' + this.props.match.params.id, leave)
      .then(res => console.log(res.data));

    window.location = '/leaves';
  }

  render() {
    return (
    <div>
      <Card className = "addcard" >
                <div className = "formdiv">
                <CardContent >
      <h3>Edit Requested Leaves</h3>
      <form onSubmit={this.onSubmit}>
        
        <div className="form-group"> 
          <label>Leave Type: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.leaveType}
              onChange={this.onChangeLeaveType}
              />
        </div>
        <div className="form-group">
          <label>Number Of Days: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.numOfDays}
              onChange={this.onChangeNumOfDays}
              />
        </div>
        <div className="form-group">
          <label>Start Date: </label>
          <div>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.onChangeStartDate}
            />
          </div>
        </div>

        <div className="form-group">
          <label>End Date: </label>
          <div>
            <DatePicker
              selected={this.state.endDate}
              onChange={this.onChangeEndDate}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Leave" className="btn-bill" />
        </div>
      </form>
      </CardContent>
      </div>
      </Card>
    </div>
    )
  }
}