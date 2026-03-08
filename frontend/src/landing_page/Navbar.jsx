import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md border-b-1 border-black">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/login" className="flex items-center">
          <img
            src="/media/logo.svg"
            alt="yaksh"
            className="h-8 sm:h-8 w-auto max-md:h-5"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link to="/product" className="hover:text-blue-500 nav-link ">Product</Link>
          <Link to="/pricing" className="hover:text-blue-500 nav-link">Pricing</Link>
          <Link to="/support" className="hover:text-blue-500 nav-link">Support</Link>
          <Link to="/about" className="hover:text-blue-500 nav-link" >About</Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 text-gray-700 font-medium ">
          <Link to="/product " className="nav-link border-b border-red-800">Product</Link>
          <Link to="/pricing" className="nav-link ">Pricing</Link>
          <Link to="/support" className="nav-link">Support</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;