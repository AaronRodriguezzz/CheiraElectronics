// src/pages/admin/TechnicianAssign.jsx
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { update_data } from "../../services/putMethod";

const rows = [
  { id: 1, requestId: "REQ123", technician: "Alex Cruz", assignedAt: "2025-07-15" },
];

export default function TechnicianAssign() {
  const [isReassigning, setIsReassigning] = useState(false);

  const updateStatus = async (newStatus) => {
    try {
      const updateResponse = await update_data('/update_request_status', { status: newStatus });
      if (updateResponse) {
        console.log("Status updated successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "requestId", headerName: "Request ID", flex: 1 },
    { field: "technician", headerName: "Technician", flex: 1 },
    { field: "assignedAt", headerName: "Assigned At", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="h-full flex items-center gap-2">
          <Button 
            variant="contained" 
            size="small" 
            sx={{bgcolor: 'green'}}
            onClick={() => updateStatus('Finished', params.row._id)}
          >
            Finish
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            color="error"
            onClick={() => updateStatus('Failed', params.row._id)}
          >
            Failed
          </Button>
          <Button 
            variant="contained" 
            size="small"
            onClick={() => setIsReassigning(true)}
          >
            Reassigned
          </Button>
        </div>      
      ),
    },
  ];

  return (
    <div>

      <div className="w-full p-4 bg-white shadow my-4 rounded-md">
        <input 
          type="text" 
          placeholder="Search name,service type, date, etc."
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"/>
      </div>

      <DataGrid rows={rows} columns={columns} pagination />
    </div>
  );
}
