import React from 'react';
import BurgerMenu from './animations/BurgerMenu';
import LeftSideBar from './animations/LeftSideBar';
import './App.css';

import {BrowserRouter as Router, Route} from "react-router-dom";

import Home from "./components/home.component";



// import components chamath
//import InsertProduct from "./components/stock/form/InsertProduct.component";
// end import



function App() {
  return (
    <div className="App">
      <LeftSideBar />
      <Home/>
      

      {/* Routes
      @author chamath */}

      <Router>
        
      </Router>
      {/* end chamath */}

    </div>
  );
}

export default App;
