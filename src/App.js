import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import Transaction from "./Components/Panel/Partner/Transactions/Transactions";
import InvestmentPage from "./Components/Panel/Investor/Asset/InvestmentPage";
import PartnersDashboard from "./Components/Panel/Admin/Partners/Partners";
import AssetDashboard from "./Components/Panel/Partner/Asset/Asset";
import InvestorProfile from "./Components/Panel/Investor/Profile/Profile";
import Kyc from "./Components/Panel/Investor/Profile/Kyc";
import PartnerProfile from "./Components/Panel/Partner/Profile/Profile";
import PartnerKyc from "./Components/Panel/Partner/Profile/Kyc";
import AdminProfile from "./Components/Panel/Admin/Profile/Profile";
import AdminKyc from "./Components/Panel/Admin/Profile/Kyc";
import Home from "./website/Pages/Home/Home";
import Aboutus from "./website/Pages/Aboutus/Aboutus";
import FAQAccordion from "./website/Pages/FAQs/Faqs";
import Contact from "./website/Pages/Contactus/Contactus";
import Properties from "./website/Pages/Properties/Properties";
import SignUp from "./website/Pages/LoginSignup/SignUp";
import SignIn from "./website/Pages/LoginSignup/Login";
import Header from "./website/Shared/Navbar/Navbar";
import Footer from "./website/Shared/Footer/Footer";
import MyInvestors from "./Components/Panel/Partner/MyInvestors/MyInvestors";
import AdminAssetForm from "./Components/Panel/Admin/Asset/AssetForm";
import SellAsset from "./Components/Panel/Investor/Asset/SellAsset";
import Users from "./Components/Panel/Admin/Users/Users";
import EscroAccount from "./Components/Panel/Admin/EscroAccount/EscroAccount";
import PaymentForm from "./Components/Panel/Investor/Transactions/PaymentForm";
import Commission from "./Components/Panel/Partner/Commission/Commission";
import PurchasedAssets from "./Components/Panel/Investor/Asset/PurchasedAssets";
import Dashboard from "./Components/Panel/SuperAdmin/Dashboard/Dashboard";
import AddAdmin from "./Components/Panel/SuperAdmin/AddAdmin/AddAdmin";
import ViewAdmin from "./Components/Panel/SuperAdmin/ViewAdmin/ViewAdmin";
import TransactionDetails from "./Components/Panel/Investor/Transactions/TransactionDetails";
import EditAdmin from "./Components/Panel/SuperAdmin/ViewAdmin/EditAdmin";
import TransactionMoniterDetails from "./Components/Panel/Admin/Transactions/TransactionMoniterDetails";
import CommissionForm from "./Components/Panel/Admin/Transactions/CommissionForm";
import ViewEscrowAccount from "./Components/Panel/Admin/EscroAccount/ViewEscrowAccount";
import EditPartner from "./Components/Panel/Admin/Partners/EditPartner";
import EditInvestor from "./Components/Panel/Admin/Investors/EditInvestor";
import EditAsset from "./Components/Panel/Admin/Asset/EditAsset";
import ScheduleCall from "./Components/Panel/Admin/Asset/SheduleMeeting";

function Layout() {
  const location = useLocation();

  // Define paths where Header and Footer should be visible
  const publicPaths = ["/", "/aboutus", "/FAQ", "/contactus", "/properties", "/signup", "/signin"];
  
  return (
    <>
      {publicPaths.includes(location.pathname) && <Header />}
      <div style={{ marginTop: "85px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/FAQ" element={<FAQAccordion />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/a-dashboard" element={<AdminDashboard />} />
          <Route path="/a-asset" element={<AdminAsset />} />
          <Route path="/a-addasset" element={<AdminAssetForm />} />
          <Route path="/a-investormanagement" element={<Tmanagement />} />
          <Route path="/a-editinvestors" element={<EditInvestor />} />
          <Route path="/a-transactionmoniter" element={<Tmoniter />} />  
          <Route path="/a-partners" element={<PartnersDashboard />} />
          <Route path="/a-editpartners" element={<EditPartner />} />
          <Route path="/a-profile" element={<AdminProfile />} />
          <Route path="/a-profiledetails" element={<AdminKyc />} />
          <Route path="/a-users" element={<Users />} />
          <Route path="/a-addescrow" element={<EscroAccount />} />
          <Route path="/a-escrow" element={<ViewEscrowAccount />} />
          <Route path="/a-transaction-details" element={<TransactionMoniterDetails />} />
          <Route path="/a-commission-form" element={<CommissionForm />} />
          <Route path="/a-edit-asset" element={<EditAsset />} />
          <Route path="/a-shedulemeeting" element={<ScheduleCall />} />

          <Route path="/i-dashboard" element={<InvestorDashboard />} />
          <Route path="/i-asset" element={<InvestorAsset />} />
          <Route path="/i-buyunits" element={<BuyShares />} />
          <Route path="/i-fullpayments" element={<SellShares />} />
          <Route path="/i-investment-page" element={<InvestmentPage />} />
          <Route path="/i-sellform" element={<SellAsset />} />
          <Route path="/i-profile" element={<InvestorProfile />} />
          <Route path="/i-profiledetails" element={<Kyc />} />
          <Route path="/i-payment-form" element={<PaymentForm />} />
          <Route path="/i-purchasedasset" element={<PurchasedAssets />} />
          <Route path="/i-transaction-details" element={<TransactionDetails />} />


          <Route path="/p-dashboard" element={<PartnerDashboard />} />
          <Route path="/p-report" element={<Report />} />
          <Route path="/p-addasset" element={<AssetForm />} />
          <Route path="/p-transactions" element={<Transaction />} />
          <Route path="/p-myassets" element={<AssetDashboard />} />
          <Route path="/p-profile" element={<PartnerProfile />} />
          <Route path="/p-profiledetails" element={<PartnerKyc />} />
          <Route path="/p-myinvestors" element={<MyInvestors />} />
          <Route path="/p-commission" element={<Commission />} />

          <Route path="/s-dashboard" element={<Dashboard />} />
          <Route path="/s-addadmin" element={<AddAdmin />} />
          <Route path="/s-viewadmins" element={<ViewAdmin />} />
          <Route path="/s-editadmins" element={<EditAdmin />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      {publicPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
