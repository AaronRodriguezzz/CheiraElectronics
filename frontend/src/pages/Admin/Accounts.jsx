// src/pages/admin/ServiceCatalog.jsx
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { get_data } from "../../services/getMethod";
import AccountForm from "../../components/modals/accountModal"; // existing modal for new admin
import AdminUpdateModal from "../../components/modals/updateAdminAccount";
import { statusColorMap } from "../../data/StatusColor";

export default function ServiceCatalog() {
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // 🔹 controls update modal visibility
  const [selectedAdmin, setSelectedAdmin] = useState(null); // 🔹 stores admin to edit
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  const columns = [
    { field: "_id", headerName: "Admin Id", flex: 1 },
    { field: "full_name", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span
          className="p-2 rounded-full text-white"
          style={{
            backgroundColor: statusColorMap[params.value] || "#6b7280",
          }}
        >
          {params.value}
        </span>
      ),
    },
    { field: "createdAt", headerName: "Date Added", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-2 items-center">
          <Button
            variant="contained"
            size="small"
            onClick={() => handleUpdateClick(params.row)} // 🔹 triggers update modal
          >
            Update
          </Button>
        </div>
      ),
    },
  ];

  // 🔹 Handles opening update modal
  const handleUpdateClick = (admin) => {
    setSelectedAdmin(admin);
    setIsUpdating(true);
  };

  const filteredRows =
    accounts &&
    accounts.filter((account) =>
      Object.values(account).some((value) =>
        String(value).toLowerCase().includes(searchTxt.toLowerCase())
      )
    );

  useEffect(() => {
    const fetchAccounts = async () => {
      const result = await get_data("/accounts");
      if (result) setAccounts(result);
      setLoading(false);
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading accounts...</p>
      </div>
    );
  }

  return (
    <div>
      {/* 🔍 Search and Add Button */}
      <div className="w-full flex p-4 gap-x-4 bg-white shadow my-4 rounded-md">
        <input
          type="text"
          placeholder="Search name, email, date, etc."
          className="w-[90%] bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
        />

        <Button
          variant="contained"
          className="w-[10%] min-w-[300px] mb-4"
          onClick={() => setIsAdding(true)}
        >
          New Admin
        </Button>
      </div>

      {/* 📋 Data Table */}
      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: "1350px" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={(row) => row._id}
            pagination
            disableRowSelectionOnClick
          />
        </div>
      </div>

      {/* 🟢 Add New Admin Modal */}
      {isAdding && (
        <AccountForm
          onCancel={setIsAdding}
          route={"/new-account"}
          updatedData={setAccounts}
        />
      )}

      {/* 🟡 Update Admin Modal */}
      {isUpdating && (
        <AdminUpdateModal
          adminData={selectedAdmin}
          onClose={() => setIsUpdating(false)}
          onUpdated={setAccounts}
        />
      )}
    </div>
  );
}
