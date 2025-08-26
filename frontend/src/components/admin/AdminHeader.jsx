import { Bell, UserCircle } from "lucide-react";
import pageTitles from "../../data/PageTitles";
import { useLocation} from "react-router-dom";
import { useNotifSocket } from '../../contexts/RequestsContext';

export default function adminHeader({ notificationOpen, setNotificationOpen }) {
    const location = useLocation();
    const { notifCount, setNotifCount } = useNotifSocket();
    const currentTitle = pageTitles[location.pathname] || "" ; 

    return (
        <div className="w-full flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">{currentTitle}</h1>
  
            <div 
              className="flex gap-x-4" 
            >
              <button 
                className="relative" 
                onClick={() => {
                  setNotificationOpen(prev => !prev); 
                  setNotifCount(0);
                }}
              >
                <p className={`absolute top-0 left-3 px-2 rounded-full bg-red-500 text-white text-sm ${notifCount === 0 ? 'hidden' : 'visible'}`}>{notifCount}</p>
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