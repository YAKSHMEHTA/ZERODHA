import React, { useState } from "react";
import {watchlist} from "../data/Data";
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
      {watchlist.map((stock, index) => {
        <WatchListItem stock={stock} key={index} />
      })}
      <ul className="list"></ul>
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
        <p className={stock.isDown ? "down":"up"}>{stock.name}</p>
        <div className="itemInfo">
          
        </div>
      </div>
    </li>
  );
};
