import React, { useContext } from 'react';
import BurgerButton from '../BurgerButton';
import { LeftSideBarContext } from '../index';
import './style.scss';
import { Menu } from '@material-ui/core';

import Button from '@material-ui/core/Button';
//import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import {Link} from 'react-router-dom';


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
      
      <ul className="LeftSideBar__LeftSection__menuWrapper">
        <li>
        <Button className= "drawer" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Order Management
      </Button>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Add</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>

          </Menu>

          
        </li>


        <li>
        <Button className= "drawer" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Delivery Management
      </Button>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Add</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>

          </Menu>
        </li>
        <li>
        <Button className= "drawer" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Stock Management
      </Button>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Add</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>

          </Menu>
        </li>
        <li>
        <Button className= "drawer" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Equipment Management
      </Button>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Add</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>

          </Menu>
        </li>
        <li>
        <Button className= "drawer" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Supply Management
      </Button>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Add</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>

          </Menu>
        </li>
        <li>
        <Button className= "drawer" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Employee Management
      </Button>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Add</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>

          </Menu>
        </li>
        <li>
        <Button className= "drawer" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Leave & Salary Management
      </Button>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Add</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>

          </Menu>
        </li>
        <li>
        <Button className= "drawer" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Finance Management
      </Button>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
            <MenuItem><a href = "/electricity" className = "homeLink">Electricity Expenses</a></MenuItem>
        <MenuItem><a href = "/water" className = "homeLink">Water Expenses</a></MenuItem>
        <MenuItem><a href = "/transaction" className = "homeLink">Money Transactions</a></MenuItem>

          </Menu>
        </li>
      </ul>
      
      <button className = "logout">Log Out</button>
    </div>
    </center>
  );
};

export default LeftSection;