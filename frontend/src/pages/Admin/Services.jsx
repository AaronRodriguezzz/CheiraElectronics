// src/pages/admin/ServiceCatalog.jsx
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { get_data } from "../../services/getMethod";
import ServiceForm from "../../components/modals/serviceModal";

export default function ServiceCatalog() {
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState(null);

  const columns = [
    { field: "_id", headerName: "Service Id", flex: 1 },
    { field: "name", headerName: "Service Name", flex: 1 },
    { field: "price", headerName: "Price (₱)", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "createdAt", headerName: "Date Added", flex: 1 },
    { 
      field: "isActive", 
      headerName: "Status", 
      flex: 1,
      renderCell: (params) => {
        console.log(params.value);
        return  <span className={`p-2 rounded-full ${params.value ? 'text-green-500' : 'text-red-500'}`}>
                  {params.value ? 'Active' : 'Inactive'}
                </span>
      } 
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="h-full flex items-center gap-2">
          <Button 
            variant="contained" 
            size="small"  
            onClick={() => {
              setIsUpdating(true);
              setDataToUpdate(params.row)
            }}
          >
            Update
          </Button>
          <Button variant="outlined" size="small" color="error">Delete</Button>
        </div>  
      ),
    },
  ];  

  useEffect(() => {
    const getServices = async () => {
      const services = await get_data('/services');

      if (services) {
        setServices(services);
        console.log(services);
      }

      setLoading(false);
    };

    getServices();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading services...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex p-4 gap-x-4 bg-white shadow my-4 rounded-md">
        <input 
          type="text" 
          placeholder="Search name,service type, date, etc."
          className="w-[90%] bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
        />

        <Button variant="contained" className="mb-4" onClick={() => setIsAdding(true)}>Add Service</Button>
      </div>

      <DataGrid rows={services} columns={columns} getRowId={(row) => row._id} pagination />

      {isAdding && <ServiceForm 
        onCancel={setIsAdding}
        route={'/new-service'}
      />}

      {isUpdating && <ServiceForm 
        onCancel={setIsUpdating}
        route={'/update-service'}
        serviceData={dataToUpdate}
        updatedData={setServices}
      />}
    </div>
  );
}
