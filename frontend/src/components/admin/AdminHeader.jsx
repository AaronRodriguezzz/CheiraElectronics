import { Bell, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import pageTitles from "../../data/PageTitles";
import { useLocation} from "react-router-dom";

export default function adminHeader({ notificationOpen, setNotificationOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentTitle = pageTitles[location.pathname] || "" ; 

    return (
        <div className="w-full flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">{currentTitle}</h1>
  
            <div className="flex gap-x-4" onClick={() => setNotificationOpen(prev => !prev)}>
              <button className="relative">
                <Bell className={`w-7 h-7 text-gray-700 hover:text-orange-500 cursor-pointer ${notificationOpen ? 'text-orange-500' : 'text-gray-700'}` } />
              </button>
  
              {/* Profile Display */}
              <div className="flex items-center gap-x-2 group cursor-pointer">
                <div className=" rounded-full p-1.5">
                  <UserCircle className="w-7 h-7 text-gray-700 group-hover:text-orange-500 transition-colors" />
                </div>
                <span className="font-medium text-gray-800 group-hover:text-orange-500 transition-colors">
                  Karl Retrita
                </span>
              </div>
            </div>
        </div>
    );
}