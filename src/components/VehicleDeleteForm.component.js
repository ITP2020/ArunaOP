import React, { useState } from 'react'
import axios from "axios"

export default function RepairVehicleForm() {

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
                    <h5 class="card-title">Vehicle Details</h5>
                    <form onSubmit={onFormSubmit}>

                        <div class="form-group">
                            <label for="plateNo">Vehicle ID</label>
                            <input type="text" class="form-control" id="vehicleid" aria-describedby="emailHelp" placeholder="Enter Vehicle ID" onChange={(e) => setPlateNo(e.target.value)} />

                        </div>
                        <div class="form-group">
                            <label for="vehicle">Date</label>
                            <input type="date" class="form-control" id="date" placeholder="Enter Date" onChange={(e) => setVehicle(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">Reason</label>
                            <input type="text" class="form-control" id="reason" placeholder="Enter Reason" onChange={(e) => setBrand(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">Reviews</label>
                            <input type="number" class="form-control" id="reviews" placeholder="Enter Reviews" onChange={(e) => setYear(e.target.value)} />
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>

                    </form>
                </div>
            </div>
        </div>

    )
}
