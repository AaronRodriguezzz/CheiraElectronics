import React from 'react'
import { update_data } from '../../services/putMethod';

const ChangePasswordModal = ({ onClose, userId }) => {

    const [passwordData, setPasswordData] = React.useState({
        currentPassword: '',    
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;

        setPasswordData(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(passwordData.newPassword !== passwordData.confirmPassword){
            alert("New password and confirm password do not match.");   
            return;
        }

        try{
            const res = await update_data(`/update-password/${userId}`, passwordData );

            if(res.updated) window.location.reload();
            
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div class="fixed top-1/4 left-1/2 transform -translate-x-1/2">
            <div class="bg-black/90 p-6 rounded shadow-lg w-96 text-white">
                <h2 class="text-xl font-semibold mb-4">Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1" for="currentPassword">
                            Current Password
                        </label>
                        <input 
                            type="password"
                            id="currentPassword"
                            class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={passwordData.currentPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1" for="newPassword">
                            New Password
                        </label>
                        <input 
                            type="password"
                            id="newPassword"
                            class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={passwordData.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-1" for="confirmPassword">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            class="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={passwordData.confirmPassword}
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
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>  
    )
}

export default ChangePasswordModal;