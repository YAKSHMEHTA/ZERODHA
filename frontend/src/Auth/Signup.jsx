import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Signup() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        username: "",
        password: "",
    });
    const { email, username, password } = inputValue;
    const handelOnChange = (e) => {
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
            position: "bottom-right",
        });

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(
                "https://zerodha-3-rhrz.onrender.com/signup",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            )
            const { success, message } = data
            if (success) {
                handleSuccess(message)
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                handleError(message)
            }
            setInputValue({
                ...inputValue,
                email: "",
                password: "",
                username: "",
            });
        }catch(err){
            handleError(err)
        }
    }

    return (
        <div clasName="form_container">
            <h2>SignUp</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeHolder="Enter your email"
                        onChange={handelOnChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeHolder="Enter your username"
                        onChange={handelOnChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeHolder="Enter your password"
                        onChange={handelOnChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <span>
                Already have an account? <Link to={"/login"}>Login</Link>
            </span>
            <ToastContainer />
        </div>
    );
}

export default Signup;
