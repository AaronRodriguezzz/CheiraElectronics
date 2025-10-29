import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { post_data } from '../../services/PostMethod';
import { update_data } from '../../services/putMethod';

const AdminForm = ({ onCancel, route, updatedData, adminData = null }) => {
  const isEdit = Boolean(adminData);
  const [isLoading, setIsLoading] = useState(false);

  const [admin, setAdmin] = useState({
    id: '',
    full_name: '',
    email: '',
    password: '',
    role: 'Admin',
    status: 'Active',
  });

  useEffect(() => {
    if (isEdit) {
      setAdmin({
        id: adminData?._id,
        full_name: adminData?.full_name || '',
        email: adminData?.email || '',
        password: '', // Leave empty for security. Can require it if desired.
        role: adminData?.role || 'Admin',
        status: adminData?.status || 'Active',
      });
    }
  }, [adminData]);

  const debouncedSubmit = useCallback(
    debounce(async (formData) => {
        setIsLoading(true);

        const payload = { ...formData };
        if (isEdit && !payload.password) delete payload.password; 
        if(!isEdit) delete payload.id;

        const response = isEdit
            ? await update_data(route, payload)
            : await post_data(route, payload);

        if (response.added || response.updated) {
            updatedData((prev) =>
            isEdit
                ? prev.map((admin) =>
                    admin._id === response.admin._id ? response.admin : admin
                )
                : [response.admin, ...prev]
            );
            onCancel(false);
        }
        
    }, 500),
    [route, onCancel, isEdit]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSubmit(admin);
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-transparent fixed top-0 left-0 z-50">
      <form
        className="w-[90%] max-w-[400px] bg-white rounded-lg shadow-sm p-5 shadow-gray-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-4 tracking-tight">
          {isEdit ? 'Edit Admin' : 'New Admin'}
        </h1>

        <div className="flex flex-col tracking-tighter">
          <label className="mt-2">Full Name</label>
          <input
            value={admin.full_name}
            onChange={(e) => setAdmin({ ...admin, full_name: e.target.value })}
            className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
            required
          />

          <label className="mt-2">Email</label>
          <input
            type="email"
            value={admin.email}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
            required
          />

          {!isEdit && (
            <>
              <label className="mt-2">Password</label>
              <input
                type="password"
                minLength={8}
                value={admin.password}
                onChange={(e) =>
                  setAdmin({ ...admin, password: e.target.value })
                }
                className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
                required={!isEdit}
              />
            </>
          )}

          <label className="mt-2" htmlFor='role'>Role</label>
          <input
            type="role"
            value={admin.role}
            className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
            disabled
            required
          />


          <label className="mt-2">Status</label>
          <select
            value={admin.status}
            onChange={(e) => setAdmin({ ...admin, status: e.target.value })}
            className="border border-gray-200 px-3 py-2 rounded-md focus:border-gray-300"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Removed">Removed</option>
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

export default AdminForm;
