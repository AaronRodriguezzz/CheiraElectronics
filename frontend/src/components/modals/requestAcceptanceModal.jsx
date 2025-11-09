import React, { useEffect, useState } from 'react';
import { update_data } from '../../services/putMethod';
import { get_data } from '../../services/getMethod';

const AssignTechnicianForm = ({ onCancel, requestData, updatedData }) => {
  const [technicians, setTechnicians] = useState([]);
  const [technicianId, setTechnicianId] = useState(requestData.technicianId || '');
  const [downPayment, setDownPayment] = useState('')
  const [servicePrice, setServicePrice] = useState(requestData.servicePrice || 0);
  const [remarks, setRemarks] = useState(requestData.remarks || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!technicianId || !servicePrice || !remarks) return;

    setIsLoading(true);

    try {
      const payload = {
        id: requestData?._id,
        email: requestData?.email,
        serviceType: requestData?.serviceType,
        status: 'In Progress',
        downPayment: downPayment,
        technician: technicianId,   
        servicePrice: servicePrice,
        remarks: remarks
      };

      const response = await update_data('/accept-request', payload);

      if (response) {

        updatedData((prev) => {
          if (requestData?.technicianId) {
            return prev.map((r) => {
              if (r._id === response._id) {
                return {
                  ...response,
                  customer: response.customer?.full_name,
                  contactNumber: response.customer?.contact_number,
                  technician: response.technician?.full_name,
                  technicianId: response.technician?._id,
                };
              }
              return r;
            });
          } else {
            return prev.filter((r) => r._id !== response._id);
          }
        });
      
        onCancel(false);
      } 
      
    } catch (err) {
      console.error('Error updating request:', err);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="h-screen w-screen fixed top-0 left-0 z-50 bg-black/30 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-[400px] bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Assign Technician</h2>
        <p className="mb-2 text-md">
          <strong>Customer:</strong> {requestData?.customer}
        </p>
        <p className="mb-2 text-md">
          <strong>Contact:</strong> {requestData?.contactNumber}
        </p>
        <p className="mb-2 text-md">
          <strong>Category:</strong> {requestData?.serviceCategory}
        </p>
        <p className="mb-4 text-md">
          <strong>Request Date:</strong> {requestData?.submittedAt?.split('T')[0]}
        </p>

        <label className="block text-sm mb-1">Technician</label>
        <select
          required
          value={technicianId}
          onChange={(e) => setTechnicianId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value='' disabled>Select Technician</option>
          {technicians.map((tech) => (
            <option key={tech._id} value={tech._id}>
              {tech.full_name}
            </option>
          ))}
        </select>

        {!requestData?.technician && (
          <>
            <input 
              type="number" 
              className='w-full border px-3 py-2 rounded placeholder:text-black mt-2' 
              placeholder='Total Price'
              onChange={(e) => setServicePrice(e.target.value)}
              value={servicePrice}
            />
            
            <input 
              type="number" 
              className='w-full border px-3 py-2 rounded placeholder:text-black mt-2' 
              placeholder='Down Payment'
              onChange={(e) => setDownPayment(e.target.value)}
              value={downPayment}
            />
          </>
        )}

        <textarea
          placeholder="Remarks (optional)"
          value={remarks} 
          onChange={(e) => setRemarks(e.target.value)}
          rows={4}
          className='w-full border px-3 py-2 rounded placeholder:text-black mt-2'
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
            disabled={isLoading || technicianId === ''}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {isLoading ? 'Assigning...' : 'Assign'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignTechnicianForm;
