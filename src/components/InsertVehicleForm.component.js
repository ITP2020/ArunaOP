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
            window.location = "/VehicleManagement"
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
    <div className="container" style={{ marginTop: "20px" }}>
        <div
        class="card"
        style={{ boxShadow: "14px 10px 22px 0px rgba(0,0,0,0.75)" }}
        >
        <div class="card-body">
            <h5 class="card-title">Vehicle Information</h5>
            <form onSubmit={onFormSubmit}>
            <div class="form-group">
                <label for="plateNo">Plate No</label>
                <input
                type="text"
                class="form-control"
                id="plateNo"
                aria-describedby="emailHelp"
                placeholder="Enter Plate No"
                value={plateNo}
                onChange={(e) => setPlateNo(e.target.value)}
                />
            </div>
            <div class="form-group">
                <label for="vehicle">Model</label>
                <input
                type="text"
                class="form-control"
                id="vehicle"
                placeholder="Enter Model"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                />
            </div>

            <div class="form-group">
                <label for="brand">Brand</label>
                <input
                type="text"
                class="form-control"
                id="vehicle"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                />
            </div>

            <div class="form-group">
                <label for="brand">Year</label>
                <input
                type="number"
                class="form-control"
                id="vehicle"
                placeholder="Enter Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                />
            </div>

            <div class="form-group">
                <label for="brand">Type</label>
                <select
                class="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
                >
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="Truck">Truck</option>
                </select>
            </div>

            <div class="form-group">
                <label for="brand">Purchase Date</label>
                <input
                type="date"
                class="form-control"
                id="vehicle"
                placeholder="Enter Purchase Date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                />
            </div>

            <button type="submit" class="btn btn-primary">
                Submit
            </button>

            <div className="form-group">
                <button className="demo" onClick={(e) => {
                    e.preventDefault();
                    setPlateNo("AAA-3825");
                    setBrand("Toyota");
                    setVehicle("Dolphin");
                    setPurchaseDate("2015-03-13");
                    setType("Van");
                    setYear("2012");
                }}>
                Demo
                </button>
            </div>
            </form>
        </div>
        </div>
    </div>
    );
}
