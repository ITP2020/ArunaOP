import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/home.css'
import '../css/table.scss'
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';

export default class DeliveryQueue extends Component {
    constructor(props) {
        super(props);

        this.deleteQueue = this.deleteQueue.bind(this);
        this.state = {
        deliveryQueue: [],searchDelivery:""};
    }

    componentDidMount() {
        axios
        .get("http://localhost:5000/deliveryQueue/")
        .then((res) => {
            console.log(res.data);
            this.setState({
            deliveryQueue: res.data,
            });
        })
        .catch((err) => console.log(err));
    }

    DeliveryQueueList() {
        return this.state.deliveryQueue.map((currentdelivery) => {
        return (
            <tr>
            <td>{currentdelivery.OrderId}</td>
            <td>{currentdelivery.CustomerName}</td>
            <td>{currentdelivery.ContactNo}</td>
            <td>{currentdelivery.Quantity}</td>
            <td>{currentdelivery.Location}</td>
            <td>{currentdelivery.Driver}</td>
            <td>{currentdelivery.Vehicle}</td>
            <td>{currentdelivery.DeleveryDate.substring(0, 10)}</td>
            <td>{currentdelivery.DeleveryTime}</td>
            <td>
                <a className="btn btn-outline-danger" href="#" onClick={() => {
                    this.deleteQueue(currentdelivery.OrderId);
                }}
                >Delete</a>
            </td>
            </tr>
        );
        });
    }

    deleteQueue(id) {
        axios.delete("http://localhost:5000/deliveryQueue/" + id).then((response) => {
        console.log(response.data);
        window.location = "/Deliveries"
        });
    }

    render() {
        return (
            <div >
            <Card className = "addcard">
                <table className = "topic">
                    <tr>
                        <th><h3>Delivery Queue</h3></th>
                    </tr>
                </table>
                <CardContent>
                <table className = "table" style={{tableLayout:"fixed"}}>
                <thead style={{backgroundColor:"red",color:"white"}} >
                    <tr>
                    <th>Order Id</th>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Quantity</th>
                    <th>Location</th>
                    <th>Driver</th>
                    <th>Vehicle</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    { this.DeliveryQueueList() }
                </tbody>
            </table>
            </CardContent>
            </Card>
        </div>
        )
    }
}