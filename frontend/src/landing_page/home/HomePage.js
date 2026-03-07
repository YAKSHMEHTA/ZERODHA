import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import Openacc from "../Openacc";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

function HomePage() {


  
  return (
    <div>
      <Navbar />
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <Openacc />
      <Footer />
    </div>
  );
}

export default HomePage;
