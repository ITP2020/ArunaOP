import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CardContent } from "@material-ui/core";
import { Card } from "@material-ui/core";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default class ViewSupplies extends Component {
  constructor(props) {
    super(props);
    this.deleteSupply = this.deleteSupply.bind(this);
    this.state = { supplies: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/supplies/")
      .then((response) => {
        this.setState({ supplies: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteSupply(id) {
    axios
      .delete("http://localhost:5000/supplies/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      supplies: this.state.supplies.filter((el) => el._id !== id),
    });
  }

  exportSupplies = () => {
    const unit = "pt";
    const size = "A3";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    const title = "Supplies Report ";
    const headers = [
      ["Item name", "Supplier Name", "Price", "Date", "Description"],
    ];

    const suppliesData = this.state.supplies.map((supply) => [
      supply.itemName,
      supply.supplierName,
      supply.price,
      supply.date,
      supply.description,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: suppliesData,
    };
    doc.setFontSize(24);
    doc.text(title, marginLeft, 40);
    require("jspdf-autotable");
    doc.autoTable(content);
    doc.save("WaterExpenses.pdf");
  };

  render() {
    return (
      <div>
        <Card className="addcard">
          <table className="topic">
            <tr>
              <th>
                <h3>Supplies</h3>
              </th>
              <td>
                <Link to={"/addSupply"} className="linkaddE">
                  <button className="btn btn-secondary btn-sm">
                    Add a supply
                  </button>
                </Link>
                <button
                  className="btn btn-primary"
                  onClick={() => this.exportSupplies()}
                >
                  Download Report Here
                </button>
              </td>
            </tr>
          </table>

          <CardContent>
            <table className="table table-hover" style={{tableLayout:"fixed"}}>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Supplier Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                      <td scope="row">supply.itemName</td>
                      <td>supply.supplierName</td>
                      <td>supply.price</td>
                      <td>supply.date</td>
                      <td>supply.description</td>
                      <td>
                          <button style={{display:"inline-block"}} className="btn btn-secondary btn-sm">Edit</button>
                          <button style={{display:"inline-block"}} className="btn btn-danger btn-sm">Delete</button>
                      </td>
                    </tr>
                {this.state.supplies.map((supply) => {
                  return (
                    <tr>
                      <td scope="row">{supply.itemName}</td>
                      <td>{supply.supplierName}</td>
                      <td>{supply.price}</td>
                      <td>{supply.date}</td>
                      <td>{supply.description}</td>
                      <td>
                          <button style={{display:"inline-block"}} className="btn btn-secondary btn-sm">Edit</button>
                          <button style={{display:"inline-block"}} className="btn btn-danger btn-sm">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    );
  }
}
