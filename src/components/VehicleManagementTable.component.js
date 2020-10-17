import { Link } from "react-router-dom";
import axios from "axios";
import "../css/home.css";
import "../css/table.scss";
import { Button, CardContent } from "@material-ui/core";
import { Card } from "@material-ui/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {  Component } from "react";



export default class VehicleManagement extends Component {
constructor(props) {
    super(props);
    this.state = {
    vehicle: [],
    searchVehicle:""
    };
}

componentDidMount() {
    axios
    .get("http://localhost:5000/vehicle/")
    .then((res) => {
        console.log(res.data);
        this.setState({
        vehicle: res.data,
        });
    })
    .catch((err) => console.log(err));
}

searchVehicleList(){

    return this.state.vehicle.map((currentvehicle) => {
        if (
            this.state.searchVehicle ==
            currentvehicle.brand
        ){
            return (
                <tr>
                <td style={{ width: "12.5%" }}>{currentvehicle.plateNo}</td>
                <td style={{ width: "12.5%" }}>{currentvehicle.brand}</td>
                <td style={{ width: "12.5%" }}>{currentvehicle.vehicle}</td>
                <td style={{ width: "12.5%" }}>{currentvehicle.year}</td>
                <td style={{ width: "12.5%" }}>{currentvehicle.type}</td>
                <td style={{ width: "17.5%" }}>
                    {currentvehicle.purchaseDate.substring(0, 10)}
                </td>
                <td style={{ width: "20%" }}>
                    {
                    <button className="edit">
                        <Link
                        to={"/UpdateVehicle/" + currentvehicle._id}
                        className="link"
                        >
                        Edit
                        </Link>
                    </button>
                    }
                    {" | "}
                    {
                    <button
                        className="delete"
                        onClick={() => {
                          //Delete the selected record
                        axios
                            .delete(
                            "http://localhost:5000/vehicle/" + currentvehicle._id
                            )
                            .then(() => {
                            alert("Delete Success");
                              //Get data again after delete
                            axios
                                .get("http://localhost:5000/vehicle")
                                .then((res) => {
                                console.log(res.data);
                                this.setState({
                                    vehicle: res.data,
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

vehicleList() {
    return this.state.vehicle.map((currentvehicle) => {
    return (
        <tr>
        <td style={{ width: "12.5%" }}>{currentvehicle.plateNo}</td>
        <td style={{ width: "12.5%" }}>{currentvehicle.brand}</td>
        <td style={{ width: "12.5%" }}>{currentvehicle.vehicle}</td>
        <td style={{ width: "12.5%" }}>{currentvehicle.year}</td>
        <td style={{ width: "12.5%" }}>{currentvehicle.type}</td>
        <td style={{ width: "17.5%" }}>
            {currentvehicle.purchaseDate.substring(0, 10)}
        </td>
        <td style={{ width: "20%" }}>
            {
            <button className="edit">
                <Link
                to={"/UpdateVehicle/" + currentvehicle._id}
                className="link"
                >
                Edit
                </Link>
            </button>
            }
            {" | "}
            {
            <button
                className="delete"
                onClick={() => {
                  //Delete the selected record
                axios
                    .delete(
                    "http://localhost:5000/vehicle/" + currentvehicle._id
                    )
                    .then(() => {
                    alert("Delete Success");
                      //Get data again after delete
                    axios
                        .get("http://localhost:5000/vehicle")
                        .then((res) => {
                        console.log(res.data);
                        this.setState({
                            vehicle: res.data,
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
    });
}

render() {
    return (

<>
    
    <div>
        <Card className="addcard">
        <table className="topic">
            <tr>
            <th>
                <h3>Vehicle Management</h3>
            </th>
            <td>
                <button className="add">
                <Link to={"/InsertVehicle"} className="linkaddE">
                    Add Vehicle
                </Link>
                </button>
             {/* <!-- search Vehicle modal --> */}
            <div className="col-md-9">
                    <input style={{ width: "200px", marginTop:"10px"}}
                    class="form-control"
                    type="text"
                    placeholder="Search by Vehicle Brand"
                    aria-label="Search"
                    onChange={(e) => {
                        this.setState({
                        searchVehicle: e.target.value
                        });
                    }}
                    />
            </div>
            </td>
            </tr>
        </table>
        <CardContent>
            <table className="table table-fixed">
            <thead>
                <tr>
                <th style={{ width: "12.5%" }}>Plate No</th>
                <th style={{ width: "12.5%" }}>Brand</th>
                <th style={{ width: "12.5%" }}>Model</th>
                <th style={{ width: "12.5%" }}>Year</th>
                <th style={{ width: "12.5%" }}>Type</th>
                <th style={{ width: "17.5%" }}>Purchase Date</th>
                <th style={{ width: "20%" }}>Manage</th>
                </tr>
            </thead>
            <tbody>{ this.state.searchVehicle == "" ? this.vehicleList() : this.searchVehicleList()}</tbody>
            </table>
        </CardContent>
        </Card>
    </div>
    </>
    );
}
}