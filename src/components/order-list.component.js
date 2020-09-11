import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import '../css/home.css'
import '../css/table.scss'
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';

const Order = props => (
    <tr>
        <td>{props.order.orderId}</td>
        <td>{props.order.customerName}</td>
        <td>{props.order.orderStatus}</td>
        <td>
            <button className = "edit"><Link to = {"/editorder/"+props.order._id} className = "link">edit</Link></button> | <button className = 'delete' onClick ={() => {props.deleteOrder(props.order._id)}}>delete</button>
        </td>
    </tr>
)


export default class OrderList extends Component {

    constructor(props){
        super(props);

        this.deleteOrder = this.deleteOrder.bind(this);

        this.state = {order : []};
    }


    componentDidMount() {
        axios.get('http://localhost:5000/order')
        .then(response => {
            this.setState({ order : response.data })
        })
        .catch((error) => {
            console.log(error);
        })
        }

        deleteOrder(id){
            axios.delete('http://localhost:5000/order/delete' +id)
            .then(res => console.log(res.data));
            this.setState({
                order : this.state.order.filter(el => el._id !== id)
            })
        }

        orderList(){
                return this.state.order.map(currentorder => {
                return <Order order = {currentorder} deleteOrder = {this.deleteOrder} key = {currentorder._id}/>;
            })
        }

    render() {
        return (
            <div>
            <Card className = "list">
                <table className = "topic">
                    <tr>
                        <th><h3>Order Details</h3></th>
                        <td><button className = "add" ><Link to = {"/createorder" } className = "linkaddE">Add Order</Link></button></td>
                    </tr>
                </table>
            
            
                <CardContent>
            <table className = "table table-fixed">
                <thead >
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Order Status</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    { this.orderList() }
                </tbody>
            </table>
            </CardContent>
            </Card>
            
        </div>
        )
    }
}