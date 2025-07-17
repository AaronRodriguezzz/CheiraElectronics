import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { post_data } from '../../services/postMethod';
import { update_data } from '../../services/putMethod';
import { isFormValid } from '../../utils/objectValidation';
import CustomAlert from '../../components/modals/CustomerAlert';

const TechnicianForm = ({ onCancel, route, updatedData, technicianData = null }) => {
  const isEdit = Boolean(technicianData);

  const [technician, setTechnician] = useState({
    full_name: '',
    email: '',
    contact_number: '',
    status: 'Active',
  });

  useEffect(() => {
    if (isEdit) {
      setTechnician({
        id: technicianData?._id,
        full_name: technicianData?.full_name ,
        email: technicianData?.email,
        contact_number: technicianData?.contact_number,
        status: technicianData?.status || 'Active',
      });
    }
  }, [technicianData]);

  // Debounced submit function
  const debouncedSubmit = useCallback(

    debounce(async (formData) => {
      const formComplete =  isFormValid(formData)

      if(!formComplete) {
        CustomAlert('error',  'Form Is Incomplete');
      } 

      const response = isEdit
        ? await update_data(route, formData)
        : await post_data(route, formData);

      if (response.updated || response.added) {
        updatedData((prev) => prev.map((technician) => technician._id === response.technician._id ? response.technician : technician ))
        onCancel(false); 
      }

    }, 500),

    [route, onCancel, isEdit, technicianData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    debouncedSubmit(technician);
  };

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-transparent fixed top-0 left-0 z-50'>
      <form
        className='w-[90%] max-w-[400px] bg-white rounded-lg shadow-sm p-5 shadow-gray-200'
        onSubmit={handleSubmit}
      >
        <h1 className='text-2xl font-semibold mb-4 tracking-tight'>
          {isEdit ? 'Edit Technician' : 'New Technician'}
        </h1>

        <div className='flex flex-col tracking-tighter'>
          <label className='mt-2'>Full Name</label>
          <input
            value={technician.full_name}
            onChange={(e) => setTechnician({ ...technician, full_name: e.target.value })}
            className='border-1 border-gray-200 px-3 py-2 rounded-md focus:border-gray-300'
          />

          <label className='mt-2'>Email</label>
          <input
            type='email'
            value={technician.email}
            onChange={(e) => setTechnician({ ...technician, email: e.target.value })}
            className='border-1 border-gray-200 px-3 py-2 rounded-md focus:border-gray-300'
          />

          <label className='mt-2'>Contact Number</label>
          <input
            value={technician.contact_number}
            onChange={(e) => setTechnician({ ...technician, contact_number: e.target.value })}
            className='border-1 border-gray-200 px-3 py-2 rounded-md focus:border-gray-300'
          />

          <label className='mt-2'>Status</label>
          <select
            value={technician.status}
            onChange={(e) => setTechnician({ ...technician, status: e.target.value })}
            className='border-1 border-gray-200 px-3 py-2 rounded-md focus:border-gray-300'
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Removed">Removed</option>
          </select>
        </div>

        <div className='flex justify-end gap-2 mt-4'>
          <button
            type='button'
            onClick={() => onCancel(false)}
            className='px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition'
          >
            Cancel
          </button>

          <button
            type='submit'
            className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition'
          >
            {isEdit ? 'Update' : 'Finish'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TechnicianForm;
