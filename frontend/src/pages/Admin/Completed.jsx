import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import { get_data } from "../../services/getMethod";
import { FaTruckPickup, FaSearch, FaEye } from "react-icons/fa";
import PickUpModal from "../../components/modals/pickUpModal";

export default function CompletedRequests() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showClaim, setShowClaim] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null); 

  const columns = [
    { field: "customer", headerName: "Customer Name", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "serviceCategory", headerName: "Category", flex: 1 },
    { field: "servicePrice", headerName: "Price", flex: 1 },
    { field: "downPayment", headerName: "Down Payment", flex: 1 },
    {
      field: "type",
      headerName: "Type",
      width: 160,
      renderCell: (params) => (
        <span
          className={`${
            params.value === "Walk-In" ? "text-blue-500" : "text-green-500"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width:200,
      renderCell: (params) => (
        <div className="h-full flex items-center  gap-2">
          {/* ✅ View Button */}
          <Tooltip title="View Details">
            <Button
              variant="contained"
              size="medium"
              sx={{
                bgcolor: "#2563EB",
                color: "white",
                minWidth: 42,
                "&:hover": { bgcolor: "#1E40AF" },
              }}
            //   onClick={() => handleView(params.row)}
            >
              <FaEye size={16} />
            </Button>
          </Tooltip>

          {/* ✅ Mark as Picked Up Button */}
          <Tooltip title="Mark as Picked-Up">
            <Button
              variant="contained"
              size="medium"
              sx={{
                bgcolor: "#16A34A",
                color: "white",
                minWidth: 42,
                "&:hover": { bgcolor: "#15803D" },
              }}
              onClick={() => {
                setSelectedRequest(params.row);
                setShowClaim(true);
              }}
            >
              <FaTruckPickup size={16} />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await get_data("/for-pickup");

        const formattedRequests = response.onlineRequests?.map((req) => ({
          ...req,
          customer: req.customer?.full_name,
          contactNumber: req.customer?.contact_number,
          updatedBy: req?.updatedBy?.full_name,
          downPayment: `₱${req.downPayment}`,
          servicePrice: `₱${req.servicePrice}`,
        }));

        const formattedWalkIns = response.walkIns?.map((req) => ({
          ...req,
          customer: req.customer,
          email: req.email,
          contactNumber: req.contactNumber,
          updatedBy: req.updatedBy?.full_name,
          downPayment: `₱${req.downPayment}`,
          servicePrice: `₱${req.servicePrice}`,
        }));

        // ✅ Combine both lists correctly
        setRequests([...(formattedRequests || []), ...(formattedWalkIns || [])]);
      } catch (err) {
        console.error("Error fetching pickup requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(
    (r) =>
      r.customer?.toLowerCase().includes(search.toLowerCase()) ||
      r.serviceCategory?.toLowerCase().includes(search.toLowerCase()) ||
      r.contactNumber?.includes(search)
  );

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading pickup requests...</p>
      </div>
    );
  }

  return (
    <div>
      {/* 🔍 Search Bar */}
      <div className="w-full p-4 flex gap-2 bg-white shadow my-4 rounded-md">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, category, or contact..."
            className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-lg outline-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 📋 DataGrid Table */}
      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: "1200px" }}>
          <DataGrid
            rows={filteredRequests}
            columns={columns}
            getRowId={(row) => row._id}
            pagination
            autoHeight
          />
        </div>
      </div>

      {showClaim && <PickUpModal 
        onCancel={setShowClaim}
        requestData={selectedRequest}
        updatedData={setRequests}
      />}
    </div>
  );
}
