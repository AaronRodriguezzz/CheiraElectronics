import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { get_data } from "../../services/getMethod";
import { update_data } from "../../services/putMethod";
import ServiceForm from "../../components/modals/serviceModal";

export default function ServiceCatalog() {
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);

  const [allServices, setAllServices] = useState([]); // ✅ original data
  const [services, setServices] = useState([]);       // ✅ filtered data
  const [search, setSearch] = useState("");

  const handleDeactivate = async (row) => {
    try {
      const payload = { ...row, id: row._id, isActive: false };
      const response = await update_data("/update-service", payload);

      if (response.updated) {
        setAllServices((prev) =>
          prev.map((item) =>
            item._id === response.service._id ? response.service : item
          )
        );
        setServices((prev) =>
          prev.map((item) =>
            item._id === response.service._id ? response.service : item
          )
        );
      }
    } catch (err) {
      console.error("Failed to deactivate service:", err);
    }
  };

  const columns = [
    { field: "serviceCategory", headerName: "Category", flex: 1 },
    { field: "description", headerName: "Service Description", flex: 1 },
    { field: "price", headerName: "Price (₱)", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "createdAt", headerName: "Date Added", flex: 1 },
    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span
          className={`p-2 rounded-full text-sm font-medium ${
            params.value ? "text-green-600" : "text-red-500"
          }`}
        >
          {params.value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.2,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setIsUpdating(true);
              setDataToUpdate(params.row);
            }}
          >
            Update
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleDeactivate(params.row)}
            disabled={!params.row.isActive}
          >
            {params.row.isActive ? "Deactivate" : "Inactive"}
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      const response = await get_data("/services");
      if (response) {
        setAllServices(response);
        setServices(response);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  // ✅ Frontend filter
  const handleSearch = () => {
    const value = search.toLowerCase();
    const filtered = allServices.filter((item) =>
      item.serviceCategory?.toLowerCase().includes(value) ||
      item.description?.toLowerCase().includes(value) ||
      String(item.price)?.includes(value) ||
      item.createdAt?.toLowerCase().includes(value) ||
      (item.isActive ? "active" : "inactive").includes(value)
    );
    setServices(filtered);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading services...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header Bar */}
      <div className="w-full flex p-4 gap-x-4 bg-white shadow my-4 rounded-md">
        <input
          type="text"
          placeholder="Search service name, category, or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
        />
        <Button variant="contained" onClick={handleSearch}>Search</Button>
        <button
          className="w-[160px] rounded-lg text-white bg-orange-500 hover:bg-orange-600"
          onClick={() => setIsAdding(true)}
        >
          NEW SERVICE
        </button>
      </div>

      {/* Data Grid */}
      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: "1350px" }}>
          <DataGrid
            rows={services}
            columns={columns}
            getRowId={(row) => row._id}
            pagination
            disableRowSelectionOnClick
          />
        </div>
      </div>

      {/* Add Modal */}
      {isAdding && (
        <ServiceForm
          onCancel={setIsAdding}
          route={"/new-service"}
          updatedData={setServices}
        />
      )}

      {/* Edit Modal */}
      {isUpdating && (
        <ServiceForm
          onCancel={setIsUpdating}
          route={"/update-service"}
          serviceData={dataToUpdate}
          updatedData={setServices}
        />
      )}
    </div>
  );
}
