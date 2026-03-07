import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav-parent w-full p-3" style={{ backgroundColor: "#fff" }}>
      <div className="container p-2 flex ">
        <Link className="navbar-brand bg-red-600 " to="/login">
          <img src="/media/logo.svg" style={{ width: "25%",height:"" }} alt="yaksh" />
        </Link>
        <div className="navright">
          <Link className="" to="/product">Product</Link>
          <Link to="pricing">Pricing</Link>
          <Link to="support">Support</Link>
          <Link to="about">About</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
