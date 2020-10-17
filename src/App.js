import React from 'react';
import LeftSideBar from './animations/LeftSideBar';
//import './App.css';

import {BrowserRouter as Router, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/home.component";


import ElectricityExpensesList from "./components/electricity-list.component";
import EditElectricity from "./components/edit-electricity.component";
import CreateElectricity from "./components/create-electricity.component";
import WaterExpensesList from "./components/water-list.component";
import EditWater from "./components/edit-water.component";
import CreateWater from "./components/create-water.component";
import CreateTransaction from "./components/create-transaction.component";
import EditTransaction from "./components/edit-transaction.component";
import TransactionExpensesList from "./components/transaction-list.component";

import LeaveList from "./components/leave-list.component";
import EditLeave from "./components/edit-leave.component";
import CreateLeave from "./components/create-leave.component";

import CreateSalary from "./components/create-salary.component";
import SalaryList from "./components/salary-list.component";
import EditSalary from './components/edit-salary.component';

import EmployeeList from "./components/employee-list.component";
import EditEmployee from "./components/edit-employee.component";
import CreateEmployee from "./components/add-employee.component";

import OrderList from "./components/order-list.component";
import EditOrder from "./components/edit-order.component";
import CreateOrder from "./components/create-order.component";



import FinanceManagement from "./components/finance-management.component";
import LeaveManagement from "./components/leave-management.component";
import EmployeeManagement from "./components/employee-management.component";
import OrderManagement from "./components/order-management.component";

//Delivery Management
import DeliveryQueueTable from "./components/DeliveryQueueTable.component";
import UpcomingDeliveriesTable from "./components/UpcomingDeliveriesTable.component";
import CompletedDeliveriesTable from "./components/CompletedDeliveriesTable.component";
import OngoingDeliveryTable from "./components/OngoingDeliveryTable.component";
import AssignDriverForm from "./components/AssignDriverForm.component";

//Vehicle Management
import InsertVehicleForm from "./components/InsertVehicleForm.component"
import UpdateVehicleForm from "./components/UpdateVehicleForm.component"
import VehicleManagementTable from "./components/VehicleManagementTable.component";
import RepairVehicleForm from "./components/VehicleRepairForm.component";
import VehicleDeleteForm from "./components/VehicleDeleteForm.component";

import EquipmentList from "./components/equipment-list.component";
import EditEquipment from "./components/edit-equipment.component";
import CreateEquipment from "./components/create-equipment.component";
import Createuser from "./components/create-user.component";
import CreateRepair from './components/create-repair.component';
import RepairList from './components/repair-list.component';
import EditRepair from './components/edit-repair.component';
//import LeftSideBar from './animations/LeftSideBar';
import Reports from './components/reports.component';

//Supply Management
import AddSupply from './components/add-supply.component'
import EditSupply from './components/edit-supply.component'
import ViewSupply from './components/view-supplies.component'
import ViewSuppliers from './components/view-suppliers.component'
import AddSupplier from './components/add-supplier.component'
import EditSupplier from './components/edit-supplier.component'

function App() {
  return (
    <Router>
    <div className="App">

      
    <LeftSideBar/>
      <Home/>

      <Route path = "/electricity" exact component = {ElectricityExpensesList}/>
      <Route path = "/editelectricity/:id" component = {EditElectricity}/>
      <Route path = "/createelectricity" component = {CreateElectricity}/>

      <Route path = "/water" exact component = {WaterExpensesList}/>
      <Route path = "/editwater/:id" component = {EditWater}/>
      <Route path = "/createwater" component = {CreateWater}/>

      <Route path = "/transaction" exact component = {TransactionExpensesList}/>
      <Route path = "/edittransaction/:id" component = {EditTransaction}/>
      <Route path = "/createtransaction" component = {CreateTransaction}/>

      <Route path="/leaves" exact component={LeaveList} />
      <Route path="/edit/:id" component={EditLeave} />
      <Route path="/createLeave" component={CreateLeave} />
    
      <Route path="/createSalary" component={CreateSalary} />
      <Route path="/salary"exact component={SalaryList} />
      <Route path="/update/:id" component={EditSalary} />

      <Route path = "/employee" exact component = {EmployeeList}/>
      <Route path = "/editemployee/:id" component = {EditEmployee}/>
      <Route path = "/createEmployee" component = {CreateEmployee}/>

      <Route path = "/order" exact component = {OrderList}/>
      <Route path = "/editorder/:id" component = {EditOrder}/>
      <Route path = "/createorder" component = {CreateOrder}/>

      <Route path = "/financemanagement" component = {FinanceManagement}/>
      <Route path = "/leavemanagement" component = {LeaveManagement}/>
      <Route path = "/employeemanagement" component = {EmployeeManagement}/>
      <Route path = "/ordermanagement" component = {OrderManagement}/>

      
      <Route path="/Deliveries" exact component={DeliveryQueueTable} />
      <Route path="/Upcoming" exact component={UpcomingDeliveriesTable} />
      <Route path="/Completed" exact component={CompletedDeliveriesTable} />
      <Route path="/Ongoing" exact component={OngoingDeliveryTable} />
      <Route path="/AssignDriver" exact component={AssignDriverForm} />


      <Route path="/InsertVehicle"  component={InsertVehicleForm} />
      <Route path="/UpdateVehicle/:id"  component={UpdateVehicleForm} />
      <Route path="/VehicleManagement" exact component={VehicleManagementTable} />
      <Route path="/VehicleRepair" exact component={RepairVehicleForm} />
      <Route path="/VehicleDelete" exact component={VehicleDeleteForm} />


      <Route path="/equipment" exact component ={EquipmentList}/>
    <Route path="/editEquipment/:id" component ={EditEquipment}/>
    <Route path="/repedit/:id" component={EditRepair}/>
    <Route path="/createEquipment" component={CreateEquipment}/>
    <Route path="/user" component={Createuser}/>
    <Route path="/repair" component={CreateRepair}/>
    <Route path="/replist" component={RepairList}/>
    <Route path="/report" component={Reports}/>

    <Route path="/addSupply" component={AddSupply}/>
    <Route path="/editSupply" component={EditSupply}/>
    <Route path="/viewSupply" component={ViewSupply}/>
    <Route path="/addSupplier" component={AddSupplier}/>
    <Route path="/editSupplier" component={EditSupplier}/>
    <Route path="/viewSuppliers" component={ViewSuppliers}/>

      </div>
      </Router>
      

    
  );
}

export default App;
