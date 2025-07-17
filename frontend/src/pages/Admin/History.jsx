// src/pages/admin/History.jsx
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const rows = [
  { id: 1, customer: "Jayson", service: "Battery Replacement", dateCompleted: "2025-07-10" },
    { id: 1, customer: "Jayson", service: "Battery Replacement", dateCompleted: "2025-07-10" },
  { id: 1, customer: "Jayson", service: "Battery Replacement", dateCompleted: "2025-07-10" },
  { id: 1, customer: "Jayson", service: "Battery Replacement", dateCompleted: "2025-07-10" },
  { id: 1, customer: "Jayson", service: "Battery Replacement", dateCompleted: "2025-07-10" },
  { id: 1, customer: "Jayson", service: "Battery Replacement", dateCompleted: "2025-07-10" },
  { id: 1, customer: "Jayson", service: "Battery Replacement", dateCompleted: "2025-07-10" },
  { id: 1, customer: "Jayson", service: "Battery Replacement", dateCompleted: "2025-07-10" },
  { id: 1, customer: "Jayson", service: "Battery Replacement", dateCompleted: "2025-07-10" },
  { id: 1, customer: "Jayson", service: "Battery Replacement", dateCompleted: "2025-07-10" },

];

const columns = [
  { field: "customer", headerName: "Customer", flex: 1 },
  { field: "service", headerName: "Service", flex: 1 },
  { field: "dateCompleted", headerName: "Date Completed", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    renderCell: () => (
      <Button variant="outlined" size="small">Print</Button>
    ),
  },
];

export default function History() {
  return (
    <div>

      <div className="w-full flex p-4 gap-x-4 bg-white shadow my-4 rounded-md">
        <input 
          type="text" 
          placeholder="Search name,service type, date, etc."
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
        />
      </div>

      <DataGrid rows={rows} columns={columns} autoHeight pagination />

      <div className="w-full flex justify-end mt-4">
        <Button variant="contained" className="mb-4">Export</Button>
      </div>
    </div>
  );
}
