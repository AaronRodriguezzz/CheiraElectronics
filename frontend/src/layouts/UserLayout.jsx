import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/user/Footer";
import Chatbot from "../components/user/Chatbot";
import Navbar from "../components/user/NavigationBar"
import ProfileSidebar from "../components/user/ProfileSidebar";

export default function UserLayout() {
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar open={setProfileSidebarOpen} />

      <main className="flex-grow">
        {profileSidebarOpen && <ProfileSidebar open={setProfileSidebarOpen} />}
        <Outlet />
      </main>

      <Chatbot />
      <Footer />
    </div>
  );
}
