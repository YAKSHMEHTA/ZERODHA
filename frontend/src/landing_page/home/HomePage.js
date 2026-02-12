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
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";

function HomePage() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/`,
          {},
          { withCredentials: true }
        );

        const { status, user } = data;

        if (status) {
          toast(`Hello ${user}`, {
            position: "top-right",
          });
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

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
