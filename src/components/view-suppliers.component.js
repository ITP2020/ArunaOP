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

  exportSuppliers = () => {
    const unit = "pt";
    const size = "A3";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    const title = "Supplies Report ";
    const headers = [["Supplier Name", "Address", "Contact Number", "E-mail"]];

    const suppliesData = this.state.supplies.map((supply) => [
      supply.supplierName,
      supply.address,
      supply.contactNumber,
      supply.email,
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
                <h3>Suppliers</h3>
              </th>
              <td>
                <Link to={"/addSupplier"} className="linkaddE">
                  <button className="btn btn-secondary btn-sm">
                    Add a supplier
                  </button>
                </Link>
                <button
                  className="btn btn-primary"
                  onClick={() => this.exportSuppliers()}
                >
                  Download Report Here
                </button>
              </td>
            </tr>
          </table>

          <CardContent>
            <table
              className="table table-hover"
              style={{ tableLayout: "fixed" }}
            >
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Supplier Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Contact Number</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>supply.supplierName</td>
                  <td>supply.address</td>
                  <td>supply.contactNumber</td>
                  <td>supply.email</td>
                  <td>
                    <button
                      style={{ display: "inline-block" }}
                      className="btn btn-secondary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      style={{ display: "inline-block" }}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {this.state.supplies.map((supply) => {
                  return (
                    <tr>
                      <td>{supply.supplierName}</td>
                      <td>{supply.address}</td>
                      <td>{supply.contactNumber}</td>
                      <td>{supply.email}</td>
                      <td>
                        <button
                          style={{ display: "inline-block" }}
                          className="btn btn-secondary btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          style={{ display: "inline-block" }}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
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
