import React, { useContext } from 'react';
import BurgerButton from '../BurgerButton';
import { LeftSideBarContext } from '../index';
import './style.scss';
import Menu from '@material-ui/core/Menu'



import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';


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

      
  
      <button className = "menulist"><Link to = {"/ordermanagement" }>
        ORDER MANAGEMENT</Link>
      
      </button>

      <button className = "menulist"><Link to = {"/financemanagement" }>
        DELIVERY MANAGEMENT</Link>
      
      </button>

      <button className = "menulist"><Link to = {"/financemanagement" }>
        STOCK MANAGEMENT</Link>
      
      </button>

      <button className = "menulist"><Link to = {"/financemanagement" }>
        EQUIPMENT MANAGEMENT</Link>
      
      </button>

      <button className = "menulist"><Link to = {"/financemanagement" }>
        SUPPLY MANAGEMENT</Link>
      
      </button>

      <button className = "menulist"><Link to = {"/employeemanagement" }>
        EMPLOYEE MANAGEMENT</Link>
      
      </button>

      <button className = "menulist"><Link to = {"/leavemanagement" }>
        LEAVE & SALARY MANAGEMENT</Link>
      
      </button>

      <button className = "menulist"><Link to = {"/financemanagement" }>FINANCE MANAGEMENT</Link>
        
      
      </button>


      

      <button className = "logout">Log Out</button>
    </div>
    </center>
  );
};

export default LeftSection;