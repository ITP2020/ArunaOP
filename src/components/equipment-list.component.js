import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';


const Equipment = props => (
    <tr>
      <td>{props.equipments.username}</td>
      <td>{props.equipments.model}</td>
      <td>{props.equipments.country}</td>
      <td>{props.equipments.date.substring(0,10)}</td>
      <td>
      <button className = 'edit'><Link to={"/editEquipment/"+props.equipments._id } className="link">Edit</Link></button>  <button className = 'delete' onClick={() => { props.deleteEquipment(props.equipments._id) }}>Delete</button>
      </td>
    </tr>
  )

export default class EquipmentList extends Component {
    constructor(props){

        super(props);

        this.deleteEquipment = this.deleteEquipment.bind(this);

        this.state = {equipments:[],
        searchEquipment : ""};

    }

    componentDidMount(){

        axios.get('http://localhost:5000/equipments/')
        .then(response => {

            this.setState ({ equipments: response.data})
        })
        .catch((error) => {

            console.log(error);
        })
    }

    deleteEquipment(id){

        axios.delete('http://localhost:5000/equipments/'+id)
        .then(res => console.log(res.data));

        this.setState({

            equipments:this.state.equipments.filter(el => el._id !== id)
        })
    }

    equipmentList() {
        return this.state.equipments.map(currentEquipments => {
          return <Equipment equipments={currentEquipments} deleteEquipment={this.deleteEquipment} key={currentEquipments._id}/>;
        })
      }

      searchEquipmentList(){

        return this.state.equipments.map((currentEquipments) => {
            if (
                this.state.searchEquipment ==
                currentEquipments.username
            ){
                return (
                    <tr>
                    <td style={{ width: "20%" }}>{currentEquipments.username}</td>
                    <td style={{ width: "20%" }}>{currentEquipments.model}</td>
                    <td style={{ width: "20%" }}>{currentEquipments.country}</td>
                    <td style={{ width: "20%" }}>{currentEquipments.date.substring(0,10)}</td>
                    
                    <td style={{ width: "20%" }}>
                        {
                        <button className="edit">
                            <Link
                            to={"/editEquipment/" + currentEquipments._id}
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
                                "http://localhost:5000/equipments/" + currentEquipments._id
                                )
                                .then(() => {
                                alert("Delete Success");
                                  //Get data again after delete
                                axios
                                    .get("http://localhost:5000/equipments")
                                    .then((res) => {
                                    console.log(res.data);
                                    this.setState({
                                      equipments: res.data,
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

    <Card className = "list">
            <table className = "topic">
                    <tr>
                        <th><h1><b>Equipment List</b></h1>
            <h3><i>You can edit or delete equipmets from here</i></h3></th>
                        <td><button className = "add" ><Link to = {"/createEquipment" } className = "linkaddE">Add Equipment</Link></button>
                        </td>
                        </tr>
                        <tr>

                        <div className="col-md-9">
                    <input style={{ width: "250px", marginTop:"10px"}}
                    class="form-control"
                    type="text"
                    placeholder="Search by Supervisor name"
                    aria-label="Search"
                    onChange={(e) => {
                        this.setState({
                        searchEquipment: e.target.value
                        });
                    }}
                    />
            </div>
                    </tr>
</table>
<CardContent>
            <table className="tbtransaction">
              <thead>
                <tr>
                  <th className = "tbhead">Supervisor</th>
                  <th className = "tbhead">Brand & Model</th>
                  <th className = "tbhead">Country</th>
                  <th className = "tbhead">Date</th>
                  <th className = "tbhead">Edit or Delete</th>
                
                </tr>
              </thead>
              <tbody>
                { this.state.searchEquipment == "" ? this.equipmentList() : this.searchEquipmentList() }
              </tbody>
            </table>
            </CardContent>
            </Card>
          </div>
        )
    }
}