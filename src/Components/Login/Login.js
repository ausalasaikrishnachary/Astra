import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link, Paper, Grid } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import image2 from "./../Images/Logo File.png";
import login_bg from "./../../Images/loginbg.jpg";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading
  
    try {
      const response = await fetch("http://175.29.21.7:83/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("user_name", data.first_name + data.last_name);
        const userRoles = data.roles || [];
  
        if (userRoles.length > 1) {
          selectUserRole(userRoles);
        } else if (userRoles.length === 1) {
          navigateToDashboard(userRoles[0]);
        } else {
          setError("No roles assigned. Please contact support.");
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading
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
    if (role === "Admin") {
      navigate("/a-dashboard");
    } else if (role === "Partner") {
      navigate("/p-dashboard");
    } else if (role === "Investor") {
      navigate("/i-dashboard");
    } else if (role === "Super Admin") {
      navigate("/s-dashboard");
    } else {
      setError("Invalid role assigned. Please contact support.");
    }
  };

  const handleSendOTP = async () => {
    if (!email || emailError) {
      setEmailError("Enter a valid email address");
      return;
    }

    try {
      const response = await fetch("http://175.29.21.7:83/send-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success", "OTP sent successfully. Check your email.", "success");
        setShowForgotPassword(false);
        setShowResetPassword(true);
      } else {
        Swal.fire("Error", data.error || "Failed to send OTP", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      Swal.fire("Error", "OTP and New Password are required", "error");
      return;
    }

    try {
      const response = await fetch("http://175.29.21.7:83/verify-otp-reset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success", "Password reset successfully.", "success").then(() => {
          setShowResetPassword(false);
        });
      } else {
        Swal.fire("Error", data.error || "Failed to reset password", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundImage: `url(${login_bg})`,
        backgroundColor: "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "-85px",
      }}
    >
      <Paper elevation={4} sx={{
        display: "flex", width: "90%", maxWidth: 900, borderRadius: 2, overflow: "hidden", backdropFilter: "blur(40px)",
        background: "#2a5f9e",
      }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              // backgroundImage: "url(https://img.freepik.com/free-vector/background-banner-colorful-gradient_677411-3591.jpg?w=360)",
              backgroundSize: "cover",
              padding: 2,

            }}
          >
            <img src={image2} alt="Login illustration" style={{ maxWidth: "100%", height: "auto" }} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ padding: 4, display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            {showForgotPassword ? (
              <>
                <Typography variant="h4" align="center" gutterBottom>
                  Forgot Password
                </Typography>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, bgcolor: "#00cc8f", "&:hover": { bgcolor: "#004080", color: "#fff" } }}
                  onClick={handleSendOTP}
                >
                  Send OTP
                </Button>
              </>
            ) : showResetPassword ? (
              <>
                <Typography variant="h4" align="center" gutterBottom>
                  Reset Password
                </Typography>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  disabled
                  sx={{ background: "transparent", borderColor: "white" }}
                />
                <TextField
                  fullWidth
                  label="OTP"
                  variant="outlined"
                  margin="normal"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, bgcolor: "#00cc8f", "&:hover": { bgcolor: "#004080", color: "#fff" } }}
                  onClick={handleResetPassword}
                >
                  Reset Password
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: 'white', }}>
                  Login
                </Typography>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={handleEmailChange}
                  sx={{
                    '& label': {
                      color: 'white',
                    },
                    '& label.Mui-focused': {
                      color: 'white',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused fieldset': {
                        border: '1px solid white',
                      },
                      '& input': {
                        color: 'white',
                        backgroundColor: 'transparent',
                        '&:-webkit-autofill': {
                          WebkitBoxShadow: '0 0 0 1000px transparent inset',
                          WebkitTextFillColor: 'white',
                          transition: 'background-color 5000s ease-in-out 0s',
                        },
                      },
                    },
                  }}
                />


                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          sx={{ color: 'white', }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& label': {
                      color: 'white',
                    },
                    '& label.Mui-focused': {
                      color: 'white',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused fieldset': {
                        border: '1px solid white',
                      },
                      '& input': {
                        color: 'white',
                        backgroundColor: 'transparent',
                        '&:-webkit-autofill': {
                          WebkitBoxShadow: '0 0 0 1000px transparent inset',
                          WebkitTextFillColor: 'white',
                          transition: 'background-color 5000s ease-in-out 0s',
                        },
                      },
                    },
                  }}
                />
                <Box textAlign="right">
                  <Link
                    href="#"
                    onClick={() => setShowForgotPassword(true)}
                    underline="none"
                    sx={{
                      cursor: "pointer",
                      color: "white",
                      fontWeight: 400, // normal weight
                      '&:hover': {
                        fontWeight: 'bold', // bold on hover
                      },
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 2,
                    bgcolor: "#2c3e50",
                    color: "#ffffff",
                    border: "2px solid #2a5f9e",
                    "&:hover": {
                      bgcolor: "#2a5f9e",
                      color: "#ffffff",
                    },
                  }}
                  onClick={handleLogin}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
