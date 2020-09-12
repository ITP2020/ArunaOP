import React, { Component } from 'react'
import axios from 'axios';

import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';

export default class CreateOrder extends Component {


        constructor(props){
            super(props);

            this.onChangeOrderNumber = this.onChangeOrderNumber.bind(this);
            this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
            this.onChangeDesign = this.onChangeDesign.bind(this);
            this.onChangeLength = this.onChangeLength.bind(this);
            this.onChangeHeight = this.onChangeHeight.bind(this);
            this.onChangeQuantity = this.onChangeQuantity.bind(this);
            this.onChangePrintingMaterials = this.onChangePrintingMaterials.bind(this);
            this.onChangeSpecialNotes = this.onChangeSpecialNotes.bind(this);
            this.onChangeOrderStatus = this.onChangeOrderStatus.bind(this);
            this.onSubmit = this.onSubmit.bind(this);

            this.state = {
                orderNumber : 0,
                customerName : '',
                design : '',
                length : 0,
                height : 0,
                quantity : 0,
                printingMaterials : '',
                specialNotes : '',
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

        onChangeDesign(e){
            this.setState({
                design : e.target.value
            });
        }

        onChangeLength(e){
            this.setState({
                length : e.target.value
            });
        }

        onChangeHeight(e){
            this.setState({
                height : e.target.value
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

        onChangeSpecialNotes(e){
            this.setState({
                specialNotes : e.target.value
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
                design : this.state.design,
                length : this.state.length,
                height : this.state.height,
                quantity : this.state.quantity,
                printingMaterials : this.state.printingMaterials,
                specialNotes : this.state.specialNotes,
                orderSatatus : this.state.orderStatus,
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
                        <label>Design : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.design}
                        onChange = {this.onChangeDesign}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Length : </label>
                        <input type = "number"
                        required
                        className = "form-control"
                        value = {this.state.length}
                        onChange = {this.onChangeLength}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Height : </label>
                        <input type = "number"
                        required
                        className = "form-control"
                        value = {this.state.height}
                        onChange = {this.onChangeHeight}
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
                        <label>Special Notes : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.specialNotes}
                        onChange = {this.onChangeSpecialNotes}
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
