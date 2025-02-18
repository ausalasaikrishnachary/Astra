import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import AdminDashboard from "./Components/Panel/Admin/Dashboard/Dashboard";
import AdminAsset from "./Components/Panel/Admin/Asset/Asset";
import InvestorDashboard from "./Components/Panel/Investor/Dashboard/Dashboard";
import InvestorAsset from "./Components/Panel/Investor/Asset/Asset";
import PartnerDashboard from "./Components/Panel/Partner/Dashboard/Dashboard";
import PartnerAsset from "./Components/Panel/Partner/Asset/Asset";
import Navbar from "./Components/Shared/Navbar/Navbar";
import InvestorHeader from "./Components/Shared/Investor/InvestorNavbar";
import PartnerHeader from "./Components/Shared/Partner/PartnerNavbar";


function App() {
  return (
      // <AuthProvider>
      <Router>
        {/* <Navbar/> */}
        {/* <InvestorHeader/> */}
        <PartnerHeader/>
        <div style={{marginTop:"100px"}}>
          <Routes>
              <Route path="/a-dashboard" element={<AdminDashboard />} />
              <Route path="/a-asset" element={<AdminAsset />} />
              <Route path="/i-dashboard" element={<InvestorDashboard />} />
              <Route path="/i-asset" element={<InvestorAsset />} />
              <Route path="/p-dashboard" element={<PartnerDashboard />} />
              <Route path="/i-asset" element={<PartnerAsset />} />
          </Routes>
          </div>
      </Router>
      // </AuthProvider>
  );
}

export default App;
