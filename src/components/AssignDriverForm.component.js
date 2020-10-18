import React, { useState,useEffect } from 'react'
import axios from "axios"

export default function AssignVehicleForm(props) {

    const [OrderId, setOrderId] = useState(null);
    const [CustomerName, setCustomerName] = useState(null);
    const [ContactNo, setContactNo] = useState(null);
    const [Quantity, setQuantity] = useState(null);
    const [Location, setLocation] = useState(null);
    const [Driver, setDriver] = useState(null);
    const [Vehicle, setVehicle] = useState(null);
    const [DeleveryDate, setDeleveryDate] = useState(null);
    const [DeleveryTime, setDeleveryTime] = useState(null);

    useEffect(()=>{

        if(!props.location.data){
            window.location="/Upcoming"
        }

        const propsOrderID = props.location.data;

        console.log(propsOrderID)

        axios.get('http://localhost:5000/order/search/' +propsOrderID)
        .then(responseOrder => {

            console.log("Orders"+ responseOrder.data);
            setOrderId(responseOrder.data.orderNumber);
            setCustomerName(responseOrder.data.customerName);
            setContactNo(responseOrder.data.contactNo);
            setQuantity(responseOrder.data.quantity);
            setLocation(responseOrder.data.address);
        })
        .catch((error) => {
            console.log(error);
        })
    },[])

    async function onFormSubmit(e) {
        e.preventDefault();
        const AssignDetails = {
            OrderId,
            CustomerName,
            ContactNo,
            Quantity,
            Location,
            Driver, 
            Vehicle,
            DeleveryDate,
            DeleveryTime
        }
        await axios.post("http://localhost:5000/deliveryQueue/add", AssignDetails).then((res) => {
            alert("Insert Success");
        }).catch((err) => {
            console.log(err);
        })
        window.location = "/Deliveries"
    }

    return (
    <div className="container" style={{ marginTop: "20px" }}>
        <div class="card" style={{ boxShadow: "14px 10px 22px 0px rgba(0,0,0,0.75)" }}>
        <div class="card-body">
            <h5 class="card-title">Delivery Details</h5>
            <form onSubmit={onFormSubmit}>

            <div class="form-group">
                <label for="plateNo">Order Number</label>
                <input type="text" class="form-control" id="customername" aria-describedby="emailHelp" value={OrderId} readonly />
            </div>

            <div class="form-group">
                <label for="plateNo">Customer Name</label>
                <input type="text" class="form-control" id="customername" aria-describedby="emailHelp" value={CustomerName} readonly />
            </div>

            <div class="form-group">
                <label for="vehicle">Phone</label>
                <input type="text" class="form-control" id="phone" value={ContactNo} readonly />
            </div>

            <div class="form-group">
                <label for="brand">Quantity</label>
                <input type="text" class="form-control" id="quantity" value={Quantity} readonly/>
            </div>

            <div class="form-group">
                <label for="brand">Location</label>
                <input type="text" class="form-control" id="location" value={Location} readonly />
            </div>

            <div class="form-group">
                <label for="selectoption">Select Driver</label>
                <br />
                <input type="text" class="form-control" id="location" placeholder="Enter a Driver" onChange={(e) => setDriver(e.target.value)} />
            </div>

            <div class="form-group">
                <label for="selectoption">Select Vehicle</label>
                <br />
                <input type="text" class="form-control" id="location" placeholder="Enter a Vehicle" onChange={(e) => setVehicle(e.target.value)} />
            </div>

            <div class="form-group">
                <label for="brand">Select Time</label>
                <input type="time" class="form-control" id="city" placeholder="" onChange={(e) => setDeleveryTime(e.target.value)}/>
            </div>

            <div class="form-group">
                <label for="brand">Select Date</label>
                <input type="date" class="form-control" id="city" placeholder="" onChange={(e) => setDeleveryDate(e.target.value)} />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>

            </form>
        </div>
        </div>
    </div>
    );
}
