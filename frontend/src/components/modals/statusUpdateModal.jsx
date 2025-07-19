import React, { useState } from 'react';
import { update_data } from '../../services/putMethod';

const UpdateRequestModal = ({ onCancel, requestData, updatedData, newStatus }) => {
  const admin = JSON.parse(localStorage.getItem('admin'))
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) return;

    setIsLoading(true);

    try {
      const payload = {
        id: requestData._id,
        status: newStatus,
        remarks: reason,
        updatedBy: admin?._id
      };

      const response = await update_data('/update-request',  payload);

      if (response) {
        updatedData((prev) =>
          prev.filter((r) => (r._id !== response._id ))
        );
        onCancel(false);
      }
    } catch (err) {
      console.error('Failed to update request:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 z-50 bg-black/30 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-[400px] bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4 text-red-600">Updating Request</h2>

        <p className="mb-2 text-sm text-gray-700">
          <strong>Service:</strong> {requestData?.serviceType}
        </p>
        <p className="mb-4 text-sm text-gray-700">
          <strong>Date:</strong> {requestData?.submittedAt?.split('T')[0]}
        </p>

        <label className="block text-sm mb-1 font-medium">Remarks</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          rows={4}
          placeholder="Please provide a remarks"
          required
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
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            {isLoading ? 'Rejecting...' : 'Reject'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRequestModal;
