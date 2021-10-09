import React, { useState } from "react";
import "../../resources/css/index.css";

export default function Login() {
  const [log, setlog] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setlog((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function submitlogin(event) {
    setlog({ name: "", email: "", password: "", confirm_password: "" });
    event.preventDefault();
  }

  return (
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
  );
}
