import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/home.css'
import '../css/table.scss'
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';


export default class UpcomingDeliveries extends Component {

    constructor(props){
        super(props);
    
        this.state = {finishedproduct : [],order:[]};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/finishedproduct/')
        .then(response => {
            console.log("Finished Products"+ response.data);
            this.setState({ finishedproduct : response.data })
        })
        .catch((error) => {
            console.log(error);
        })

        axios
        .get("http://localhost:5000/order")
        .then((responseOrder) => {
            console.log("Orders" + responseOrder.data);
            this.setState({ order: responseOrder.data });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    upcomingList(){
        return this.state.finishedproduct.map((currentFinishedProduct)=>{
            return this.state.order.map((order)=>{
                if(order.orderNumber == currentFinishedProduct.orderid ){
                    if(order.orderType == "delivery" || order.orderType == "Delivery")
                    {
                    return(
                        <tr>
                            <td >{order.orderNumber }</td>
                            <td >{order.customerName}</td>
                            <td >{order.contactNo}</td>
                            <td >{order.orderType}</td>
                            <td >{order.address}</td>
                            <td >
                            <Link  
                            to={{
                                pathname: "/AssignDriver",
                                data: order.orderNumber ,
                                }}
                            > <button className = 'btn btn-outline-primary'>Assign</button></Link>
                            </td>
                        </tr>
                        )
                    }
                
                }
            })
        })
    }

    render() {
        return (
            <div >
            <Card className = "addcard">
                <table className = "topic">
                    <tr>
                        <th><h3>Upcoming Deliveries</h3></th>
                    </tr>
                </table>
                <CardContent>
                <table className = "table" style={{tableLayout:"fixed"}}>
                <thead style={{backgroundColor:"red",color:"white"}} >
                    <tr>
                    <th>Order</th>
                    <th >Customer</th>
                    <th >Item</th>
                    <th>Location</th>
                    <th >Manage</th>
                    <th >Manage</th>
                    </tr>
                </thead>
                <tbody>
                    { this.upcomingList() }
                </tbody>
            </table>
            </CardContent>
            </Card>
        </div>
        )
    }
}