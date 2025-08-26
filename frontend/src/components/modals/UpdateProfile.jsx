import React, { useState } from 'react'
import { update_data } from '../../services/putMethod';

const UpdateProfile = ({onClose, user}) => {

    const [customerProfile, setCustomerProfile] = useState({
        customerId: user._id || '',
        full_name: user.full_name || '',
        contact_number: user.contact_number || '',
        address: user.address || '',
        email: user.email || '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;

        setCustomerProfile(prevState => ({
            ...prevState,
            [id]: value
        }));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!customerProfile.full_name || !customerProfile.contact_number || !customerProfile.address || !customerProfile.email){
            alert("Please fill all the fields.");
            return;
        }

        try{
            const res = await update_data('/update-info', customerProfile);
    
            if(res) {
                localStorage.setItem('user', JSON.stringify(res.customer));
                window.location.reload()
            }
                
        }catch(err){
            console.log(err);
        }
    }


    return (
        <div>
            <div class="fixed top-1/4 left-1/2 transform -translate-x-1/2">
                <div class="bg-white p-6 rounded shadow-lg w-96">
                    <h2 class="text-xl font-semibold mb-4">Update Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-4">
                            <label class="block text-sm font-medium mb-1" for="fullName">
                                Full Name
                            </label>
                            <input 
                                type="text"
                                id="full_name"
                                class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={customerProfile.full_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium mb-1" for="email">
                                Email
                            </label>
                            <input 
                                type="text"
                                id="email"
                                class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={customerProfile.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium mb-1" for="contact_number">
                                Contact Number
                            </label>
                            <input 
                                type="text"
                                id="contact_number"
                                class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={customerProfile.contact_number}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium mb-1" for="address">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={customerProfile.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div class="flex justify-end gap-2">
                            <button 
                                type="button"
                                class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                onClick={() => onClose(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                class="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile