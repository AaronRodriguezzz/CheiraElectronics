import React, { useState } from 'react';
import { update_data } from '../../services/putMethod';
import { useAuth } from "../../contexts/UserContext";
import Rating from "@mui/material/Rating";

const ReopenRequestModal = ({ onCancel, requestData, updatedData }) => {
    const { user } = useAuth();
    const [remarks, setRemarks] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleReopen = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                id: requestData?._id,
                email: requestData?.email,
                serviceType: requestData?.serviceType,
                status: 'Reopened',
                remarks: remarks,
                updatedBy: user?._id
            };

            const response = await update_data(
                requestData.type === 'Online-Requests' ? '/update-request' : '/update-walkin',
                payload
            );

            if (response) {
                updatedData(prev => prev.filter(r => r._id !== response._id));
                onCancel();
            }
        } catch (err) {
            console.error('Failed to reopen request:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen fixed top-0 left-0 z-50 bg-black/30 flex items-center justify-center">
            <form
                onSubmit={handleReopen}
                className="w-[90%] max-w-[400px] bg-white p-6 rounded shadow"
            >
                <h2 className="text-xl font-semibold mb-4 text-orange-600">Reopen Request</h2>

                <p className="text-md mb-1 text-gray-700">
                    <strong>Service:</strong> {requestData?.serviceCategory}
                </p>
                <p className="text-md mb-1 text-gray-700">
                    <strong>Customer:</strong> {requestData?.customer}
                </p>

                <p className="text-md mb-1 text-gray-700">
                    <strong>Price:</strong> {requestData?.price ? `₱${requestData.price}` : "N/A"}
                </p>

                {requestData?.rating && (
                    <div className="flex items-center gap-2 mt-1 mb-3">
                        <strong className="text-gray-700">Rating:</strong>
                        {requestData.rating !== 0 ? (
                            <Rating value={requestData.rating} readOnly />
                        ) : 'No Rating Yet'}
                    </div>
                )}

                <label className="block text-md mb-1 font-medium">Remarks / Reason for Reopening</label>
                <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    rows={3}
                    placeholder="Explain why this request is being reopened..."
                    required
                />

                <div className="flex justify-end gap-2 mt-5">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700"
                    >
                        {isLoading ? 'Reopening...' : 'Reopen'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReopenRequestModal;
