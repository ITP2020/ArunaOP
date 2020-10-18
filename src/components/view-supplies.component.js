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

    this.state = {
      supplies: [],
      search: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/supply/")
      .then((response) => {
        this.setState({ supplies: response.data });
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

  supplyRender() {
    return this.state.supplies.map((supply) => {
      return (
        <tr>
          <td>{supply.itemName}</td>
          <td>{supply.supplierName}</td>
          <td>{supply.price}</td>
          <td>{supply.date}</td>
          <td>{supply.description}</td>
          <td>
            <Link to={{ pathname: "/editSupply", data: supply._id }}>
              <button className="btn btn-secondary">Edit</button>
            </Link>{" "}
            |{" "}
            <button
              className="btn btn-danger"
              onClick={() => {
                axios
                  .delete("http://localhost:5000/supply/" + supply._id)
                  .then(() => {
                    alert("Delete Success");
                    //Get data again after delete
                    axios
                      .get("http://localhost:5000/supply")
                      .then((res) => {
                        console.log(res.data);
                        this.setState({
                          supplies: res.data,
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

  searchSupplyRender() {
    return this.state.supplies.map((supply) => {
      if (
        supply.itemName.toLowerCase().includes(this.state.search.toLowerCase())
      ) {
        return (
          <tr>
            <td>{supply.itemName}</td>
            <td>{supply.supplierName}</td>
            <td>{supply.price}</td>
            <td>{supply.date}</td>
            <td>{supply.description}</td>
            <td>
              <Link to={{ pathname: "/editSupply", data: supply._id }}>
                <button className="btn btn-secondary">Edit</button>
              </Link>{" "}
              |{" "}
              <button
                className="btn btn-danger"
                onClick={() => {
                  axios
                    .delete("http://localhost:5000/supply/" + supply._id)
                    .then(() => {
                      alert("Delete Success");
                      //Get data again after delete
                      axios
                        .get("http://localhost:5000/supply")
                        .then((res) => {
                          console.log(res.data);
                          this.setState({
                            supplies: res.data,
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
          <div className="form-group col-md-4">
            <input
              type="text"
              required
              placeholder="Search by item name"
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
                  <th scope="col">Item Name</th>
                  <th scope="col">Supplier Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.search == ""
                  ? this.supplyRender()
                  : this.searchSupplyRender()}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    );
  }
}
