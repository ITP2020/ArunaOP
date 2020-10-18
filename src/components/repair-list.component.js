import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';


const Repair = props => (
    <tr>
        <td>{props.repairs.username}</td>
        <td>{props.repairs.model}</td>
        <td>{props.repairs.fault}</td>
        <td>{props.repairs.date.substring(0,10)}</td>
        <td>
        <button className = 'edit'><Link to={"/repedit/"+props.repairs._id} className="link">Edit</Link></button>  <button className = 'delete' onClick={() => { props.deleteRepair(props.repairs._id) }}>Delete</button>
      </td>
    </tr>
  )

export default class RepairList extends Component {
    constructor(props){

        super(props);

        this.deleteRepair = this.deleteRepair.bind(this);

        this.state = {repairs:[],
        searchRepair : ""};

    }

    componentDidMount(){

        axios.get('http://localhost:5000/repairs/')
        .then(response => {

            this.setState ({ repairs: response.data})
        })
        .catch((error) => {

            console.log(error);
        })
    }

    deleteRepair(id){

        axios.delete('http://localhost:5000/repairs/'+id)
        .then(res => console.log(res.data));

        this.setState({

            repairs:this.state.repairs.filter(el => el._id !== id)
        })
    }

    repairList() {
        return this.state.repairs.map(currentRepairs => {
          return <Repair repairs={currentRepairs} deleteRepair={this.deleteRepair} key={currentRepairs._id}/>;
        })
      }

      searchRepairList(){

        return this.state.repairs.map((currentRepairs) => {
            if (
              (currentRepairs.model.toLowerCase().includes(this.state.searchRepair.toLowerCase()))
            ){
                return (
                    <tr>
                    <td style={{ width: "20%" }}>{currentRepairs.username}</td>
                    <td style={{ width: "20%" }}>{currentRepairs.model}</td>
                    <td style={{ width: "20%" }}>{currentRepairs.fault}</td>
                    <td style={{ width: "20%" }}>{currentRepairs.date.substring(0,10)}</td>
                    
                    <td style={{ width: "20%" }}>
                        {
                        <button className="edit">
                            <Link
                            to={"/repedit/" + currentRepairs._id}
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
                                "http://localhost:5000/repairs/" + currentRepairs._id
                                )
                                .then(() => {
                                alert("Delete Success");
                                  //Get data again after delete
                                axios
                                    .get("http://localhost:5000/repairs")
                                    .then((res) => {
                                    console.log(res.data);
                                    this.setState({
                                      repairs: res.data,
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

    render() {
        return (
            <div>

<Card className = "addcard">
                <table className = "topic">
                    <tr>
                        <th><h2><b>Equipment Repair List</b></h2>
                        <h5><i>You can edit or delete repair equipments from here</i></h5></th>
                        <td><button className = "add" ><Link to = {"/repair" } className = "linkaddE">Add Repair</Link></button>
                        </td>
                    </tr>
                    <tr>

                    <div className="col-md-9">
                    <input style={{ width: "200px", marginTop:"10px"}}
                    class="form-control"
                    type="text"
                    placeholder="Search by model"
                    aria-label="Search"
                    onChange={(e) => {
                        this.setState({
                        searchRepair: e.target.value
                        });
                    }}
                    />
            </div>
                    </tr>
                    </table>

            <CardContent>
            <table className="tbtransaction">
              <thead >
                <tr>
                  <th className = "tbhead">Supervisor</th>
                  <th className = "tbhead">Brand & Model</th>
                  <th className = "tbhead">Fault</th>
                  <th className = "tbhead">Date</th>
                  <th className = "tbhead">Edit or Delete</th>
                
                </tr>
              </thead>
              <tbody>
                { this.state.searchRepair == "" ? this.repairList() : this.searchRepairList() }
              </tbody>
            </table>
            </CardContent>
            </Card>
          </div>
        )
    }
}