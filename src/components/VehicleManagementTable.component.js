import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/home.css'
import '../css/table.scss'
import { Button, CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';

import React, { useState, useEffect, Component } from 'react'


const VehicleListComponent = props => (
    <tr>
        <td style={{width:"12.5%"}}>{props.vehiclelistDetails.plateNo}</td>
        <td style={{width:"12.5%"}}>{props.vehiclelistDetails.brand}</td>
        <td style={{width:"12.5%"}}>{props.vehiclelistDetails.vehicle}</td>
        <td style={{width:"12.5%"}}>{props.vehiclelistDetails.year}</td>
        <td style={{width:"12.5%"}}>{props.vehiclelistDetails.type}</td>
        <td style={{width:"17.5%"}}>{props.vehiclelistDetails.purchaseDate.substring(0, 10)}</td>
<td style={{width:"20%"}}>{<button className = 'edit'><Link to = {"/UpdateVehicle/"+props.vehiclelistDetails.plateNo} className="link">Edit</Link></button>}{" | "}{<button className = 'delete'><Link to = {"/VehicleDelete/"+props.vehiclelistDetails.plateNo} className="link">Delete</Link></button>}</td>
    </tr>
)


export default class VehicleManagement extends Component {


    constructor(props) {
        super(props);

        this.state = {
            vehicle: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/vehicle/").then((res) => {
            console.log(res.data)
            this.setState({
                vehicle: res.data
            })

        }).catch((err) => console.log(err))
    }



    vehicleList() {

        return this.state.vehicle.map((currentvehicle) => {
            return (
                <VehicleListComponent

                    vehiclelistDetails={currentvehicle}
                    key={currentvehicle._id}

                />
            )
        })

    };


    render() {
        return (
            <div >
            <Card className = "addcard">
                <table className = "topic">
                    <tr>
                        <th><h3>Vehicle Management</h3></th>
                        <td><button className = "add" ><Link to = {"/InsertVehicle" } className = "linkaddE">Add Vehicle</Link></button></td>
                    </tr>
                </table>
                <CardContent>
                <table className = "table table-fixed">
                <thead >
                    <tr>
                    <th style={{width:"12.5%"}}>Plate No</th>
                    <th style={{width:"12.5%"}}>Brand</th>
                    <th style={{width:"12.5%"}}>Model</th>
                    <th style={{width:"12.5%"}}>Year</th>
                    <th style={{width:"12.5%"}}>Type</th>
                    <th style={{width:"17.5%"}}>Purchase Date</th>
                    <th style={{width:"20%"}}>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    { this.vehicleList() }
                </tbody>
            </table>
            </CardContent>
            </Card>
        </div>
        )
    }
}