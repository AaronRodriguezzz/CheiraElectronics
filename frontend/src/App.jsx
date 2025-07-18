import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages under /User
import HomePage from "./pages/User/HomePage";
import ContactUs from "./pages/User/ContactUs";
import Feedback from "./pages/User/Feedback";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import ServiceCatalog from "./pages/User/ServiceCatalog";
import RequestForm from "./pages/User/RequestForm";

//Pages under /Admin
import Dashboard from "./pages/Admin/Dashboard";
import AdminLogin from "./pages/Admin/Login";
import ServiceRequests from "./pages/Admin/ServiceRequests";
import TechnicianAssign from "./pages/Admin/Assignments";
import AdminServices from "./pages/Admin/Services";
import Technicians from "./pages/Admin/Technicians";
import AdminFeedback from "./pages/Admin/Feedback";
import History from "./pages/Admin/History";
import Accounts from "./pages/Admin/Accounts";

import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import ProtectedRoute from "./components/routes/protectedRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pages with layout */} 
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/service-catalog" element={<ServiceCatalog />} />
          <Route path="/request-form" element={<RequestForm />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            element={<ProtectedRoute role="admin" />}
          >
            <Route index element={<Dashboard />} />
            <Route path="requests" element={<ServiceRequests />} />
            <Route path="assign" element={<TechnicianAssign />} />
            <Route path="catalog" element={<AdminServices />} />
            <Route path="technicians" element={<Technicians />} />
            <Route path="feedback" element={<AdminFeedback />} />
            <Route path="history" element={<History />} />
            <Route path="accounts" element={<Accounts />} />
          </Route>
        </Route>

        
        <Route path="/admin/login" element={<AdminLogin />} />



        {/* Pages without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />



      </Routes>
    </Router>
  );
}
