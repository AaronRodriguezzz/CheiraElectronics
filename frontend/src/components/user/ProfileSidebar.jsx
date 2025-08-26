import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, PencilLine, Lock, Wrench, Power, ChevronRight, ChevronDown } from "lucide-react"
import { statusColorMap } from '../../data/StatusColor';
import { get_data } from '../../services/getMethod';
import { notificationsSocket } from '../../sockets/notificationSocket';

const ProfileSidebar = ({ open }) => {
    const user =  JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [requestHistoryOpen, setRequestHistoryOpen] = useState(false);
    const [requests, setRequests] = useState(null);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        const getUserRequests = async () => {
            setLoading(true);
            try{
                const requests = await get_data(`/requests/${user?._id}`);

                if(requests){
                    console.log(requests);
                    setRequests(requests);
                }

                setLoading(false);
            }catch(err){
                console.log(err);
            }
        }

        requestHistoryOpen && getUserRequests();

    },[requestHistoryOpen])

    return (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-end">
            <div className="relative h-full w-[20rem] bg-white p-6 shadow-2xl flex flex-col">
                
                {/* Back Button */}
                <button
                    onClick={() => open(false)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />   
                    Back
                </button>

                {/* User Info */}
                <div className="flex justify-around items-center border-b-2 border-orange-500 pb-4 mb-4">

                    <div>
                        <h1 className="text-2xl font-semibold text-orange-500 tracking-tight">
                        {user?.full_name}
                        </h1>
                        <p className="text-sm text-gray-700 mt-1 break-words max-w-xs">
                            {user?.address}
                        </p>
                    </div>
                    
                    <button 
                        className='h-3 w-3 hover:text-red-500' 
                        onClick={() => {
                            localStorage.removeItem('user')
                            navigate('/login')
                        }}
                    ><Power/></button>
                </div>

                    {/* Menu Actions */}
                <div className="flex flex-col gap-y-2">
                    <button 
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition"
                        onClick={() => alert('hi')}
                    >
                        <PencilLine className="w-5 h-5" />
                        Edit Profile
                    </button>

                    <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition">
                        <Lock className="w-5 h-5" />
                        Change Password 
                    </button>

                    
                    <button
                        className="flex items-center justify-between w-full gap-3 px-3 py-2 rounded-md hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition"
                        onClick={() => setRequestHistoryOpen(!requestHistoryOpen)}
                    >
                        <span className="flex items-center gap-2">
                            <Wrench className="w-5 h-5" />
                            Service Request 
                        </span>

                        {requestHistoryOpen ? (
                            <ChevronDown className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </button>
                </div>  

                {!requests && requestHistoryOpen ? (
                    <div> 
                        <h1>No Request yet</h1>
                    </div>
                ) : (
                    <>
                        {requestHistoryOpen && <div className='max-h-[600px] overflow-y-auto mt-4 space-y-2'>
                            {requests && requests.map((req) => (
                                <div
                                    key={req._id}
                                    className='relative pl-6 p-2 text-sm bg-white rounded shadow'
                                >
                                    <div
                                        className={`absolute h-full left-0 top-0 w-[10px] rounded-l-lg bg-${statusColorMap[req?.status]}`}
                                    />

                                    <h1 className='max-w-[250px] text-lg tracking-tighter font-semibold truncate'>
                                        {req?.serviceType}
                                    </h1>
                                    <p>{req?.submittedAt.split('T')[0]}</p>
                                    <p style={{color: statusColorMap[req?.status]}}>{req?.status}</p>
                                </div>
                            ))}
                        </div>}
                    </>
                )}
            </div>
        </div>
    )
}

export default ProfileSidebar