import React, { useState } from "react";
import "../../resources/css/index.css";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { useAlert } from "react-alert";

export default function Login({ history }) {
  const alert = useAlert();

  const [log, setlog] = useState({ email: "", password: "" });

  const { email, password } = log;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setlog((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const showAlert = (msg, type) => {
    alert.show(msg, { type });
  };

  const submitlogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      showAlert("Please fill all the credentials", "error");
    } else {
      const body = { email, password };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const data = await axios.post(
          "http://localhost:5000/auth/login",
          body,
          config
        );
        setlog({ email: "", password: "" });
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
          <h1>Login</h1>
          <form className="login-form">
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
                type="password"
                onChange={handleChange}
                name="password"
                value={log.password}
                placeholder="Password"
                style={{ padding: "1rem 0", paddingLeft: "1rem" }}
                required
              ></input>
            </div>
            <div>
              <button className="form-butt" onClick={submitlogin}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
