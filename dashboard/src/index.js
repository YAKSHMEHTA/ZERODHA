import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Holddings from "./components/Holddings";
import Home from "./components/Home";
import Login from "./authPath/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/holddings" element={<Holddings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);