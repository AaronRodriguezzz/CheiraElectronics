import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/user/Footer";
import Navbar from "../components/user/NavigationBar"
import ProfileSidebar from "../components/user/ProfileSidebar";
import Chatbot from "../components/user/Chatbot";

export default function UserLayout() {
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      <Navbar setSideBarOpen={setProfileSidebarOpen} />

      <main className="flex-grow z-10">
        {profileSidebarOpen && <ProfileSidebar open={setProfileSidebarOpen} />}
        <Outlet />
      </main>

      <Chatbot />
      <Footer />
    </div>
  );
}
