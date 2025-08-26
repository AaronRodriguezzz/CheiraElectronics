import { createContext, useState, useEffect, useContext } from 'react';
import { notificationsSocket } from '../sockets/notificationSocket';
import { get_data } from '../services/getMethod';

const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
    const [notifications, setNotifications] = useState([]);
    const [notifCount, setNotifCount] = useState(0);

    useEffect(() => {

        const fetchOldNotifications = async () => {
            try {
                const res = await get_data(`/all-requests`);
                setNotifications(res);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchOldNotifications();


        // When we connect
        notificationsSocket.on("connect", () => {
            console.log("Connected to notifications namespace");
        });
    
        // Listen for new appointments
        notificationsSocket.on("newNotification", (data) => {
            setNotifications(prev => [data, ...prev]);
            setNotifCount(prev => prev + 1);
        });
    
        // Cleanup
        return () => {
            notificationsSocket.off("connect");
            notificationsSocket.off("newNotification");
        };
    }, []);
    
    return (
        <NotificationContext.Provider value={{ notifications, notifCount, setNotifCount}}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifSocket = () => useContext(NotificationContext);