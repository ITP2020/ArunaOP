import React, { Component } from "react";
import axios from "axios";
import { CardContent } from "@material-ui/core";
import { Card } from "@material-ui/core";
import "../css/home.css";

export default class AddSupplier extends Component {
  constructor(props) {
    super(props);

    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeSupplierName = this.onChangeSupplierName.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      supplierName: "",
      address: "",
      contactNumber: "",
      email: "",
      validAddress: true,
      validSupplierName: true,
      validContact: true,
      validEmail: true,
    };
  }

  onChangeAddress(e) {
    this.setState({
      itemName: e.target.value,
    });
  }

  onChangeSupplierName(e) {
    this.setState({
      supplierName: e.target.value,
    });
  }

  onChangeContact(e) {
    this.setState({
      contactNumber: e.target.value,
    });
    console.log(e.target.value);
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onClickDemo() {
    this.setState({
      supplierName: "Paper",
      address: "No 100,Demo road,Demo,Sri Lanka",
      contactNumber: "0701234567",
      email: "mail@demo.com",
    });
  }

  validateAddress() {
    if (this.state.address == "") {
      this.setState({
        validAddress: false,
      });
    } else {
      this.setState({
        validAddress: true,
      });
    }
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
  }

  validateContact() {
    if (this.state.contactNumber == "") {
      this.setState({
        validContact: false,
      });
    } else {
      this.setState({
        validContact: true,
      });
    }
  }

  validateEmail() {
    if (this.state.email == "") {
      this.setState({
        validEmail: false,
      });
    } else {
      this.setState({
        validEmail: true,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const supplier = {
      address: this.state.address,
      supplierName: this.state.supplierName,
      contactNumber: this.state.contactNumber,
      email: this.state.email,
    };

    console.log(this.state.supplierName);

    this.validateAddress();
    this.validateSupplier();
    this.validateContact();
    this.validateEmail();

    if (this.state.validEmail || this.state.validContact) {
      window.confirm(
        "Are you sure to submit the for without filling all the fields"
      );
    }

    /*axios
        .post("http://localhost:5000/supply/add", supply)
        .then((res) => console.log(res.data));

      window.location = "/supplyView";*/
  }

  render() {
    return (
      <div>
        <Card className="addcard">
          <div className="formdiv">
            <CardContent>
              <h3>Add Supplier</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Supplier name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.supplierName}
                    onChange={this.onChangeSupplierName}
                  />
                  <p className="validateMsg">
                    {this.state.validSupplierName
                      ? ""
                      : "Please fill out this with supplier name"}
                  </p>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                  />
                  <p className="validateMsg">
                    {this.state.validAddress
                      ? ""
                      : "Please fill out this with address"}
                  </p>
                </div>
                <div className="form-group">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.contactNumber}
                    onChange={this.onChangeContact}
                  />
                  <p className="validateMsg">
                    {this.state.validContact
                      ? ""
                      : "Please fill out this with contact number"}
                  </p>
                </div>

                <div className="form-group">
                  <label>E mail</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />
                  <p className="validateMsg">
                    {this.state.validEmail
                      ? ""
                      : "Please fill out this this with e-mail"}
                  </p>
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
