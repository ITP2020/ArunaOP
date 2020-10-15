import React, { useState } from 'react'
import axios from "axios"

export default function RepairVehicleForm() {

    const [plateNo, setPlateNo] = useState(null);
    const [date, setDate] = useState(null);
    const [repair, setRepair] = useState(null);
    const [cost, setCost] = useState(null);
    const [place, setPlace] = useState(null);
    const [reviews, setReviews] = useState(null);

    async function onFormSubmit(e) {
        e.preventDefault();
        const VehicleRepairDetails = {
            plateNo,
            date,
            repair,
            cost,
            place,
            reviews
        }
        await axios.post("http://localhost:5000/repairvehicle/add", VehicleRepairDetails).then((res) => {
            alert("Insert Success");
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <div class="card" style={{ boxShadow: "14px 10px 22px 0px rgba(0,0,0,0.75)" }}>

                <div class="card-body">
                    <h5 class="card-title">Repair Information</h5>
                    <form onSubmit={onFormSubmit}>

                        <div class="form-group">
                            <label for="plateNo">Plate No</label>
                            <input type="text" class="form-control" id="vehicleid" aria-describedby="emailHelp" placeholder="Enter Vehicle ID" onChange={(e) => setPlateNo(e.target.value)} />

                        </div>
                        <div class="form-group">
                            <label for="vehicle">Date</label>
                            <input type="date" class="form-control" id="date" placeholder="Enter Date" onChange={(e) => setDate(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">Repair</label>
                            <input type="text" class="form-control" id="repair" placeholder="Enter Repair" onChange={(e) => setRepair(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">Cost</label>
                            <input type="number" class="form-control" id="cost" placeholder="Enter Cost" onChange={(e) => setCost(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">Place</label>
                            <input type="text" class="form-control" id="place" placeholder="Enter Place" onChange={(e) => setPlace(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">Reviews</label>
                            <input type="text" class="form-control" id="reviews" placeholder="Enter Reviews" onChange={(e) => setReviews(e.target.value)} />
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>

                    </form>
                </div>
            </div>
        </div>

    )
}
