import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import '../css/home.css'
import '../css/table.scss'
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Order = props => (
    <tr>
        <td>{props.order.orderNumber}</td>
        <td>{props.order.customerName}</td>
        <td>{props.order.address}</td>
        <td>{props.order.contactNo}</td>
        <td>{props.order.design}</td>
        <td>{props.order.size}</td>
        <td>{props.order.quantity}</td>
        <td>{props.order.printingMaterials}</td>
        <td>{props.order.orderType}</td>
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

        this.state = {order : [],
        searchOrder : ""};
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
            axios.delete('http://localhost:5000/order/' +id)
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

        searchOrderList(){

            return this.state.order.map((currentorder) => {
                if (
                    this.state.searchOrder ==
                    currentorder.orderNumber
                ){
                    return (
                        <tr>
                        <td style={{ width: "10%" }}>{currentorder.orderNumber}</td>
                        <td style={{ width: "10%" }}>{currentorder.customerName}</td>
                        <td style={{ width: "10%" }}>{currentorder.address}</td>
                        <td style={{ width: "10%" }}>{currentorder.contactNo}</td>
                        <td style={{ width: "10%" }}>{currentorder.design}</td>
                        <td style={{ width: "10%" }}>{currentorder.size}</td>
                        <td style={{ width: "10%" }}>{currentorder.quantity}</td>
                        <td style={{ width: "10%" }}>{currentorder.printingMaterials}</td>
                        <td style={{ width: "10%" }}>{currentorder.orderType}</td>
                        <td style={{ width: "10%" }}>{currentorder.orderStatus}</td>

                        <td style={{ width: "20%" }}>
                            {
                            <button className="edit">
                                <Link
                                to={"/editorder/" + currentorder._id}
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
                                    "http://localhost:5000/order/" + currentorder._id
                                    )
                                    .then(() => {
                                    alert("Delete Success");
                                      //Get data again after delete
                                    axios
                                        .get("http://localhost:5000/order")
                                        .then((res) => {
                                        console.log(res.data);
                                        this.setState({
                                            order: res.data,
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

        exportOrderList = () => {
            console.log( "Export PDF" )


            const unit = "pt";
            const size = "A3";
            const orientation = "landscape";
            const marginLeft = 40;
            const doc = new jsPDF( orientation, unit, size );

            const title = "Order List Report ";
            const headers = [["Order Number","Customer Name","Address","Contact Number","Quantity","Printing Materials","Order Type","Order Status"]];

            const order = this.state.order.map(
                Order=>[
                    Order.orderNumber,
                    Order.customerName,
                    Order.address,
                    Order.contactNo,
                    Order.quantity,
                    Order.printingMaterials,
                    Order.orderType,
                    Order.orderStatus,
                ]
            );

            let content = {
                startY: 50,
                head: headers,
                body:order
            };
            doc.setFontSize( 20 );
            doc.text( title, marginLeft, 40 );
            require('jspdf-autotable');
            doc.autoTable( content );
            doc.save( "Order-list.pdf" )
        }

    render() {
        return (
            <div>
            <Card className = "list">
                <table className = "topic">
                    <tr>
                        <th><h3>Order Details</h3></th>
                        <td><button className = "add" ><Link to = {"/createorder" } className = "linkaddE">Add Order</Link></button></td>
                        <td><button className = "download" onClick={() => this.exportOrderList()}>Download Report Here</button></td>
                    </tr>
                    <tr>
                    <div className="col-md-9">
                    <input style={{ width: "250px", marginTop:"10px"}}
                    class="form-control"
                    type="text"
                    placeholder="Search by Order Number"
                    aria-label="Search"
                    onChange={(e) => {
                        this.setState({
                        searchOrder: e.target.value
                        });
                    }}
                    />
            </div>
                    </tr>
                </table>


                <CardContent>
                <table className = "tbtransaction">
                <thead >
                    <tr>
                        <th className = "tbhead">Order ID</th>
                        <th className = "tbhead">Customer Name</th>
                        <th className = "tbhead">Address</th>
                        <th className = "tbhead">Contact Number</th>
                        <th className = "tbhead">Design</th>
                        <th className = "tbhead">Size</th>
                        <th className = "tbhead">Quantity</th>
                        <th className = "tbhead">Printing Materials</th>
                        <th className = "tbhead">Order Type</th>
                        <th className = "tbhead">Order Status</th>
                        <th className = "tbhead">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    { this.state.searchOrder == "" ? this.orderList() : this.searchOrderList() }
                </tbody>
            </table>
            </CardContent>
            </Card>

        </div>
        )
    }
}