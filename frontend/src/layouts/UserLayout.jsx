import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/user/Footer";
import Navbar from "../components/user/NavigationBar"
import ProfileSidebar from "../components/user/ProfileSidebar";
import Chatbot from "../components/user/Chatbot";
import HyperSpeedBg from "../components/user/HyperSpeedBg";

export default function UserLayout() {
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      <Navbar setSideBarOpen={setProfileSidebarOpen} />
      {profileSidebarOpen && <ProfileSidebar open={setProfileSidebarOpen} />}

      <main className="relative min-h-screen text-white bg-black flex-grow z-10">
        <HyperSpeedBg />   {/* stays fixed behind */}
        <Outlet />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}
