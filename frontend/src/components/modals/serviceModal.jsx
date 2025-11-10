import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { post_data } from '../../services/PostMethod';
import { update_data } from '../../services/putMethod';
import { serviceCategories } from '../../data/ServiceCategory';

const ServiceForm = ({ onCancel, route, updatedData, serviceData = null }) => {
  const isEdit = Boolean(serviceData);
  const [isLoading, setIsLoading] = useState(false);

  const [service, setService] = useState({
    id: '',
    serviceCategory: '',
    description: '',
    price: '',
    duration: '',
    isActive: true,
  });

  // preload if editing
  useEffect(() => {
    if (isEdit) {
      setService({
        id: serviceData._id || '',
        serviceCategory: serviceData.serviceCategory || '',
        description: serviceData.description || '',
        price: serviceData.price || '',
        duration: serviceData.duration || '',
        isActive: serviceData.isActive ?? true,
      });
    }
  }, [serviceData, isEdit]);

  // submit (debounced)
  const debouncedSubmit = useCallback(
    debounce(async (formData) => {
      setIsLoading(true);

      let response;
      if (isEdit) {
        response = await update_data('/update-service', formData);
      } else {
        response = await post_data('/new-service', formData);
      }

      if (response?.added || response?.updated) {
        updatedData((prev) => {
          if (isEdit) {
            // update existing service in the list
            return prev.map((s) =>
              s._id === response.service._id ? response.service : s
            );
          } else {
            // add new service to the list
            return [response.service, ...prev];
          }
        });
        onCancel(false);
      }

      setIsLoading(false);
    }, 500),
    [route, onCancel, isEdit, updatedData]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSubmit(service);
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 z-50 bg-black/30 flex items-center justify-center">
      <form
        className="w-[90%] max-w-[400px] bg-white rounded-lg shadow-sm p-5 shadow-gray-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-4 tracking-tight">
          {isEdit ? 'Edit Service' : 'New Service'}
        </h1>

        <div className="flex flex-col tracking-tighter">
          {/* Service Category */}
          <label className="mb-1">Service Category</label>
          <select
            onChange={(e) => setService({ ...service, serviceCategory: e.target.value })}
            value={service.serviceCategory}
            required
            className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
          >
            <option value="" disabled>
              Select Service Category
            </option>
            {serviceCategories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Description */}
          <label className="mt-2">Description</label>
          <textarea
            value={service.description}
            onChange={(e) => setService({ ...service, description: e.target.value })}
            className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
            rows={3}
            required
          />

          {/* Price */}
          <label className="mt-2">Price (₱)</label>
          <input
            type="text"
            value={service.price}
            onChange={(e) => setService({ ...service, price: e.target.value })}
            className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
            required
          />

          {/* Duration */}
          <label className="mt-2">Duration (e.g. 30 mins)</label>
          <input
            value={service.duration}
            onChange={(e) => setService({ ...service, duration: e.target.value })}
            className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
            required
          />

          {/* Status */}
          <label className="mt-2">Status</label>
          <select
            value={service.isActive ? 'true' : 'false'}
            onChange={(e) =>
              setService({ ...service, isActive: e.target.value === 'true' })
            }
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
            {isLoading ? 'Saving...' : isEdit ? 'Update' : 'Finish'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
