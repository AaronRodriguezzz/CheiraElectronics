import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, PencilLine, Lock, Wrench, Power, ChevronRight, ChevronDown } from "lucide-react"

const ProfileSidebar = ({ open }) => {
    const user =  JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [requestHistoryOpen, setRequestHistoryOpen] = useState(false);
    
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
                        onClick={() => {setRequestHistoryOpen(!requestHistoryOpen); console.log('hello')}}
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

                {requestHistoryOpen && 
                <div className='max-h-[600px] overflow-y-auto mt-4 space-y-2'>
                    <div className='relative pl-6 p-2 text-sm'>
                        <div className='absolute h-full left-0 top-0 w-[10px] bg-yellow-500 rounded-l-lg'/>

                        <h1 className='max-w-[250px] text-lg  tracking-tighter font-semibold truncate overflow-hidden'>Cellphone Battery Replacement</h1>
                        <p>01/20/2025</p>
                        <p className='text-yellow-500'>Pending</p>
                    </div>

                    <div className='relative pl-6 p-2 text-sm'>
                        <div className='absolute h-full left-0 top-0 w-[10px] bg-orange-500 rounded-l-lg'/>

                        <h1 className='max-w-[250px] text-lg  tracking-tighter font-semibold truncate overflow-hidden'>Cellphone Battery Replacement</h1>
                        <p>01/20/2025</p>
                        <p className='text-orange-500'>In Progress</p>
                    </div>

                    <div className='relative pl-6 p-2 text-sm'>
                        <div className='absolute h-full left-0 top-0 w-[10px] bg-green-500 rounded-l-lg'/>

                        <h1 className='max-w-[250px] text-lg  tracking-tighter font-semibold truncate overflow-hidden'>Cellphone Battery Replacement</h1>
                        <p>01/20/2025</p>
                        <p className='text-green-500'>Completed</p>
                    </div>

                    <div className='relative pl-6 p-2 text-sm'>
                        <div className='absolute h-full left-0 top-0 w-[10px] bg-gray-500 rounded-l-lg'/>

                        <h1 className='max-w-[250px] text-lg  tracking-tighter font-semibold truncate overflow-hidden'>Cellphone Battery Replacement</h1>
                        <p>01/20/2025</p>
                        <p className='text-gray-500'>Reopened</p>
                    </div>

                    <div className='relative pl-6 p-2 text-sm'>
                        <div className='absolute h-full left-0 top-0 w-[10px] bg-red-500 rounded-l-lg'/>

                        <h1 className='max-w-[250px] text-lg  tracking-tighter font-semibold truncate overflow-hidden'>Cellphone Battery Replacement</h1>
                        <p>01/20/2025</p>
                        <p className='text-red-500'>Failed</p>
                    </div>
                    
                </div>}
            </div>
        </div>
    )
}

export default ProfileSidebar