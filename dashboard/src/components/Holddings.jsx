// React Component
import { useState, useEffect } from "react";
import axios from "axios";

function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  // Your holdings data
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

  // useEffect(() => {
  //   fetchLivePrices();

  //   // Auto-refresh every 30 seconds
  //   const interval = setInterval(fetchLivePrices, 30000);
  //   return () => clearInterval(interval);
  // }, []);
 
  const fetchPortfolio = async () => {
    const data = axios.get("http://localhost:3002/holdings",
      {withCredentials: true},
    );
    console.log("called")
    console.log(data)
  };
   fetchPortfolio()

  if (loading) return <div>Loading live prices...</div>;

  return (
    // <div className="holdings-container">
    //   <div className="header">
    //     <h2>Holdings ({holdings.length})</h2>
    //     {/* <button onClick={fetchLivePrices}>Refresh</button> */}
    //   </div>

    //   <div className="summary">
    //     <div>
    //       Investment: ₹
    //       {parseFloat(summary.totalInvested).toLocaleString("en-IN")}
    //     </div>
    //     <div>
    //       Current: ₹{parseFloat(summary.totalCurrent).toLocaleString("en-IN")}
    //     </div>
    //     <div className={parseFloat(summary.totalPnL) >= 0 ? "profit" : "loss"}>
    //       P&L: ₹{parseFloat(summary.totalPnL).toLocaleString("en-IN")} (
    //       {summary.totalPnLPercent}%)
    //     </div>
    //   </div>

    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Instrument</th>
    //         <th>Qty</th>
    //         <th>Avg</th>
    //         <th>LTP</th>
    //         <th>Cur Val</th>
    //         <th>P&L</th>
    //         <th>Net %</th>
    //         <th>Day %</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {holdings.map((h, i) => (
    //         <tr key={i}>
    //           {console.log(h.name)}
    //           <td>{h.name}</td>
    //           <td>{h.qty}</td>
    //           {/* <td>₹{h.avg.toFixed(2)}</td>
    //           <td>₹{h.ltp.toFixed(2)}</td> */}
    //           <td>₹{parseFloat(h.currentValue).toLocaleString("en-IN")}</td>
    //           <td className={h.isLoss ? "loss" : "profit"}>₹{h.pnl}</td>
    //           <td className={h.isLoss ? "loss" : "profit"}>{h.net}</td>
    //           <td className={h.dayChange >= 0 ? "profit" : "loss"}>{h.day}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <></>
  );
}

export default Holdings;
