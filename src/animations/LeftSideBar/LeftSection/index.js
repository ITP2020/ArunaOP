import React, { useContext } from 'react';
import BurgerButton from '../BurgerButton';
import { LeftSideBarContext } from '../index';
import './style.scss';
import Menu from '@material-ui/core/Menu'

import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, MenuItem, DropdownButton } from "react-bootstrap";


import Button from '@material-ui/core/Button';
//import MenuItem from '@material-ui/core/MenuItem';



const LeftSection = () => {
  const { isShowSidebar, setIsShowSidebar } = useContext(LeftSideBarContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const elec = (event) => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  return (
    <center>
    <div className={`LeftSideBar__LeftSection LeftSideBar__LeftSection--${isShowSidebar ? 'show' : 'hide'}`}>
      <div className="LeftSideBar__LeftSection__topWrapper">
        <BurgerButton
          onClick={() => setIsShowSidebar(false)}
        />

        
      </div>

      
      
      

      <Dropdown>
  <Dropdown.Toggle variant="danger" className = "menulist">
    Order Management
  </Dropdown.Toggle>

  <Dropdown.Menu className = "ditem">
    <Dropdown.Item href="/order"  >Order Details</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Customer Details</Dropdown.Item>
    
  </Dropdown.Menu>
</Dropdown>

<Dropdown>
  <Dropdown.Toggle variant="danger" className = "menulist">
    Delivery Management
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/Deliveries">Delivery Queue</Dropdown.Item>
    <Dropdown.Item href="/Upcoming">Upcoming Deliveries</Dropdown.Item>
    <Dropdown.Item href="/Ongoing">Ongoing Deliveries</Dropdown.Item>
    <Dropdown.Item href="/Completed">Completed Deliveries</Dropdown.Item>
    <Dropdown.Item href="/AssignDriver">Assign Driver</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

<Dropdown>
  <Dropdown.Toggle variant="danger" className = "menulist">
    Vehicle Management
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="VehicleManagement">Vehicle Management</Dropdown.Item>
    <Dropdown.Item href="InsertVehicle">Insert Vehicle</Dropdown.Item>
    <Dropdown.Item href="UpdateVehicle">Update Vehicle</Dropdown.Item>
    <Dropdown.Item href="/VehicleRepair">Vehicle Repair</Dropdown.Item>
    <Dropdown.Item href="/VehicleDelete">Delete Vehicle</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

<Dropdown>
  <Dropdown.Toggle variant="danger" className = "menulist">
    Stock Management
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

<Dropdown>
  <Dropdown.Toggle variant="danger" className = "menulist">
    Equipment Management
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/user">Add User</Dropdown.Item>
    <Dropdown.Item href="/equipment">Equipment Details</Dropdown.Item>
    <Dropdown.Item href="/create">Add Equipments</Dropdown.Item>
    <Dropdown.Item href="/replist">Repair Details</Dropdown.Item>
    <Dropdown.Item href="/repair">Add Repair</Dropdown.Item>
    <Dropdown.Item href="/report">Generate Report</Dropdown.Item>
    
  </Dropdown.Menu>
</Dropdown>

<Dropdown>
  <Dropdown.Toggle variant="danger" className = "menulist">
    Supply Management
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

<Dropdown>
  <Dropdown.Toggle variant="danger" className = "menulist">
    Employee Management
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/createEmployee">New Employee</Dropdown.Item>
    <Dropdown.Item href="/employee">Employee Details</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

<Dropdown>
  <Dropdown.Toggle variant="danger" className = "menulist">
    Leave & Salary Management
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/leaves">Leave Management</Dropdown.Item>
    <Dropdown.Item href="/salary">Salary Management</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

      
      <Dropdown>
  <Dropdown.Toggle variant="danger" className = "menulist">
    Finance Management
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/electricity">Electricity Expenses</Dropdown.Item>
    <Dropdown.Item href="/water">Water Expenses</Dropdown.Item>
    <Dropdown.Item href="/transaction">Money Transactions</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
        
      
      


      

      <button className = "logout">Log Out</button>
      
    </div>
    </center>
  );
};

export default LeftSection;