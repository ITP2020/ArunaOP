import React, { useState,useEffect } from 'react'
import axios from "axios"

export default function UpdateVehicleForm(props) {
    const [objectID, setObjectID] = useState(null);
    const [plateNo, setPlateNo] = useState(null);
    const [vehicle, setVehicle] = useState(null);
    const [brand, setBrand] = useState(null);
    const [year, setYear] = useState(null);
    const [type, setType] = useState(null);
    const [purchaseDate, setPurchaseDate] = useState(null);


    useEffect(()=>{


        axios.get("http://localhost:5000/vehicle/" +props.match.params.id).then((res)=>{

                console.log(res)
                setObjectID(res.data._id);
                setPlateNo(res.data.plateNo);
                setVehicle(res.data.vehicle);
                setBrand(res.data.brand);
                setYear(res.data.year);
                setType(res.data.type);
                setPurchaseDate(res.data.purchaseDate.substring(0, 10));

        }).catch(err=>{
            alert(err)
        })

    },[])



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


        await axios.post("http://localhost:5000/vehicle/update/" + objectID, VehicleDetails).then((res) => {
            alert("Update Success");
            window.location = "/VehicleManagement"
        }).catch((err) => {
            alert(err);
        })
    }



    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <div class="card" style={{ boxShadow: "14px 10px 22px 0px rgba(0,0,0,0.75)" }}>

                <div class="card-body">
                    <h5 class="card-title">Vehicle Information</h5>
                    <form onSubmit={onFormSubmit}>

                        <div class="form-group">
                            <label for="plateNo">Plate No</label>
                            <input type="text" class="form-control" id="plateNo" aria-describedby="emailHelp" value={plateNo}
                            onChange={(e) => setPlateNo(e.target.value)} />

                        </div>
                        <div class="form-group">
                            <label for="vehicle">Model</label>
                            <input type="text" class="form-control" id="vehicle"
                             value={vehicle}
                             onChange={(e) => setVehicle(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">Brand</label>
                            <input type="text" class="form-control" id="brand" 
                            value={brand} 
                            onChange={(e) => setBrand(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">Year</label>
                            <input type="text" class="form-control" id="year" 
                            value={year} 
                            onChange={(e) => setYear(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">Type</label>
                            <input type="text" class="form-control" id="type" 
                            value={type} 
                            onChange={(e) => setType(e.target.value)} />
                        </div>

                        <div class="form-group">
                            <label for="brand">Purchase Date</label>
                            <input type="date" class="form-control" id="purchaseDate" 
                            value={purchaseDate} 
                            onChange={(e) => setPurchaseDate(e.target.value)} />
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>

                    </form>
                </div>
            </div>
        </div>

    )
}
