import React from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { update_data } from '../../services/putMethod';

const rows = [
  { id: 1, customer: "John", status: "Pending", service: "Screen Repair" },
];

export default function ServiceRequests() {

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
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "service", headerName: "Service", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="h-full flex items-center gap-2">
          <Button
            variant="contained"
            size="small"
            onClick={() => updateStatus("In Progress")}
          >
            Approve
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => updateStatus("Rejected")}
          >
            Reject
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
          placeholder="Search name, service type, date, etc."
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
        />
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        // getRowId={(row) => r ow._id} // 👈 This tells MUI to use _id as the unique identifier
        autoHeight
        pagination
      />
    </div>
  );
}
  