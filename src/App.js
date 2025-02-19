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
import BuyShares from "./Components/Panel/Investor/Transactions/BuyShares";
import SellShares from "./Components/Panel/Investor/Transactions/SellShares";
import Report from "./Components/Panel/Partner/Report/Report";
import AssetForm from "./Components/Panel/Partner/Asset/AssetForm";
import Tmanagement from "./Components/Panel/Admin/Investors/Investormanagement";
import Tmoniter from "./Components/Panel/Admin/Transactions/TransactionMoniter";
import Login from "./Components/Login/Login";



function App() {
  return (
      // <AuthProvider>
      <Router>
        {/* <Navbar/> */}
        {/* <InvestorHeader/> */}
        {/* <PartnerHeader/> */}
        <div style={{marginTop:"100px"}}>
          <Routes>
              <Route path="/a-dashboard" element={<AdminDashboard />} />
              <Route path="/a-asset" element={<AdminAsset />} />
              <Route path="/a-investormanagement" element={<Tmanagement />} />
              <Route path="/a-transactionmoniter" element={<Tmoniter />} />


              <Route path="/i-dashboard" element={<InvestorDashboard />} />
              <Route path="/i-asset" element={<InvestorAsset />} />
              <Route path="/i-buyshares" element={<BuyShares />} />
              <Route path="/i-sellshares" element={<SellShares />} />
              <Route path="/i-asset" element={<PartnerAsset />} />



              <Route path="/p-dashboard" element={<PartnerDashboard />} />
              <Route path="/p-report" element={<Report />} />
              <Route path="/p-addasset" element={<AssetForm />} />

              <Route path="/" element={<Login />} />
              
          </Routes>
          </div>
      </Router>
      // </AuthProvider>
  );
}

export default App;
