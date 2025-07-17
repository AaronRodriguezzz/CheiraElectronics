import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/user/Footer";
import Chatbot from "../components/user/Chatbot";
import Navbar from "../components/user/NavigationBar"

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}
