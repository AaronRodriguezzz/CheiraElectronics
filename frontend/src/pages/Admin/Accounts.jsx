// src/pages/admin/ServiceCatalog.jsx
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { get_data } from "../../services/getMethod";
import AccountForm from "../../components/modals/accountModal";

export default function ServiceCatalog() {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState(null);

  const columns = [
    { field: "_id", headerName: "Admin Id", flex: 1 },
    { field: "full_name", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contact_number", headerName: "Contact Number", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "createdAt", headerName: "Date Added", flex: 1 },
  ];  

  useEffect(() => {
    const getServices = async () => {
      const accounts = await get_data('/accounts');

      if (accounts) {
        setAccounts(accounts);
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

        <Button variant="contained" className="mb-4" onClick={() => setIsAdding(true)}>New Admin</Button>
      </div>

      <DataGrid rows={accounts} columns={columns} getRowId={(row) => row._id} pagination />

      {isAdding && <AccountForm 
        onCancel={setIsAdding}
        route={'/new-account'}
        updatedData={setAccounts}
      />}
    </div>
  );
}
