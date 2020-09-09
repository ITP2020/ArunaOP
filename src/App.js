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



// import components chamath
//import InsertProduct from "./components/stock/form/InsertProduct.component";
// end import



function App() {
  return (
    <Router>
    <div className="App">
      <LeftSideBar />
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

      </div>
      </Router>
      

    
  );
}

export default App;
