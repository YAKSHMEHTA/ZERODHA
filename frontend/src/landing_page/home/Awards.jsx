import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 p-5">
          <img
            src="/media/largestBroker.svg"
            alt="Largest broker illustration"
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 p-5">
          <div className="mb-3">
            <h2>Largest Broker in India</h2>
            <p className="mb-5 mt-5">
              2+ million Zerodha clients contribute to over 15% of all volumes in
              India by trading and investing in:
            </p>
          </div>

          <div className="row">
            <div className="col-6">
              <ul>
                <li>Futures & Options</li>
                <li>Equities</li>
                <li>Commodities</li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>Currency</li>
                <li>Mutual Funds</li>
                <li>IPO</li>
              </ul>
            </div>
            
          </div>
          <img src="/media/pressLogos.png" alt="" style={{width:"90%"}} />
        </div>
      </div>
    </div>
  );
}

export default Awards;