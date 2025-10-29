import React, { useState } from 'react';
import { update_data } from '../../services/putMethod';
import { useAuth } from "../../contexts/UserContext";

const FinishRequestModal = ({ onCancel, requestData, updatedData }) => {
    const { user } = useAuth();
    const [remarks, setRemarks] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFinish = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);

        try {
            const payload = {
                id: requestData?._id,
                email: requestData?.email,
                serviceType: requestData?.serviceType,
                status: 'Completed',
                remarks: remarks,
                updatedBy: user?._id
            };

            const response = await update_data(requestData.type === 'Online-Requests' ? '/update-request' : '/update-walkin', payload);

            if (response) {
                updatedData(prev => prev.filter(r => r._id !== response._id))
                onCancel(false);
            }
        } catch (err) {
        console.error('Failed to finish request:', err);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen fixed top-0 left-0 z-50 bg-black/30 flex items-center justify-center">
            <form
                onSubmit={handleFinish}
                className="w-[90%] max-w-[400px] bg-white p-6 rounded shadow"
            >
                <h2 className="text-xl font-semibold mb-4 text-green-700">Finish Request</h2>

                <p className="text-md mb-1 text-gray-700">
                    <strong>Service:</strong> {requestData?.serviceCategory}
                </p>
                <p className="text-md mb-1 text-gray-700">
                    <strong>Customer:</strong> {requestData?.customer}
                </p>
                <p className="text-md mb-4 text-gray-700">
                    <strong>Device Type:</strong> {requestData?.deviceType}
                </p>

                <label className="block text-md mb-1 font-medium">Remarks</label>
                <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    rows={3}
                    placeholder="Optional remarks about the service"
                />

                <div className="flex justify-end gap-2 mt-5">
                    <button
                        type="button"
                        onClick={() => onCancel(false)}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                        {isLoading ? 'Submitting...' : 'Finish'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FinishRequestModal;
