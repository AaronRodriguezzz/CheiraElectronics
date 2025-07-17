// src/pages/admin/Feedback.jsx
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const rows = [
  { id: 1, customer: "John Dela Cruz", rating: 5, comment: "Great service!" },
];

const columns = [
  { field: "customer", headerName: "Customer", flex: 1 },
  { field: "rating", headerName: "Rating", flex: 1 },
  { field: "comment", headerName: "Comment", flex: 2 },
];

export default function Feedback() {
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
