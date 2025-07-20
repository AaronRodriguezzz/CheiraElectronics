import React, { useState } from 'react';
import { update_data } from '../../services/putMethod';

const FinishRequestModal = ({ onCancel, requestData, updatedData }) => {
    const admin = JSON.parse(localStorage.getItem('admin'))
    const [servicePrice, setServicePrice] = useState('');
    const [remarks, setRemarks] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleFinish = async (e) => {
        e.preventDefault();
        console.log('request', requestData);
        
        if (!servicePrice || isNaN(servicePrice)) return alert("Price must be a number.");

        setIsLoading(true);

        try {
            const payload = {
                id: requestData?._id,
                email: requestData?.email,
                serviceType: requestData?.serviceType,
                status: 'Completed',
                remarks: remarks,
                price: Number(servicePrice),
                updatedBy: admin?._id
            };


            console.log(payload);

            const response = await update_data('/update-request', payload);

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

                <p className="text-sm mb-1 text-gray-700">
                    <strong>Service:</strong> {requestData?.serviceType}
                </p>
                <p className="text-sm mb-4 text-gray-700">
                    <strong>Customer:</strong> {requestData?.customer?.full_name}
                </p>

                <label className="block text-sm mb-1 font-medium">Service Price (₱)</label>
                <input
                    type="number"
                    min="0"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    className="w-full border px-3 py-2 rounded mb-3"
                    placeholder="Enter final service price"
                    required
                />

                <label className="block text-sm mb-1 font-medium">Remarks</label>
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
