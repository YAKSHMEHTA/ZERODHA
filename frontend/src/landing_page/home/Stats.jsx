import React from "react";

function Stats() {
  return (
    <div className="container mb-5">
      <div className="row p-5 pb-0">
        <div className="col-6 p-5 ">
          <h3 className="mb-5">Trust with confidence</h3>
          <h4>Customer-first always</h4>
          <p>
            That's why 1.6+ crore customers trust Zerodha with ~ ₹6 <br></br>{" "}
            lakh crores of equity investments, making us India’s<br></br>{" "}
            largest broker; contributing to 15% of daily retail<br></br>{" "}
            exchange volumes in India.
          </p>
          <h3 className="mt-5">No spam or gimmicks</h3>
          <p>
            No gimmicks, spam, "gamification", or annoying push<br></br>{" "}
            notifications. High quality apps that you use at your <br></br>{" "}
            pace, the way you like. Our philosophies.
          </p>
          <h3 className="mt-5">The Zerodha universe</h3>
          <p>
            Not just an app, but a whole ecosystem. Our investments <br></br> in
            30+ fintech startups offer you tailored services <br></br>specific
            to your needs.
          </p>
          <h3 className="mt-5">Do better with money</h3>
          <p>
            With initiatives like Nudge and Kill Switch, we don't just<br></br>{" "}
            facilitate transactions, but actively help you do better<br></br>{" "}
            with your money.
          </p>
        </div>
        <div className="col-6">
          <img
            src="/media/ecosystem.png"
            className="mt-5"
            style={{ height: "75%", width: "100%" }}
            alt=""
          />
          <div className="col  p-5">
            <a style={{textDecoration: "none"}} className="p-5" href="">
              Explore our products <i class="fa-solid fa-arrow-right"></i>
            </a>
            <a href="" style={{textDecoration: "none"}}>
              Try Kite demo <i class="fa-solid fa-arrow-right"></i>
            </a>
            
          </div>
        </div>
      </div>
      <div style={{height:"10px"}}></div>
      <div className="row mt-0">
        <div className="col-2"></div>
        <div className="col-8"><img src="/media/pressLogos.png" style={{width:"90%"}} alt="" /></div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default Stats;
