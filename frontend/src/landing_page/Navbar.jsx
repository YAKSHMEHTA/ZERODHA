import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav-parent w-full p-3" style={{ backgroundColor: "#fff" }}>
      <div className="container p-2 flex ">
        <Link className="navbar-brand" to="/login">
          <img src="/media/logo.svg" style={{ width: "25%",height:"" }} alt="yaksh" />
        </Link>
        <div className="navright">
          <Link className="nav-link" to="/product">Product</Link>
          <Link className="nav-link" to="pricing">Pricing</Link>
          <Link className="nav-link" to="support">Support</Link>
          <Link className="nav-link" to="about">About</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
