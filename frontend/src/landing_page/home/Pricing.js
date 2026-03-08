import React from "react";

function Pricing() {
  return (
    <div className="container mt-5">

      <div style={{ height: "10px" }}></div>

      <div className="row mt-5 align-items-center">

        {/* LEFT TEXT */}
        <div className="col-lg-4 col-md-12 mb-4">
          <h1 className="mb-3 fs-2">Unbeatable pricing</h1>

          <p>
            We pioneered the concept of discount broking and price
            transparency in India. Flat fees and no hidden charges.
          </p>

          <a href="/" style={{ textDecoration: "none" }}>
            See Pricing{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>

        {/* SPACER */}
        <div className="col-lg-2 d-none d-lg-block"></div>

        {/* PRICING BOXES */}
        <div className="col-lg-6 col-md-12 mb-5">

          <div className="row text-center">

            <div className="col-md-6 col-12 p-3 border mb-3">
              <h1 className="mb-3">₹0</h1>
              <p>
                Free equity delivery and
                <br />
                direct mutual funds
              </p>
            </div>

            <div className="col-md-6 col-12 p-3 border">
              <h1 className="mb-3">₹20</h1>
              <p>Intraday and F&O</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Pricing;