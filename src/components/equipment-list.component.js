import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Equipment = props => (
    <tr>
      <td>{props.equipments.username}</td>
      <td>{props.equipments.model}</td>
      <td>{props.equipments.country}</td>
      <td>{props.equipments.date.substring(0,10)}</td>
      <td>
        <Link to={"/editEquipment/"+props.equipments._id}>edit</Link> || <a href="#" onClick={() => { props.deleteEquipment(props.equipments._id) }}>delete</a>
      </td>
    </tr>
  )

export default class EquipmentList extends Component {
    constructor(props){

        super(props);

        this.deleteEquipment = this.deleteEquipment.bind(this);

        this.state = {equipments:[]};

    }

    componentDidMount(){

        axios.get('http://localhost:5000/equipments/')
        .then(response => {

            this.setState ({ equipments: response.data})
        })
        .catch((error) => {

            console.log(error);
        })
    }

    deleteEquipment(id){

        axios.delete('http://localhost:5000/equipments/'+id)
        .then(res => console.log(res.data));

        this.setState({

            equipments:this.state.equipments.filter(el => el._id !== id)
        })
    }

    equipmentList() {
        return this.state.equipments.map(currentEquipments => {
          return <Equipment equipments={currentEquipments} deleteEquipment={this.deleteEquipment} key={currentEquipments._id}/>;
        })
      }
    render() {
        return (
            <div>
            <h1><b>Equipment List</b></h1>
            <h3><i>You can edit or delete equipmets from here</i></h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th><b>Supervisor</b></th>
                  <th><b>Model</b></th>
                  <th><b>Country</b></th>
                  <th><b>Date</b></th>
                  <th><b>Edit or Delete</b></th>
                
                </tr>
              </thead>
              <tbody>
                { this.equipmentList() }
              </tbody>
            </table>
          </div>
        )
    }
}
