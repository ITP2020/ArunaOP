import React, { useContext } from 'react';
import BurgerButton  from '../BurgerButton';
import { LeftSideBarContext } from '../index';
import './style.scss';


const TopSection = () => {
  const { setIsShowSidebar } = useContext(LeftSideBarContext);
  return (
    <div className="LeftSideBar__TopSection">
      <BurgerButton
        onClick={() => setIsShowSidebar(true)}
      />
      <h2 className = "company">Aruna Offset Printers</h2>
      
    </div>
  );
};

export default TopSection;