import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const verifyUser = async ()=> {
  try {
    const { data } = await axios.post(
      "http://localhost:3002/auth",
      "",
      { withCredentials :true},
    )
    const { status, user } = data
    if (status) {
      toast(`Hello ${user}`, {
        position: "top-right",
      })
    } else {
      navigate("/login");
    }
  } catch {
    navigate("/login");
  }
}

verifyUser();

return (
  <div className="dashboard-container">
    <GeneralContextProvider>
      <WatchList />
    </GeneralContextProvider>
    <div className="content">
      <Routes>
        <Route exact path="/" element={<Summary />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/holdings" element={<Holdings />} />
        <Route path="/positions" element={<Positions />} />
        <Route path="/funds" element={<Funds />} />
        <Route path="/apps" element={<Apps />} />
      </Routes>
    </div>
  </div>
);
};

export default Dashboard;