// import React, { useState } from 'react';
// import { Box, TextField, Button, Typography, Link, Paper, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import image2 from "./../Images/Logo File.png";
// import google from "./../Images/google logo.jpg";
// import "./Login.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   // Change the default partner type to an empty string
//   const [partnerType, setPartnerType] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch("http://46.37.122.105:91/login/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, password })
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         console.log("Login successful:", data);
//         localStorage.setItem("token", data.token); // Save token if needed
  
//         // Navigate based on role
//         if (email === "admin@gmail.com") {
//           navigate("/a-dashboard");
//         } else if (email === "partner@gmail.com") {
//           localStorage.setItem("partnerType", partnerType);
//           navigate("/p-dashboard");
//         } else if (email === "investor@gmail.com") {
//           navigate("/i-dashboard");
//         } else {
//           navigate("/dashboard"); // Default navigation
//         }
//       } else {
//         alert(data.message || "Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };
  

//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/11/22/23/57/london-3833039_1280.jpg)',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         marginTop: "-85px"
//       }}
//     >
//       <Paper elevation={4} sx={{ display: 'flex', width: '90%', maxWidth: 900, borderRadius: 2, overflow: 'hidden' }}>
//         <Grid container>
//           <Grid
//             item
//             xs={12}
//             md={6}
//             sx={{
//               display: { xs: 'none', md: 'flex' },
//               alignItems: 'center',
//               justifyContent: 'center',
//               backgroundImage: 'url(https://img.freepik.com/free-vector/background-banner-colorful-gradient_677411-3591.jpg?w=360)',
//               backgroundSize: 'cover',
//               padding: 2
//             }}
//           >
//             <img src={image2} alt="Login illustration" style={{ maxWidth: '100%', height: 'auto' }} />
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             md={6}
//             sx={{ padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
//           >
//             <Typography variant="h4" align="center" gutterBottom>
//               Login
//             </Typography>
//             <TextField
//               fullWidth
//               label="Email"
//               variant="outlined"
//               margin="normal"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               type="password"
//               variant="outlined"
//               margin="normal"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {/* Conditionally render the partner type dropdown */}
//             {email === 'partner@gmail.com' && (
//               <FormControl fullWidth margin="normal">
//                 <InputLabel id="partner-type-label">Select Partner Type</InputLabel>
//                 <Select
//                   labelId="partner-type-label"
//                   value={partnerType}
//                   label="Select Partner Type"
//                   onChange={(e) => setPartnerType(e.target.value)}
//                 >
//                   {/* Disabled placeholder option */}
//                   <MenuItem value="" disabled>
//                     Select Partner Type
//                   </MenuItem>
//                   <MenuItem value="IFA">IFA</MenuItem>
//                   <MenuItem value="REC">REC</MenuItem>
//                 </Select>
//               </FormControl>
//             )}
//             <Box textAlign="right">
//               <Link href="#" color="error">
//                 Forgot Password?
//               </Link>
//             </Box>
//             <Button
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 2,
//                 bgcolor: '#00cc8f',
//                 '&:hover': { bgcolor: '#004080', color: '#fff' }
//               }}
//               onClick={handleLogin}
//             >
//               Login
//             </Button>
//             <Typography align="center" sx={{ mt: 2 }}>
//               Or
//             </Typography>
//             <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <img src={google} alt="Google Logo" style={{ width: 20, height: 20, marginRight: 8 }} />
//                 Continue with Google
//               </Box>
//             </Button>
//             <Typography align="center" sx={{ mt: 2 }}>
//               Don't have an account? <Link href="#">Register for free</Link>
//             </Typography>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Paper, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image2 from "./../Images/Logo File.png";
import google from "./../Images/google logo.jpg";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Change the default partner type to an empty string
  const [partnerType, setPartnerType] = useState('');

  const handleLogin = () => {
    if (email === 'admin@gmail.com' && password === 'admin@123') {
      navigate('/a-dashboard');
    } else if (email === 'partner@gmail.com' && password === 'partner@123') {
      // Save the selected partner type so that the header can display it.
      localStorage.setItem('partnerType', partnerType);
      navigate('/p-dashboard');
    } else if (email === 'investor@gmail.com' && password === 'investor@123') {
      navigate('/i-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/11/22/23/57/london-3833039_1280.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: "-85px"
      }}
    >
      <Paper elevation={4} sx={{ display: 'flex', width: '90%', maxWidth: 900, borderRadius: 2, overflow: 'hidden' }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: 'url(https://img.freepik.com/free-vector/background-banner-colorful-gradient_677411-3591.jpg?w=360)',
              backgroundSize: 'cover',
              padding: 2
            }}
          >
            <img src={image2} alt="Login illustration" style={{ maxWidth: '100%', height: 'auto' }} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Conditionally render the partner type dropdown */}
            {email === 'partner@gmail.com' && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="partner-type-label">Select Partner Type</InputLabel>
                <Select
                  labelId="partner-type-label"
                  value={partnerType}
                  label="Select Partner Type"
                  onChange={(e) => setPartnerType(e.target.value)}
                >
                  {/* Disabled placeholder option */}
                  <MenuItem value="" disabled>
                    Select Partner Type
                  </MenuItem>
                  <MenuItem value="IFA">IFA</MenuItem>
                  <MenuItem value="REC">REC</MenuItem>
                </Select>
              </FormControl>
            )}
            <Box textAlign="right">
              <Link href="#" color="error">
                Forgot Password?
              </Link>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: '#00cc8f',
                '&:hover': { bgcolor: '#004080', color: '#fff' }
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Typography align="center" sx={{ mt: 2 }}>
              Or
            </Typography>
            <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={google} alt="Google Logo" style={{ width: 20, height: 20, marginRight: 8 }} />
                Continue with Google
              </Box>
            </Button>
            <Typography align="center" sx={{ mt: 2 }}>
              Don't have an account? <Link href="#">Register for free</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
