import React, { Component } from "react";
import axios from "axios";
import { CardContent } from "@material-ui/core";
import { Card } from "@material-ui/core";
import "../css/home.css";

export default class AddSupply extends Component {
  constructor(props) {
    super(props);

    this.onChangeItemName = this.onChangeItemName.bind(this);
    this.onChangeSupplierName = this.onChangeSupplierName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);

    this.state = {
      itemName: "",
      supplierName: "",
      date: "",
      price: "",
      quantity: "",
      description: "",
      validItemName: true,
      validSupplierName: true,
      validDate: true,
      validPrice: true,
      validQuantity: true,
      validDescrption: true,
    };
  }

  onChangeItemName(e) {
    this.setState({
      itemName: e.target.value,
    });
  }

  onChangeSupplierName(e) {
    this.setState({
      supplierName: e.target.value,
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
    console.log(e.target.value);
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onClickDemo() {
    this.setState({
      itemName: "Paper",
      supplierName: "Supplier",
      date: "2020-01-01",
      quantity: "3 bundles",
      price: "1000.00",
      description: "paper resupply",
    });
  }

  validateItemName() {
    if (this.state.itemName == "") {
      this.setState({
        validItemName: false,
      });
    } else {
      this.setState({
        validItemName: true,
      });
    }
    console.log(this.state.validItemName)
  }

  validateSupplier() {
    if (this.state.supplierName == "") {
      this.setState({
        validSupplierName: false,
      });
    } else {
      this.setState({
        validSupplierName: true,
      });
    }
    console.log(this.state.validSupplierName)
  }

  validateQuantity() {
    if (this.state.quantity == "") {
      this.setState({
        validQuantity: false,
      });
    } else {
      this.setState({
        validQuantity: true,
      });
    }
    console.log(this.state.validItemName)
  }

  validatePrice() {
    if (this.state.price == "") {
      this.setState({
        validPrice: false,
      });
    } else {
      this.setState({
        validPrice: true,
      });
    }
    console.log(this.state.validPrice)
  }

  validateDate() {
    if (this.state.supplierName == "") {
      this.setState({
        validSupplierName: false,
      });
    } else {
      this.setState({
        validSupplierName: true,
      });
    }
    console.log(this.state.validDate)
  }

  onAddNewSupplier() {
    window.location = "./addSupplier";
  }

  onSubmit(e) {
    e.preventDefault();

    const supply = {
      itemName: this.state.itemName,
      supplierName: this.state.supplierName,
      date: this.state.date,
      price: this.state.price,
      quantity: this.state.quantity,
      description: this.state.description,
    };

    this.validateItemName();
    this.validateSupplier();
    this.validatePrice();
    this.validateQuantity();
    this.validateDate();

    if (this.state.validPrice == true && this.state.validDate == true && this.state.validDescrption == true && this.state.validItemName == true && this.state.validSupplierName == true) {
      axios
        .post('http://localhost:5000/supply/add', supply)
        .then((res) => {
          alert("Insert Success");
          window.location = "/viewSupply";
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert("hello");
      console.log(this.state.validDate,this.state.validItemName);
    }
  }

  render() {
    return (
      <div>
        <Card className="addcard">
          <div className="formdiv">
            <CardContent>
              <h3>Add Supply</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Item name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.itemName}
                    onChange={this.onChangeItemName}
                  />
                  <p className="validateMsg">
                    {this.state.validItemName
                      ? ""
                      : "Please fill out this with item name"}
                  </p>
                </div>
                <div className="form-group">
                  <label>Supplier Name</label>
                  <div className="form-row">
                    <select
                      class="form-control form-control-lg col-md-6"
                      value={this.state.supplierName}
                      onChange={this.onChangeSupplierName}
                    >
                      <option value=""></option>
                      <option value="hello">Hello</option>
                      <option value="Supplier">Supplier</option>
                      <option value="1">1</option>
                    </select>
                    <button
                      className="btn btn-primary"
                      onClick={this.onAddNewSupplier}
                    >
                      Add a new supplier
                    </button>
                  </div>
                  <p className="validateMsg">
                    {this.state.validSupplierName
                      ? ""
                      : "Please fill out this with supplier name"}
                  </p>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    value={this.state.date}
                    onChange={this.onChangeDate}
                  />
                  <p className="validateMsg">
                    {this.state.validSupplierName
                      ? ""
                      : "Please put a date in this"}
                  </p>
                </div>

                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.quantity}
                    onChange={this.onChangeQuantity}
                  />
                  <p className="validateMsg">
                    {this.state.validQuantity
                      ? ""
                      : "Please fill out this this with supplier name"}
                  </p>
                </div>

                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                  />
                  <p className="validateMsg">
                    {this.state.validPrice
                      ? ""
                      : "Please fill out this this with supplier name"}
                  </p>
                </div>

                <div className="form-group">
                  <label>Description: </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                  />
                  <p className="validateMsg">{this.state.descriptionError}</p>
                </div>

                <button
                  style={{ display: "block", margin: "0px auto" }}
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onSubmit}
                >
                  Submit
                </button>
              </form>

              <div className="form-group">
                <button
                  style={{ display: "block", margin: "20px auto" }}
                  className="btn btn-secondary"
                  onClick={() => this.onClickDemo()}
                >
                  Demo
                </button>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
}
