import React, { useState, useEffect } from "react";
import axios from "axios";
import { Vgraph } from "./Vgraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  console.log("app");
  useEffect(() => {
    console.log("req se");
    axios.get("https://zerodha-3-rhrz.onrender.com/allHoldings",{ withCredentials: true}).then((res) => {
      console.log("data coming");
      setAllHoldings(res.data);
    });
  }, []);

  const labels = allHoldings.map((subArray) => ( subArray["name"] ))

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Nmae",
        data: allHoldings.map((stock) =>stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ]
  }

  // const data = {
  //   labels,
  //   datasets: [ 
  //     {
  //       label: "Dataset 1",
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //     {
  //       label: "Dataset 2",
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //     },
  //   ],
  // };


  return (
    <>
      <h3 className="title">Holdings {allHoldings.length}</h3>

      <div className="order-table">
        <table>
          <tbody>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </tbody>
          {allHoldings.map((stock, index) => {
            const currValue = stock.price * stock.qty;
            const isProfit = currValue - stock.avg * stock.qty >= 0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index} className="">
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{currValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(currValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <Vgraph data={data}></Vgraph>
    </>
  );
};

export default Holdings;
