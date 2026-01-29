import React, { useState,useContext } from "react";
import { watchlist } from "../data/Data";
import "../index.css";
import GeneralContext from "./GeneralContext";
import axios from "axios";
import {KeyboardArrowDown,KeyboardArrowUp} from '@mui/icons-material'
import { Tooltip, Grow } from "@mui/material";



const WatchList = () => {



  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length}/ 50</span>
      </div>
      <ul className="list">
        {watchlist.map((stock, index) => {
        return (<WatchListItem stock={stock} key={index} />);
      })}
      </ul>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, index }) => {
  const [show, setShow] = useState(false);
  const handelMouseEnter = (e) => {
    setShow(true);
  };
  const handelMouseleave = (e) => {
    setShow(false);
  };

  return (
    <li onMouseEnter={handelMouseEnter} onMouseLeave={handelMouseleave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ?(<KeyboardArrowDown className="down"></KeyboardArrowDown>):(<KeyboardArrowUp className="up"></KeyboardArrowUp>) }
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {show&&<WatchListAction uid={stock.name} />}
    </li>
  );
};

const WatchListAction = ({uid}) =>{
  const generalContext = useContext(GeneralContext);
  const handelClick = ()=>{
    generalContext.openBuyWindow(uid)
  }

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handelClick}
        >
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handelClick}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
          </button>
        </Tooltip>
      </span>
    </span>
  );

}
