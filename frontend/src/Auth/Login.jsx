import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://zerodha-7.onrender.com/auth/login",
        { ...inputValue },
        { withCredentials: true },
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError("Login failed");
    }
  };

  return (
    <div className="form_container w-full bg-black flex items-center justify-center h-screen text-white">
      <div className=" w-[50%] h-[100%] pt-[10%] text-center flex flex-column gap-10">
        <h2>Login Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-column gap-10">
            <div className="flex flex-column justify-start items-start">
              <label className="" htmlFor="email">
                Email
              </label>
              <input
                className="h-10 border-2 border-gray-300 rounded-md w-full"
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-column justify-start items-start">
              <label className="" htmlFor="password">
                Password
              </label>
              <input
                className="h-10 border-2 border-gray-300 rounded-md w-full"
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
              />
            </div>
            <div className=" display flex justify-center">
              <button
                className="bg-blue-700 h-14 w-[25%] text-white !rounded-md"
                type="submit"
              >
                Submit
              </button>
            </div>
            <span>
              Dont have have an account? <Link to={"/signup"}>signup</Link>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
