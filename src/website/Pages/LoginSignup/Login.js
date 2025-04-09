import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://175.29.21.7:83/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("user_name", data.first_name + " " + data.last_name);
        const userRoles = data.roles || [];
        await Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'Login Successfull.',
        });

        if (userRoles.length > 1) {
          selectUserRole(userRoles);
        } else if (userRoles.length === 1) {
          navigateToDashboard(userRoles[0]);
        } else {
          setError("No roles assigned. Please contact support.");
        }
      } else {
        setError(data.error || "Login failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };


  const selectUserRole = async (roles) => {
    const { value: selectedRole } = await Swal.fire({
      title: "Select Your Role",
      input: "select",
      inputOptions: roles.reduce((acc, role) => ({ ...acc, [role]: role }), {}),
      inputPlaceholder: "Choose your role",
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancel",
    });

    if (selectedRole) {
      navigateToDashboard(selectedRole);
    }
  };

  const navigateToDashboard = (role) => {
    switch (role) {
      case "Investor":
        navigate("/i-dashboard");
        break;
      // case "Admin":
      //   navigate("/a-dashboard");
      //   break;
      // case "Partner":
      //   navigate("/p-dashboard");
      //   break;
      // case "Super Admin":
      //   navigate("/s-dashboard");
      //   break;
      default:
        setError("Invalid Credentials")
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="login-title">Log in</h3>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <small className="error-text">{emailError}</small>}
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Your password"
                value={password}
                onChange={handlePasswordChange}
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

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn">Log in</button>
        </form>

        <div className="text-links">
          <p>Not on Astra?</p>
          <a href="/signup" className="create-profile">Create a profile</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
