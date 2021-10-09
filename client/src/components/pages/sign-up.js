import React, { useState } from "react";
import "../../resources/css/index.css";
import { useAlert } from "react-alert";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Navbar from "../layout/Navbar";
 
export default function Login({ history }) {
  const alert = useAlert();

  const [log, setlog] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const showAlert = (msg, type) => {
    alert.show(msg, { type });
  };

  const { name, email, password, confirm_password } = log;

  function handleChange(event) {
    const { name, value } = event.target;
    setlog((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const submitlogin = async (event) => {
    event.preventDefault();
    if (!name || !email || !password || !confirm_password) {
      showAlert("Please fill all the credentials", "error");
    } else if (password !== confirm_password) {
      showAlert("Passwords do not match", "error");
    } else {
      const body = { name, email, password };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const data = await axios.post(
          "http://localhost:5000/auth/signup",
          body,
          config
        );
        setlog({ name: "", email: "", password: "", confirm_password: "" });
        localStorage.setItem("user", JSON.stringify(data.data.token));
        history.push("/");
      } catch (error) {
        showAlert(error.response.data.error, "error");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-back">
        <div className="auth">
          <h1>Register</h1>
          <form className="login-form">
            <div>
              <input
                onChange={handleChange}
                name="name"
                value={log.name}
                placeholder="Name"
                style={{ padding: "1rem 0", paddingLeft: "1rem" }}
                required
              ></input>
            </div>
            <div>
              <input
                onChange={handleChange}
                name="email"
                value={log.email}
                placeholder="Email"
                type="email"
                style={{ padding: "1rem 0", paddingLeft: "1rem" }}
                required
              ></input>
            </div>
            <div>
              <input
                onChange={handleChange}
                name="password"
                value={log.password}
                placeholder="Password"
                type="password"
                style={{ padding: "1rem 0", paddingLeft: "1rem" }}
                required
              ></input>
            </div>
            <div>
              <input
                onChange={handleChange}
                name="confirm_password"
                value={log.confirm_password}
                placeholder="Confirm Password"
                type="password"
                style={{ padding: "1rem 0", paddingLeft: "1rem" }}
                required
              ></input>
            </div>
            <button className="form-butt" onClick={submitlogin}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
