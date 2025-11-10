import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import TechnicianForm from "../../components/modals/technicianModal";
import { get_data } from '../../services/getMethod';
import { update_data } from "../../services/putMethod";
import { statusColorMap } from "../../data/StatusColor";

export default function Technicians() {

  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [technician, setTechnician] = useState([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
        return (
          <span 
            className="p-2 rounded-full text-white"
            style={{ backgroundColor: statusColorMap[params.value] }}
          >
            {params.value}
          </span>
        );
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
            color={params.row.status === 'Active' ? "error" : "success"}
            onClick={() => handleDeactivate(params.row)}
          >
            {params.row.status === 'Active' ? "Deactivate" : "Activate"}
          </Button>
        </div> 
      ),
    },
  ];

  const handleDeactivate = async (row) => {
      try {
        const payload = { ...row, id: row._id, status: row.status === 'Active' ? "Inactive" : "Active" };
        const response = await update_data("/update-technician", payload);
  
        if (response.updated) {
          setTechnician(prev => prev.map(p => p._id ===  row._id ? response.technician : p))
        }
      } catch (err) {
        console.error("Failed to deactivate service:", err);
      }
  };

  // Fetch technicians
  useEffect(() => {
    const getTechnicians = async () => {
      const technicians = await get_data('/technicians');

      if (technicians) {
        setTechnician(technicians);
        setFilteredTechnicians(technicians); // ✅ default full list
      }

      setLoading(false);
    };

    getTechnicians();
  }, []);

  // Search filter effect
  useEffect(() => {
    const filtered = technician.filter((item) => {
      const search = searchQuery.toLowerCase();
      return (
        item.full_name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.contact_number.toLowerCase().includes(search) ||
        item.status.toLowerCase().includes(search)
      );
    });

    setFilteredTechnicians(filtered);
  }, [searchQuery, technician]);

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
          placeholder="Search name, email, status, etc."
          className="w-[90%] bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          className="w-[160px] rounded-lg text-white bg-orange-500 hover:bg-orange-600"
          onClick={() => setIsAdding(true)}
        >
          NEW TECHNICIAN
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: "1350px"}}>
          <DataGrid 
            rows={filteredTechnicians}
            columns={columns}
            getRowId={(row) => row._id}
            pagination
          />
        </div>
      </div>

      {isAdding && (
        <TechnicianForm 
          onCancel={setIsAdding}
          route={'/new-technician'}
        />
      )}

      {isUpdating && (
        <TechnicianForm 
          onCancel={setIsUpdating}
          route={'/update-technician'}
          technicianData={dataToUpdate}
          updatedData={setTechnician}
        />
      )}
    </div>
  );
}
