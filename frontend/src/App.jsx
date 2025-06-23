import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";

// Pages under /User
import HomePage from "./pages/User/HomePage";
import ContactUs from "./pages/User/ContactUs";
import Feedback from "./pages/User/Feedback";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import ServiceCatalog from "./pages/User/ServiceCatalog";
import RequestForm from "./pages/User/RequestForm";

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

        {/* Pages without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
