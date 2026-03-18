import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { email, username, password } = info;

  const handelChange = (e) => {
    const { name, value } = e.target;

    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    try {
      const { data } = axios.post(
        "http://localhost:3002/auth/signup",
        { ...info },
        { withCredentials: true },
      );
      const { success, message } = data;
      if (success) {
        toast.success(message, {
          position: "bottom-left",
        });

        navigate("/login");
      } else {
        toast.success(message, {
          position: "bottom-left",
        });
      }
    } catch (e) {
      toast.error(e, {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-column align-center">
      <form onSubmit={handelSubmit}>
        <input type="text" onChange={handelChange} placeholder="email" name="email" id="" />
        <input type="text" placeholder="username" onChange={handelChange} name="username" id="" />
        <input type="text" placeholder="password" onChange={handelChange} name="password" id="" />

        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default Signup;
