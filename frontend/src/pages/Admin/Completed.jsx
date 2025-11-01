import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import { FaTruckPickup, FaSearch, FaEye, FaTimes } from "react-icons/fa";
import { get_data } from "../../services/getMethod";
import PickUpModal from "../../components/modals/pickUpModal";
import ViewServiceRequestModal from "../../components/modals/viewRequestModal";

export default function CompletedRequests() {

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
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
      width: 150,
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
      width: 200,
      renderCell: (params) => (
        <div className="h-full flex items-center gap-2">

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
              onClick={() => {
                setSelectedRequest(params.row);
                setIsViewing(true);
              }}
            >
              <FaEye size={16} />
            </Button>
          </Tooltip>

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

        const combined = [...(formattedRequests || []), ...(formattedWalkIns || [])];
        setRequests(combined);
        setFilteredRequests(combined);
      } catch (err) {
        console.error("Error fetching pickup requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // ✅ Search Handler
  const handleSearch = (text) => {
    setSearch(text);
    if (!text.trim()) {
      setFilteredRequests(requests);
      return;
    }

    const lower = text.toLowerCase();
    const filtered = requests.filter(
      (r) =>
        r.customer?.toLowerCase().includes(lower) ||
        r.serviceCategory?.toLowerCase().includes(lower) ||
        r.contactNumber?.includes(lower) ||
        r.servicePrice?.toLowerCase().includes(lower) ||
        r.downPayment?.toLowerCase().includes(lower)
    );

    setFilteredRequests(filtered);
  };

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
            placeholder="Search by name, category, price, etc..."
            className="w-full bg-gray-100 pl-10 pr-10 py-2 rounded-lg outline-gray-300"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {search && (
            <FaTimes
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              onClick={() => handleSearch("")}
            />
          )}
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

      {showClaim && (
        <PickUpModal
          onCancel={setShowClaim}
          requestData={selectedRequest}
          updatedData={setRequests}
        />
      )}

      {isViewing && (
        <ViewServiceRequestModal
          isOpen={isViewing}
          onClose={() => setIsViewing(false)}
          request={selectedRequest}
        />
      )}
    </div>
  );
}
