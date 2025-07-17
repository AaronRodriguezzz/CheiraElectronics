import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { post_data } from '../../services/postMethod';
import { update_data } from '../../services/putMethod';
import { get_data } from '../../services/getMethod';


const ServiceForm = ({ onCancel, route, updatedData, serviceData = null }) => {
  const isEdit = Boolean(serviceData);
  const [isLoading, setIsLoading] = useState(false);
  
  const [service, setService] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    duration: '',
    isActive: true,
  });

  useEffect(() => {
    if (isEdit) {
      setService({
        id: serviceData?._id,
        name: serviceData?.name || '',
        description: serviceData?.description || '',
        price: serviceData?.price || '',
        duration: serviceData?.duration || '',
        isActive: serviceData?.isActive ?? true,
      });
    }
  }, [serviceData]);

  const debouncedSubmit = useCallback(
    debounce(async (formData) => {
      setIsLoading(true)

      const response = isEdit
        ? await update_data(route, formData)
        : await post_data(route, formData);

      if (response.updated || response.added) {
        updatedData((prev) => prev.map((service) => service._id === response.service._id ? response.service : service ))
        onCancel(false);
        setIsLoading(false)
      }
      
    }, 500),
    [route, onCancel, isEdit, serviceData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    debouncedSubmit(service);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-transparent fixed top-0 left-0 z-50">
      <form
        className="w-[90%] max-w-[400px] bg-white rounded-lg shadow-sm p-5 shadow-gray-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-4 tracking-tight">
          {isEdit ? 'Edit Service' : 'New Service'}
        </h1>

        <div className="flex flex-col tracking-tighter">
          <label className="mt-2">Service Name</label>
          <input
            value={service.name}
            onChange={(e) => setService({ ...service, name: e.target.value })}
            className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
            required
          />

          <label className="mt-2">Description</label>
          <textarea
            value={service.description}
            onChange={(e) => setService({ ...service, description: e.target.value })}
            className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
            rows={3}
          />

          <label className="mt-2">Price (₱)</label>
          <input
            type="number"
            min="0"
            value={service.price}
            onChange={(e) => setService({ ...service, price: e.target.value })}
            className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
            required
          />

          <label className="mt-2">Duration (e.g. 30 mins)</label>
          <input
            value={service.duration}
            onChange={(e) => setService({ ...service, duration: e.target.value })}
            className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
          />

          <label className="mt-2">Status</label>
          <select
            value={service.isActive ? 'true' : 'false'}
            onChange={(e) => setService({ ...service, isActive: e.target.value === 'true' })}
            className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => onCancel(false)}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {isEdit ? 'Update' : 'Finish'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
