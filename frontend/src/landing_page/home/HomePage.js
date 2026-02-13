import React, { useEffect } from "react";
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
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          "https://zerodha-7.onrender.com/auth",
          {},
          { withCredentials: true }
        );

        const { status, user } = data;

        if (status) {
          toast(`Hello ${user}`, {
            position: "top-right",
          });
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    verifyUser();
  }, [navigate]);

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
