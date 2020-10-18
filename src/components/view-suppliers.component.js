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
    this.onChangeSearch = this.onChangeSearch.bind(this);

    this.state = { suppliers: [], search: "" };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/supplier/")
      .then((response) => {
        this.setState({ suppliers: response.data });
        console.log(this.state.supplies);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeSearch(e) {
    this.setState({
      search: e.target.value,
    });
  }

  deleteSupply(id) {
    axios
      .delete("http://localhost:5000/supplies/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      supplies: this.state.suppliers.filter((el) => el._id !== id),
    });
  }

  supplierRender() {
    return this.state.suppliers.map((supplier) => {
      return (
        <tr>
          <td>{supplier.supplierName}</td>
          <td>{supplier.address}</td>
          <td>{supplier.contactNumber}</td>
          <td>{supplier.email}</td>
          <td>
            <Link to={{ pathname: "/editSupplier", data: supplier._id }}>
              <button className="btn btn-secondary">Edit</button>
            </Link>{" "}
            |{" "}
            <button
              className="btn btn-danger"
              onClick={() => {
                axios
                  .delete("http://localhost:5000/supplier/" + supplier._id)
                  .then(() => {
                    alert("Delete Success");
                    //Get data again after delete
                    axios
                      .get("http://localhost:5000/supplier/")
                      .then((res) => {
                        console.log(res.data);
                        this.setState({
                          suppliers: res.data,
                        });
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => {
                    alert(err);
                  });
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  searchSupplierRender() {
    return this.state.suppliers.map((supplier)=>{
      if(supplier.supplierName.toLowerCase().includes(this.state.search.toLowerCase())) {
        return (
          <tr>
            <td>{supplier.supplierName}</td>
            <td>{supplier.address}</td>
            <td>{supplier.contactNumber}</td>
            <td>{supplier.email}</td>
            <td>
              <Link to={{ pathname: "/editSupplier", data: supplier._id }}>
                <button className="btn btn-secondary">Edit</button>
              </Link>{" "}
              |{" "}
              <button
                className="btn btn-danger"
                onClick={() => {
                  axios
                    .delete("http://localhost:5000/supplier/" + supplier._id)
                    .then(() => {
                      alert("Delete Success");
                      //Get data again after delete
                      axios
                        .get("http://localhost:5000/supplier/")
                        .then((res) => {
                          console.log(res.data);
                          this.setState({
                            suppliers: res.data,
                          });
                        })
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => {
                      alert(err);
                    });
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      }
    })
  }

  exportSuppliers = () => {
    const unit = "pt";
    const size = "A3";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    const title = "Supplies Report ";
    const headers = [["Supplier Name", "Address", "Contact Number", "E-mail"]];

    const suppliesData = this.state.suppliers.map((supply) => [
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
          <div className="form-group col-md-4">
            <input
              type="text"
              required
              placeholder="Search by supplier name"
              aria-label="Search"
              className="form-control "
              value={this.state.search}
              onChange={this.onChangeSearch}
            ></input>
          </div>
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
                {this.state.search == "" ? this.supplierRender(): this.searchSupplierRender()}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    );
  }
}
