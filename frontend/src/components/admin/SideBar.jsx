import { Home, List, Users, ClipboardList, FileText, Star, Settings, LogOut, CheckCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/UserContext";

const navItems = [
    { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
    { name: "Service Requests", path: "/admin/requests", icon: <List size={20} /> },
    { name: "Assignments", path: "/admin/assign", icon: <ClipboardList size={20} /> },
    { name: "Completed", path: "/admin/completed", icon: <CheckCircle size={20} /> },
    { name: "Service Catalog", path: "/admin/catalog", icon: <Settings size={20} /> },
    { name: "Technicians", path: "/admin/technicians", icon: <Users size={20} /> },
    { name: "Customer Feedback", path: "/admin/feedback", icon: <Star size={20} /> },
    { name: "History", path: "/admin/history", icon: <FileText size={20} /> },
    { name: "Accounts", path: "/admin/accounts", icon: <Users size={20} /> },
];

export default function AdminSidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    return (
        <aside className="relative w-48 bg-orange-500 text-white shadow-lg flex flex-col min-h-screen overflow-y-auto">
            <img 
                src="/img/cheiralogo.png" 
                className="w-25 h-25 m-auto mt-4 mb-2 md:w-35 md:h-35"
                alt="Cheira Electronics" 
            />

            <nav className="flex flex-col gap-1 p-2 md:p-4">
                {navItems.map(({ name, path, icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={path === "/admin"}
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 md:p-3 rounded-lg hover:bg-orange-600 transition ${
                                isActive ? "bg-orange-700 font-semibold" : ""
                            }`
                        }
                    >
                        {icon}
                        <span className="text-xs md:text-sm">{name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Push logout to bottom if space allows */}
            <div className="mt-auto">
                <button
                    className="w-full flex items-center gap-2 p-2 md:p-3 rounded-lg hover:bg-red-600 transition"
                    onClick={() => {
                        logout("admin_token");
                        navigate("/admin/login");
                    }}
                >
                    <LogOut size={20} />
                    <span className="text-xs md:text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
}
