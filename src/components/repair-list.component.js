import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Repair = props => (
    <tr>
        <td>{props.repairs.username}</td>
        <td>{props.repairs.model}</td>
        <td>{props.repairs.fault}</td>
        <td>{props.repairs.date.substring(0,10)}</td>
        <td>
        <Link to={"/repedit/"+props.repairs._id}>edit</Link> || <a href="#" onClick={() => { props.deleteRepair(props.repairs._id) }}>delete</a>
      </td>
    </tr>
  )

export default class RepairList extends Component {
    constructor(props){

        super(props);

        this.deleteRepair = this.deleteRepair.bind(this);

        this.state = {repairs:[]};

    }

    componentDidMount(){

        axios.get('http://localhost:5000/repairs/')
        .then(response => {

            this.setState ({ repairs: response.data})
        })
        .catch((error) => {

            console.log(error);
        })
    }

    deleteRepair(id){

        axios.delete('http://localhost:5000/repairs/'+id)
        .then(res => console.log(res.data));

        this.setState({

            repairs:this.state.repairs.filter(el => el._id !== id)
        })
    }

    repairList() {
        return this.state.repairs.map(currentRepairs => {
          return <Repair repairs={currentRepairs} deleteRepair={this.deleteRepair} key={currentRepairs._id}/>;
        })
      }
    render() {
        return (
            <div>
            <h1><b>Repair List</b></h1>
            <h3><i>You can edit or delete repair equipmets from here</i></h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th><b>Supervisor</b></th>
                  <th><b>Model</b></th>
                  <th><b>Fault</b></th>
                  <th><b>Date</b></th>
                  <th><b>Edit or Delete</b></th>
                
                </tr>
              </thead>
              <tbody>
                { this.repairList() }
              </tbody>
            </table>
          </div>
        )
    }
}