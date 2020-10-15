import React, { useState } from 'react'
import axios from "axios"

export default function InsertVehicleForm() {

    const [plateNo, setPlateNo] = useState(null);
    const [vehicle, setVehicle] = useState(null);
    const [brand, setBrand] = useState(null);
    const [year, setYear] = useState(null);
    const [type, setType] = useState(null);
    const [purchaseDate, setPurchaseDate] = useState(null);

    async function onFormSubmit(e) {

        e.preventDefault();

        const VehicleDetails = {
            plateNo,
            vehicle,
            brand,
            year,
            type,
            purchaseDate
        }
        await axios.post("http://localhost:5000/vehicle/add", VehicleDetails).then((res) => {
            alert("Insert Success");
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <div class="card" style={{ boxShadow: "14px 10px 22px 0px rgba(0,0,0,0.75)" }}>

                <div class="card-body">
                    <h5 class="card-title">Delivery Details</h5>
                    <form onSubmit={onFormSubmit}>

                        <div class="form-group">
                            <label for="plateNo">Customer Name</label>
                            <input type="text" class="form-control" id="customername" aria-describedby="emailHelp" placeholder="" onChange={(e) => setPlateNo(e.target.value)} />

                        </div>
                        <div class="form-group">
                            <label for="vehicle">Phone</label>
                            <input type="text" class="form-control" id="phone" placeholder="" onChange={(e) => setVehicle(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">Quantity</label>
                            <input type="text" class="form-control" id="quantity" placeholder="" onChange={(e) => setBrand(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">House No.</label>
                            <input type="text" class="form-control" id="houseno" placeholder="" onChange={(e) => setYear(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">Street</label>
                            <input type="text" class="form-control" id="street" placeholder="" onChange={(e) => setType(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">City</label>
                            <input type="text" class="form-control" id="city" placeholder="" onChange={(e) => setPurchaseDate(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="selectoption">Select Driver</label><br />

                            <select name="driver" id="selectoption" lass="form-control" class="form-control">
                                <option value="driver 01">Driver 01</option>
                                <option value="driver 02">Driver 02</option>
                                <option value="driver 03">Driver 03</option>
                                <option value="driver 04">Driver 04</option>
                                <option value="driver 05">Driver 05</option>
                            </select>

                        </div>

                        <div class="form-group">
                            <label for="selectoption">Select Vehicle</label><br />

                            <select name="vehicle" id="selectoption" lass="form-control" class="form-control">
                                <option value="vehicle 01">Vehicle 01</option>
                                <option value="vehicle 02">Vehicle 02</option>
                                <option value="vehicle 03">Vehicle 03</option>
                                <option value="vehicle 04">Vehicle 04</option>
                                <option value="vehicle 05">Vehicle 05</option>
                            </select>

                        </div>

                        <div class="form-group">
                            <label for="brand">Select Time</label>
                            <input type="time" class="form-control" id="city" placeholder="" onChange={(e) => setPurchaseDate(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">Select Date</label>
                            <input type="date" class="form-control" id="city" placeholder="" onChange={(e) => setPurchaseDate(e.target.value)} />
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>

                    </form>
                </div>
            </div>
        </div>

    )
}
