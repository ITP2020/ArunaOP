import React, { Component } from "react";
import axios from "axios";
import { CardContent } from "@material-ui/core";
import { Card } from "@material-ui/core";
import "../css/home.css";

export default class EditSupplier extends Component {
  constructor(props) {
    super(props);

    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeSupplierName = this.onChangeSupplierName.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: "",
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

  componentDidMount() {
    if (!this.props.location.data) {
      window.location = "/viewSuppliers";
    } else {
      axios
        .get("http://localhost:5000/supplier/" + this.props.location.data)
        .then((res) => {
          this.setState({
            id: res.data._id,
            supplierName: res.data.supplierName,
            address: res.data.address,
            contactNumber: res.data.contactNumber,
            email: res.data.email,
          });
        });
    }
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

  onClickDelete(e) {
    e.preventDefault();

    window.confirm("Are you sure to delete this record");
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

    if (this.state.validEmail == true || !this.state.validContact == true) {
      axios
        .post(
          "http://localhost:5000/supplier/update/" + this.state.id,
          supplier
        )
        .then(
          (res) => console.log(res.data),
          (window.location = "/viewSuppliers")
        );
    }
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

                <div
                  style={{
                    display: "block",
                    margin: "0px auto",
                    width: "fit-content",
                  }}
                  className="Row"
                >
                  <button
                    style={{
                      display: "inline-block",
                      margin: "10px"
                    }}
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onSubmit}
                  >
                    Submit
                  </button>
                </div>
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
