import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//import '../css/home.css'
//import '../css/table.scss'
import '../css/transaction.css'
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';

const Leave = props => (
  <tr>
    <td>{props.leave.leaveType}</td>
    <td>{props.leave.numOfDays}</td>
    <td>{props.leave.startDate.substring(0,10)}</td>
    <td>{props.leave.endDate.substring(0,10)}</td>
    <td>{props.leave.description}</td>
    
    <td>
    <button className = 'edit'><Link to={"/edit/"+props.leave._id} className="link">Edit</Link></button>  <button className = 'delete' onClick={() => { props.deleteLeave(props.leave._id) }}>Delete</button>
    </td>
  </tr>
)

export default class LeaveList extends Component {
  constructor(props) {
    super(props);

    this.deleteLeave = this.deleteLeave.bind(this)

    this.state = {leave: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/leave/')
      .then(response => {
        this.setState({ leave: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteLeave(id) {
    axios.delete('http://localhost:5000/leave/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      leave: this.state.leave.filter(el => el._id !== id)
    })
  }

  leaveList() {
    return this.state.leave.map(currentleave => {
      return <Leave leave={currentleave} deleteLeave={this.deleteLeave} key={currentleave._id}/>;
    })
  }

  exportLeave = () => {
    console.log( "SSSSSSSSSS" )


    const unit = "pt";
    const size = "A3"; 
    const orientation = "portrait"; 
    const marginLeft = 40;
    const doc = new jsPDF( orientation, unit, size );

    const title = "Employee Leave Report ";
    const headers = [["Leave Type", "Number of Days", "Starting Date", "Ending Date","Leave Description"]];

    const lea = this.state.leave.map(
        Leave=>[
            Leave.leaveType,
            Leave.numOfDays,
            Leave.startDate.substring(0,10),
            Leave.endDate.substring(0,10),
            Leave.description
        ]
    );

    let content = {
        startY: 50,
        head: headers,
        body:lea
    };
    doc.setFontSize( 20 );
    doc.text( title, marginLeft, 40 );
    require('jspdf-autotable');
    doc.autoTable( content );
    doc.save( "EmployeeLeaves.pdf" )
}

  render() {
    return (
      <div>
        <Card className = "list">
            <table className = "topic">
                    <tr>
                        <th><h3>Leave Details</h3></th>
                        <td><button className = "add" ><Link to = {"/createLeave" } className = "linkaddE">Add Leave Request</Link></button>
                        <button className = "download" onClick={() => this.exportLeave()}>Download Report Here</button></td>
                    </tr>
                </table>
            
            
            
                <CardContent>
        <table className= "tbtransaction">
          <thead>
            <tr>
              <th className = "tbhead">Leave Type</th>
              <th className = "tbhead">Number Of Days</th>
              <th className = "tbhead">Start Date</th>
              <th className = "tbhead">End Date</th>
              <th className = "tbhead">Description</th>
              <th className = "tbhead">Actions</th>
              
            </tr>
          </thead>
          <tbody>
            { this.leaveList() }
          </tbody>
        </table>
        </CardContent>
        </Card>
        
      </div>
    )
  }
}