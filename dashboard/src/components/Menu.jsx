import React,{useState} from "react";
import {Link} from 'react-router-dom'

const Menu = () => {

  const [selectedMenu,setSelectedMenu] = useState(0);
  const [profileOpen,setProfileOpen] = useState(false);

  function HandleMenuClick (index){
    setSelectedMenu(index)
  }
  function HandleProfileOpen (index){
    setProfileOpen(!profileOpen)
  }

  const menuClass = "menu"
  const activeMenuClass = "menu selected"

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <Link to="/" style={{textDecoration:"none"}}>
          <li onClick={() => HandleMenuClick(0)}>
            <p className={selectedMenu === 0 ? activeMenuClass:menuClass}>Dashboard</p>
          </li>
          </Link>
          <Link to="/orders" style={{textDecoration:"none"}}>
          <li onClick={() => HandleMenuClick(1)}>
            <p className={selectedMenu === 1 ? activeMenuClass:menuClass}>Orders</p>
          </li>
          </Link>
          <Link to="/holdings" style={{textDecoration:"none"}}>
          <li onClick={() => HandleMenuClick(2)}>
            <p className={selectedMenu === 2 ? activeMenuClass:menuClass}>Holdings</p>
          </li>
          </Link>
          <Link to="/positions" style={{textDecoration:"none"}}>
          <li onClick={() => HandleMenuClick(3)}>
            <p className={selectedMenu === 3 ? activeMenuClass:menuClass}>Positions</p>
          </li>
          </Link>
          <Link to="/funds" style={{textDecoration:"none"}}>
          <li onClick={() => HandleMenuClick(4)}>
            <p className={selectedMenu === 4 ? activeMenuClass:menuClass}>Funds</p>
          </li>
          </Link>
          <Link to="/apps" style={{textDecoration:"none"}}>
          <li onClick={() => HandleMenuClick(5)}>
            <p className={selectedMenu === 5 ? activeMenuClass:menuClass}>Apps</p>
          </li>
          </Link>
        </ul>
        <hr />
        <div className="profile" onClick={HandleProfileOpen} >
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;