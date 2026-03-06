import React, { useState,useEffect,useContext } from "react";
import axios from "axios";

import { watchlist } from "../data/Data";
import "../index.css";
import GeneralContext from "./GeneralContext";
import {KeyboardArrowDown,KeyboardArrowUp} from '@mui/icons-material'
import { Tooltip, Grow } from "@mui/material";



const WatchList = () => {

    const [holdings, setHoldings] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [loading, setLoading] = useState(true);

  const myHoldings = [
    { name: "BHARTIARTL", qty: 2, avg: 538.05 },
    { name: "HDFCBANK", qty: 2, avg: 1383.4 },
    { name: "HINDUNILVR", qty: 1, avg: 2335.85 },
    { name: "INFY", qty: 116, avg: 726.17 },
    { name: "ITC", qty: 5, avg: 202.0 },
    { name: "KPITTECH", qty: 5, avg: 250.3 },
    { name: "M&M", qty: 2, avg: 809.9 },
    { name: "RELIANCE", qty: 1, avg: 2193.7 },
    { name: "SBIN", qty: 4, avg: 324.35 },
    { name: "SGBMAY29", qty: 2, avg: 4727.0 },
    { name: "TATAPOWER", qty: 5, avg: 104.2 },
    { name: "TCS", qty: 1, avg: 3041.7 },
    { name: "WIPRO", qty: 4, avg: 489.3 },
  ];

     useEffect(() => {
    fetchLivePrices();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchLivePrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLivePrices = async () => {
    try {
      // Extract symbols from holdings
      const symbols = myHoldings.map(h => h.name);

      // POST request with symbols and holdings
      const response = await axios.post('http://localhost:3002/getLivePrices', {
        symbols: symbols,
        holdings: myHoldings
      });

      if (response.data.success) {
        setHoldings(response.data.holdings);
        
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch live prices:', error);
      setLoading(false);
    }
  };

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
        <span className="counts"> {holdings.length}/ 50</span>
      </div>
      <ul className="list">
        {holdings.map((stock, index) => {
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
        <div className="itemInfo ">
          <span className="percent">{stock.day}</span>
          {Number(stock.day.slice(0,-1))<0 ?(<KeyboardArrowDown className="down"></KeyboardArrowDown>):(<KeyboardArrowUp className="up"></KeyboardArrowUp>) }
          <span className="price">{stock.currentValue}</span>
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
