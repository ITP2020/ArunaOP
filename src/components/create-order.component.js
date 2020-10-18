import React, { Component } from 'react'
import axios from 'axios';

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';

export default class CreateOrder extends Component {


        constructor(props){
            super(props);

            this.onChangeOrderNumber = this.onChangeOrderNumber.bind(this);
            this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
            this.onChangeAddress = this.onChangeAddress.bind(this);
            this.onChangeContactno = this.onChangeContactno.bind(this);
            this.onChangeDesign = this.onChangeDesign.bind(this);
            this.onChangeSize = this.onChangeSize.bind(this);
            this.onChangeQuantity = this.onChangeQuantity.bind(this);
            this.onChangePrintingMaterials = this.onChangePrintingMaterials.bind(this);
            this.onChangeOrdertype = this.onChangeOrdertype.bind(this);
            this.onChangeOrderStatus = this.onChangeOrderStatus.bind(this);
            this.onSubmit = this.onSubmit.bind(this);

            this.state = {
                orderNumber : 0,
                customerName : '',
                address : '',
                contactNo : '',
                design : '',
                size : '',
                quantity : 0,
                printingMaterials : '',
                orderType : '',
                orderStatus : ''

            }
        }

        onChangeOrderNumber(e){
            this.setState({
                orderNumber : e.target.value
            });
        }

        onChangeCustomerName(e){
            this.setState({
                customerName : e.target.value
            });
        }

        onChangeAddress(e){
            this.setState({
                address : e.target.value
            });
        }

        onChangeContactno(e){
            this.setState({
                contactNo : e.target.value
            });
        }

        onChangeDesign(e){
            this.setState({
                design : e.target.value
            });
        }

        onChangeSize(e){
            this.setState({
                size : e.target.value
            });
        }

        onChangeQuantity(e){
            this.setState({
                quantity : e.target.value
            });
        }

        onChangePrintingMaterials(e){
            this.setState({
                printingMaterials : e.target.value
            });
        }

        onChangeOrdertype(e){
            this.setState({
                orderType : e.target.value
            });
        }

        onChangeOrderStatus(e){
            this.setState({
                orderStatus : e.target.value
            });
        }

        async onSubmit(e){
            e.preventDefault();

            const order = {
                orderNumber : this.state.orderNumber,
                customerName : this.state.customerName,
                address : this.state.address,
                contactNo : this.state.contactNo,
                design : this.state.design,
                size : this.state.size,
                quantity : this.state.quantity,
                printingMaterials : this.state.printingMaterials,
                orderType : this.state.orderType,
                orderStatus : this.state.orderStatus,
            }

            console.log(order);

            await axios.post('http://localhost:5000/order/add', order)
            .then(res => console.log(res.data)).catch((error) => {
                console.log(error.message)
            })

            window.location = '/order';
        }
        render() {
        return (
            <div>
                <Card className = "addcard" >
                <div className = "formdiv">
                <CardContent >
            <h3 className = "billheading">New order</h3>

                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Order Number : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.orderNumber}
                        onChange = {this.onChangeOrderNumber}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Customer Name : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.customerNumber}
                        onChange = {this.onChangeCustomerName}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Address : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.address}
                        onChange = {this.onChangeAddress}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Contact Number : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.contactNo}
                        onChange = {this.onChangeContactno}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Design : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.design}
                        onChange = {this.onChangeDesign}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Size : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.size}
                        onChange = {this.onChangeSize}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Quantity : </label>
                        <input type = "number"
                        required
                        className = "form-control"
                        value = {this.state.quantity}
                        onChange = {this.onChangeQuantity}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Printing Materials : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.printingMaterials}
                        onChange = {this.onChangePrintingMaterials}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Order Type: </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.orderType}
                        onChange = {this.onChangeOrdertype}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Order Status : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.orderStatus}
                        onChange = {this.onChangeOrderStatus}
                        />
                    </div>

                    <div className = "form-group">
                        <input type = "submit" value = "Submit" className = "btn-bill" />
                    </div>
                </form>

</CardContent>
</div>
</Card>
                </div>
        )
    }
}
