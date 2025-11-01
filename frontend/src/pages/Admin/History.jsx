import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { get_data } from "../../services/getMethod";
import { statusColorMap } from "../../data/StatusColor";
import ViewServiceRequestModal from "../../components/modals/viewRequestModal";

export default function History() {
  const [allRequests, setAllRequests] = useState([]); // full data
  const [requests, setRequests] = useState([]); // filtered list
  const [loading, setLoading] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [requestToView, setRequestToView] = useState(null);
  const [search, setSearch] = useState("");

  const columns = [
    { field: "customer", headerName: "Customer Name", flex: 1 },
    { field: "contactNumber", headerName: "Contact", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "technician", headerName: "Technician", flex: 1 },
    { field: "updatedBy", headerName: "Updated By", flex: 1 },
    { field: "servicePrice", headerName: "Price", flex: 1 },
    {
      field: "updatedAt",
      headerName: "Date Updated",
      width: 150,
      renderCell: (params) => <span>{params.value.split("T")[0]}</span>,
    },
    {
      field: "type",
      headerName: "Type",
      width: 120,
      renderCell: (params) => (
        <span className={`${params.value === "Walk-In" ? "text-blue-500" : "text-green-500"}`}>
          {params.value}
        </span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span style={{ color: statusColorMap[params.value] }}>{params.value}</span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="h-full w-auto flex md:flex-row flex-col items-center gap-2">
          <Button variant="contained" size="small">Reopen</Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setRequestToView(params.row);
              setIsViewing(true);
            }}
            sx={{ fontSize: 12 }}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  const exportToExcel = () => {
    if (!allRequests.length) return alert("No data to export.");

    const ws = XLSX.utils.json_to_sheet(allRequests.length);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "History File");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "service-history.xlsx");
  };

  useEffect(() => {
    const getAllRequests = async () => {
      setLoading(true);
      try {
        const [requests, walkIns] = await Promise.all([
          get_data("/requests-history"),
          get_data("/finished-walkins"),
        ]);

        if (requests && walkIns) {
          const formattedRequests = requests.map((req) => ({
            ...req,
            customer: req.customer?.full_name,
            email: req.customer?.email,
            contactNumber: req.customer?.contact_number,
            technician: req.technician?.full_name,
            updatedBy: req?.updatedBy?.full_name,
            servicePrice: `₱${req.servicePrice}`,
          }));

          const formattedWalkIns = walkIns.map((req) => ({
            ...req,
            customer: req.customer,
            email: req.email,
            contactNumber: req.contactNumber,
            technician: req.technician?.full_name,
            updatedBy: req.updatedBy?.full_name,
            servicePrice: `₱${req.servicePrice}`,
          }));

          const combined = [...formattedRequests, ...formattedWalkIns];
          setAllRequests(combined);
          setRequests(combined);
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    getAllRequests();
  }, []);

  // ✅ Filter function (frontend only)
  const handleSearch = () => {
    const value = search.toLowerCase();
    const filtered = allRequests.filter((item) =>
      item.customer?.toLowerCase().includes(value) ||
      item.email?.toLowerCase().includes(value) ||
      item.technician?.toLowerCase().includes(value) ||
      item.updatedBy?.toLowerCase().includes(value) ||
      item.status?.toLowerCase().includes(value) ||
      item.type?.toLowerCase().includes(value) ||
      item.updatedAt?.toLowerCase().includes(value)
    );
    setRequests(filtered);
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
      {/* Search bar */}
      <div className="w-full flex p-4 gap-x-4 bg-white shadow my-4 rounded-md">
        <input
          type="text"
          placeholder="Search name, technician, status, date, etc."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
        />
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </div>

      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: "1350px" }}>
          <DataGrid rows={requests} columns={columns} getRowId={(row) => row._id} pagination />
        </div>
      </div>

      <div className="w-full flex justify-end mt-4">
        <Button variant="contained" className="mb-4" onClick={exportToExcel}>Export</Button>
      </div>

      {isViewing && (
        <ViewServiceRequestModal
          isOpen={isViewing}
          onClose={() => setIsViewing(false)}
          request={requestToView}
        />
      )}
    </div>
  );
}
