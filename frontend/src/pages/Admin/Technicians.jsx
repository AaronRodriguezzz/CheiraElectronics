// src/pages/admin/Technicians.jsx
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import TechnicianForm from "../../components/modals/technicianModal";
import { get_data } from '../../services/getMethod';
import { statusColorMap } from "../../data/StatusColor";

export default function Technicians() {

  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [technician, setTechnician] = useState(null);

  const columns = [
    { field: "_id", headerName: "Technician Id", flex: 1 },
    { field: "full_name", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contact_number", headerName: "Contact Number", flex: 1 },
    { 
      field: "status", 
      headerName: "Status", 
      width: 120,
      renderCell: (params) => {
        return <span 
          className={`p-2 rounded-full text-white bg-${statusColorMap[params.value]}`}
          style={{ backgroundColor: statusColorMap[params.value] }}
        >
          {params.value}
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
            onClick={() =>{ 
              setIsUpdating(true)
              setDataToUpdate(params.row)
            }}
          >
            Update
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            color="error"
          >
            Delete
          </Button>
        </div> 
      ),
    },
  ];

  useEffect(() => {
    const getTechnicians = async () => {
      const technicians = await get_data('/technicians');

      if(technicians){
        setTechnician(technicians);
      }

      setLoading(false)
    }

    getTechnicians();
  },[])

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
      
        <Button 
          variant="contained" 
          className="mb-4" 
          sx={{flex: 1, fontSize: {md: '10px', lg: '12px'}}}
          onClick={() => setIsAdding(true)}
        >
          Add Technician
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: "1350px"}}>
          <DataGrid 
            rows={technician} 
            columns={columns} 
            getRowId={(row) => row._id} 
            pagination 
          />
        </div>
      </div>

      {isAdding && <TechnicianForm 
        onCancel={setIsAdding}
        route={'/new-technician'}
      />}

      {isUpdating && <TechnicianForm 
        onCancel={setIsUpdating}
        route={'/update-technician'}
        technicianData={dataToUpdate}
        updatedData={setTechnician}
      />}
    </div>
  );
}
