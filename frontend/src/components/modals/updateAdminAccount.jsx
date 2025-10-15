import React, { useEffect, useState } from "react";
import { update_data } from "../../services/putMethod";

const AdminUpdateModal = ({ adminData, onClose, onUpdated }) => {
    const [admin, setAdmin] = useState({
        id: "",
        full_name: "",
        email: "",
        password: "",
        status: "Active",
    });
 
    const [isLoading, setIsLoading] = useState(false);

    // Preload admin data when modal opens
    useEffect(() => {
        if (adminData) {
            setAdmin({
                id: adminData._id,
                full_name: adminData.full_name || "",
                email: adminData.email || "",
                password: "",
                status: adminData.status || "Active",
            });
        }
    }, [adminData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {

            const response = await update_data(`/update-admin-account`, admin);

            if (response) {
                console.log(response);
                onUpdated((prev) =>
                    prev.map((item) =>
                        item._id === response.admin._id ? response.admin : item
                    )
                );
                onClose();
            }

        } catch (err) {
            console.error("Error updating admin:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-semibold mb-4 text-green-500">Update Admin Account</h2>

                <div className="flex flex-col gap-2">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={admin.full_name}
                        onChange={(e) =>
                        setAdmin({ ...admin, full_name: e.target.value })
                        }
                        required
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        value={admin.email}
                        onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
                        required
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />

                    <label>New Password (optional)</label>
                    <input
                        type="password"
                        minLength={8}
                        value={admin.password}
                        onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />

                    <label>Status</label>
                    <select
                        value={admin.status}
                        onChange={(e) => setAdmin({ ...admin, status: e.target.value })}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                    >
                        {isLoading ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminUpdateModal;
