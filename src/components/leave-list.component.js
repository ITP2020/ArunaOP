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
    <button className = 'edit'><Link to={"/editleave/"+props.leave._id} className="link">Edit</Link></button>  <button className = 'delete' onClick={() => { props.deleteLeave(props.leave._id) }}>Delete</button>
    </td>
  </tr>
)

export default class LeaveList extends Component {
  constructor(props) {
    super(props);

    this.deleteLeave = this.deleteLeave.bind(this)

    this.state = {leave: [],
    searchLeave: ""};
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

  searchLeaveList(){

    return this.state.leave.map((currentleave) => {
        if (
            currentleave.leaveType.toLowerCase().includes(this.state.searchLeave.toLowerCase())
        ){
            return (
                <tr>
                <td style={{ width: "12.5%" }}>{currentleave.leaveType}</td>
                <td style={{ width: "12.5%" }}>{currentleave.numOfDays}</td>
                <td style={{ width: "12.5%" }}>{currentleave.startDate.substring(0,10)}</td>
                <td style={{ width: "12.5%" }}>{currentleave.endDate.substring(0,10)}</td>
                <td style={{ width: "12.5%" }}>{currentleave.description}</td>
                
                <td style={{ width: "20%" }}>
                    {
                    <button className="edit">
                        <Link
                        to={"/editleave/" + currentleave._id}
                        className="link"
                        >
                        Edit
                        </Link>
                    </button>
                    }
                    {"  "}
                    {
                    <button
                        className="delete"
                        onClick={() => {
                          //Delete the selected record
                        axios
                            .delete(
                            "http://localhost:5000/leave/" + currentleave._id
                            )
                            .then(() => {
                            alert("Delete Success");
                              //Get data again after delete
                            axios
                                .get("http://localhost:5000/leave")
                                .then((res) => {
                                console.log(res.data);
                                this.setState({
                                  leave: res.data,
                                });
                                })
                                .catch((err) => console.log(err));
                            })
                            .catch((err) => {
                            alert(err);
                            });
                        }}
                    >
                        Delete
                    </button>
                    }
                </td>
                </tr>
            );
        }
    });
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

                    <div className="col-md-9">
                    <input style={{ width: "250px", marginTop:"10px"}}
                    class="form-control"
                    type="text"
                    placeholder="Search by Leave Type"
                    aria-label="Search"
                    onChange={(e) => {
                        this.setState({
                        searchLeave: e.target.value
                        });
                    }}
                    />
            </div>
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
            { this.state.searchLeave == "" ? this.leaveList() : this.searchLeaveList() }
          </tbody>
        </table>
        </CardContent>
        </Card>
        
      </div>
    )
  }
}