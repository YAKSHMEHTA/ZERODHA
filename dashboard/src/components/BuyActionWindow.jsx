import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";



const BuyActionWindow = ({ uid,price }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  
  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = async() => {
    await axios.post("http://localhost:3002/Orders/buy", {
      name: uid,
      qty: stockQuantity,
      price: price,
      mode: "BUY",
    });
    await axios.post("http://localhost:3002/add",{
      withCredentials: true,
      name:uid,
      qty:stockQuantity,
      price:price,
      mode: "BUY",
    },
    {withCredentials: true,}
  )
    closeBuyWindow();
  };
  
  const handelSellClick = async() => {
    await axios.post("http://localhost:3002/Orders/sell", {
      name: uid,
      qty: stockQuantity,
      price: price,
      mode: "SELL",
    })
    closeBuyWindow();
  }
  
  const handleCancelClick = () => {
    closeBuyWindow();
  }

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              onChange={(e) => setStockPrice(Number(e.target.value))}
              value={price}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" to="/holdings" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link className="btn btn-red" onClick={handelSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;