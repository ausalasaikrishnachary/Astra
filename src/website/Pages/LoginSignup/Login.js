import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="login-title">Log in</h3>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Your email" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Your password"
              />
              <span
                className="toggle-password"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>
          
          <div className="forgot-password-container">
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-btn">Log in</button>
        </form>

        <div className="text-links">
          <p>Not on Astra?</p>
          <a href="#" className="create-profile">Create a profile</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
