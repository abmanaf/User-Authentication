import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { app } from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  let auth = getAuth();
  const [data, setData] = useState({});

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setData({ ...data, ...newInput });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login-pic-and-forms">
      <div className="login-emoji"></div>
      <div className="form-container" style={{ marginTop: "11.1em" }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form>
          <input
            type="text"
            name="email"
            className="form-input"
            placeholder="Email"
            onChange={(event) => handleInput(event)}
            required
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Password"
            onChange={(event) => handleInput(event)}
            required
          />
          <Link
            to="/ForgotPassword"
            style={{
              fontSize: "14px",
              color: "#007bff",
              textDecoration: "none",
              float: "right",
            }}
          >
            Forgot password?
          </Link>
          <button
            type="submit"
            className="form-button"
            onChange={(event) => handleSubmit(event)}
          >
            LOGIN
          </button>
          <p className="form-footer" style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#007bff" }}>
              Sign up
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
