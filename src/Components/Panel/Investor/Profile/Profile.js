import React, { useEffect, useState } from "react";
import { Box, Card, Typography, Divider, Button } from "@mui/material";
import InvestorHeader from "../../../Shared/Investor/InvestorNavbar";
import axios from "axios";

const InvestorProfile = () => {
  const [profile, setProfile] = useState(null);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://175.29.21.7:83/users/${userId}/`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <Typography sx={{ mt: 5, textAlign: "center" }}>Loading...</Typography>;
  }

  return (
    <>
      <InvestorHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            width: "700px",
            mt: "40px",
            borderRadius: "12px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: "rgb(30, 10, 80)",
              color: "white",
              textAlign: "center",
              p: "15px",
              fontSize: "20px",
            }}
          >
            <Typography variant="h6" sx={{ m: 0 }}>
              Profile Details
            </Typography>
          </Box>

          {/* Card Body */}
          <Box sx={{ p: "20px" }}>
            <ProfileField label="First Name:" value={profile.username} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Last Name:" value={profile.last_name} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Date of Birth:" value={profile.date_of_birth} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Gender:" value={profile.gender} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Email Address:" value={profile.email} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Mobile Number:" value={profile.phone_number} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Role:" value="Investor"/>

            {/* Nominee Details */}
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                color: "rgb(30, 10, 80)",
                mt: "15px",
              }}
            >
              Nominee Details
            </Typography>
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Nominee Name:" value={profile.nomineeName} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField label="Nominee Email:" value={profile.nomineeEmail} />
            <Divider sx={{ borderColor: "#ccc", my: "5px" }} />
            <ProfileField
              label="Nominee Mobile Number:"
              value={profile.nomineeMobile}
            />
          </Box>

          {/* Footer with Close Button */}
          <Box sx={{ textAlign: "center", p: "15px" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(20, 5, 60)",
                color: "white",
                padding: "8px 20px",
                fontSize: "14px",
                borderRadius: "20px",
                transition: "0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgb(15, 4, 50)",
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

const ProfileField = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "17px",
      py: "10px",
    }}
  >
    <Typography
      component="span"
      sx={{ color: "rgb(30, 10, 80)", flex: 1, textAlign: "left" }}
    >
      {label}
    </Typography>
    <Typography
      component="span"
      sx={{ flex: 2, textAlign: "right", color: "#333", fontWeight: 500 }}
    >
      {value || "-"}
    </Typography>
  </Box>
);

export default InvestorProfile;
