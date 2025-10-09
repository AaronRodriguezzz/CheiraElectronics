// src/pages/admin/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/SideBar";
import AdminHeader from "../components/admin/AdminHeader";
import NotificationBar from "../components/admin/NotificationBar";
import { NotificationProvider } from "../contexts/RequestsContext";
import { useAdminPageProtection } from '../hooks/protectHooks';

export default function AdminLayout() {
  useAdminPageProtection();
  const [notificationOpen, setNotificationOpen] = React.useState(false);

  return (
    <NotificationProvider>
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <AdminHeader notificationOpen={notificationOpen} setNotificationOpen={setNotificationOpen}/>
          <NotificationBar isOpen={notificationOpen} />
          <Outlet />
        </main>
      </div>
    </NotificationProvider>
  );
}
