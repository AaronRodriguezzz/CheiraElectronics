import { Home, List, Users, ClipboardList, FileText, Star, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
    { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
    { name: "Service Requests", path: "/admin/requests", icon: <List size={20} /> },
    { name: "Assignments", path: "/admin/assign", icon: <ClipboardList size={20} /> },
    { name: "Service Catalog", path: "/admin/catalog", icon: <Settings size={20} /> },
    { name: "Technicians", path: "/admin/technicians", icon: <Users size={20} /> },
    { name: "Customer Feedback", path: "/admin/feedback", icon: <Star size={20} /> },
    { name: "History", path: "/admin/history", icon: <FileText size={20} /> },
    { name: "Accounts", path: "/admin/accounts", icon: <Users size={20} /> },
    { name: "Logout", path: "/admin/login", icon: <LogOut size={20} /> },
];

export default function AdminSidebar(){
    return(
        <aside className="w-64 bg-orange-500 text-white shadow-lg">
            <img 
                src="/img/cheiralogo.png" 
                className="w-40 h-40 m-auto"
                alt="Cheira Electronics" 
            />

            <nav className="flex flex-col gap-1 p-4">
                {navItems.map(({ name, path, icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={path === "/admin"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg hover:bg-orange-600 transition ${
                                isActive ? "bg-orange-700 font-semibold" : ""
                            }`
                        }
                    >
                        {icon}
                        <span>{name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}