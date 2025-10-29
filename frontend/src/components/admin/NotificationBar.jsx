import React, { useState, useEffect } from 'react'
import { useNotifSocket } from '../../contexts/RequestsContext';

const NotificationBar = ({isOpen}) => {

    const { notifications } = useNotifSocket();

    if(!isOpen) return 

    return (
        <div className='fixed top-20 right-18 h-[400px] w-[300px] bg-orange-500 p-2 shadow-lg rounded z-30'>
            <h1 className='font-semibold text-2xl text-white tracking-tighter mb-4 p-2'>Notifications</h1>

            <div className='max-h-[310px] overflow-y-auto custom-scrollbar p-2 rounded'>
                {notifications && notifications.map((notif, index) => (
                    <div className='flex justify-between text-white bg-orange-600 text-sm mb-2 p-2 rounded' key={index}>
                        <div>
                            <h2 className='text-md font-semibold text-green-400'>{notif.customer?.full_name}</h2>
                            <p>{notif?.serviceCategory.charAt(0) + notif.serviceCategory.slice(1).toLowerCase()} Job</p>
                            <p>{notif?.status}</p>
                        </div>

                        <p className='text-gray-300'>
                            {new Date(notif?.createdAt).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </p>                    
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NotificationBar