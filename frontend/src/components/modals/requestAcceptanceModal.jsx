import React, { useEffect, useState } from 'react';
import { update_data } from '../../services/putMethod';
import { get_data } from '../../services/getMethod';

const AssignTechnicianForm = ({ onCancel, requestData, updatedData }) => {
  const [technicians, setTechnicians] = useState([]);
  const [technicianId, setTechnicianId] = useState(requestData.technicianId || '');
  const [downPayment, setDownPayment] = useState(requestData.downPayment || '');
  const [servicePrice, setServicePrice] = useState(requestData.servicePrice || '');
  const [remarks, setRemarks] = useState(requestData.remarks || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await get_data('/technicians');
        setTechnicians(response || []);
      } catch (error) {
        console.error('Failed to load technicians:', error);
      }
    };
    fetchTechnicians();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!technicianId || !servicePrice || !remarks) return;

    setIsLoading(true);
    try {
      const payload = {
        id: requestData._id,
        email: requestData?.email,
        serviceType: requestData?.serviceType,
        status: 'In Progress',
        downPayment: Number(downPayment),
        technician: technicianId,
        servicePrice: Number(servicePrice),
        remarks,
      };

      const response = await update_data('/accept-request', payload);

      if (response) {
        window.location.reload();
      }
      
    } catch (err) {
      console.error('Error updating request:', err);
    } finally {
      setIsLoading(false);
      onCancel(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-[400px] bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Assign Technician</h2>

        {/* Customer info */}
        <p className="mb-2"><strong>Customer:</strong> {requestData.customer || 'N/A'}</p>
        <p className="mb-2"><strong>Contact:</strong> {requestData.contactNumber || 'N/A'}</p>
        <p className="mb-2"><strong>Category:</strong> {requestData.serviceCategory || 'N/A'}</p>
        <p className="mb-4"><strong>Request Date:</strong> {requestData.submittedAt?.split('T')[0] || 'N/A'}</p>

        {/* Technician selection */}
        <label className="block text-sm mb-1">Technician</label>
        <select
          required
          value={technicianId}
          onChange={(e) => setTechnicianId(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-2"
        >
          <option value="" disabled>Select Technician</option>
          {technicians.filter(t => t.status !== 'Inactive').map((tech) => (
            <option key={tech._id} value={tech._id}>
              {tech.full_name}
            </option>
          ))}
        </select>

        {/* Only show price and down payment if no technician assigned */}
        {!requestData?.technician && (
          <>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded placeholder:text-black mb-2"
              placeholder="Total Price"
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
              min="0"
            />

            <input
              type="number"
              className="w-full border px-3 py-2 rounded placeholder:text-black mb-2"
              placeholder="Down Payment"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              min="0"
              max={servicePrice || undefined}
            />
          </>
        )}

        {/* Remarks */}
        <textarea
          placeholder="Remarks (optional)"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={4}
          className="w-full border px-3 py-2 rounded placeholder:text-black mb-4"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onCancel(false)}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              isLoading || !technicianId || !servicePrice || Number(downPayment) > Number(servicePrice)
            }
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-600/50"
          >
            {isLoading ? 'Assigning...' : 'Assign'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignTechnicianForm;
