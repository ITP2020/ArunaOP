import React, { useContext } from 'react';
import BurgerButton from '../BurgerButton';
import { LeftSideBarContext } from '../index';
import './style.scss';

const LeftSection = () => {
  const { isShowSidebar, setIsShowSidebar } = useContext(LeftSideBarContext);
  return (
    <div className={`LeftSideBar__LeftSection LeftSideBar__LeftSection--${isShowSidebar ? 'show' : 'hide'}`}>
      <div className="LeftSideBar__LeftSection__topWrapper">
        <BurgerButton
          onClick={() => setIsShowSidebar(false)}
        />
      </div>
      <ul className="LeftSideBar__LeftSection__menuWrapper">
        <li>
          <a
            href="#"
          >
            Order Management
          </a>
        </li>
        <li>
          <a
            href="#"
          >
            Equipment Management
          </a>
        </li>
        <li>
         <a
            href="#"
          >
            Delivery Management
          </a>
        </li>
        <li>
         <a
            href="#"
          >
            Stock Management
          </a>
        </li>
        <li>
         <a
            href="#"
          >
            Supply Management
          </a>
        </li>
        <li>
         <a
            href="#"
          >
            Employee Management
          </a>
        </li>
        <li>
         <a
            href="#"
          >
            Salary and Leave Management
          </a>
        </li>
        <li>
         <a
            href="#"
          >
            Finance Management
          </a>
        </li>
      </ul>
      <button>Log Out</button>
    </div>
  );
};

export default LeftSection;