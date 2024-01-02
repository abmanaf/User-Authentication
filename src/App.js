import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function LoginPage() {
  return (
    <div className="login-pic-and-forms">
      <div className="login-emoji"></div>
      <div className="form-container" style={{ marginTop: "11.1em" }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form>
          <input
            type="text"
            name="username"
            className="form-input"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Password"
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
          <button type="submit" className="form-button">
            LOGIN
          </button>
          <p className="form-footer" style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/SignupPage" style={{ color: "#007bff" }}>
              Sign up
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
