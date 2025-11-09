import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import { get_data } from "../../services/getMethod";
import { statusColorMap } from "../../data/StatusColor";
import UpdateRequestModal from "../../components/modals/statusUpdateModal";
import AssignTechnicianForm from "../../components/modals/requestAcceptanceModal";
import FinishRequestModal from "../../components/modals/finishRequests";
import WalkInRequestModal from "../../components/modals/walkInRequestModal";
import ViewServiceRequestModal from "../../components/modals/viewRequestModal";
import { FaCheckCircle, FaTimesCircle, FaSyncAlt, FaEye } from "react-icons/fa";

export default function TechnicianAssign() {
  const [requests, setRequests] = useState(null);
  const [filteredRequests, setFilteredRequests] = useState(null);
  const [search, setSearch] = useState("");

  const [isReassigning, setIsReassigning] = useState(false);
  const [isFailing, setIsFailing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [requestToView, setRequestToView] = useState(null);
  const [requestToUpdate, setRequestToUpdate] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "customer", headerName: "Customer Name", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "serviceCategory", headerName: "Category", flex: 1 },
    { field: "technician", headerName: "Technician", flex: 1 },
    { field: "technicianId", headerName: "Technician", hide: true },
    { field: "email", headerName: "Email", hide: true },
    {
      field: "submittedAt",
      headerName: "Date Requested",
      width: 150,
      renderCell: (params) => <span>{params.value.split("T")[0]}</span>,
    },
    {
      field: "type",
      headerName: "Type",
      width: 120,
      renderCell: (params) => (
        <span className={params.value === "Walk-In" ? "text-blue-500" : "text-green-500"}>
          {params.value}
        </span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span
          className="p-2 rounded-full text-white"
          style={{ backgroundColor: statusColorMap[params.value] }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.2,
      renderCell: (params) => (
        <div className="h-full flex items-center justify-center gap-2">
          <Tooltip title="View Request">
            <Button
              variant="contained"
              size="medium"
              sx={{
                bgcolor: "#3B82F6",
                color: "white",
                minWidth: 42,
                "&:hover": { bgcolor: "#2563EB" },
              }}
              onClick={() => {
                setRequestToView(params.row);
                setIsViewing(true);
              }}
            >
              <FaEye size={16} />
            </Button>
          </Tooltip>

          <Tooltip title="Finish Request">
            <Button
              variant="contained"
              size="medium"
              sx={{
                bgcolor: "green",
                color: "white",
                minWidth: 42,
                "&:hover": { bgcolor: "#065F46" },
              }}
              onClick={() => {
                setRequestToUpdate(params.row);
                setIsFinished(true);
              }}
            >
              <FaCheckCircle size={16} />
            </Button>
          </Tooltip>

          <Tooltip title="Mark as Failed">
            <Button
              variant="contained"
              size="medium"
              sx={{
                bgcolor: "#EF4444",
                color: "white",
                minWidth: 42,
                "&:hover": { bgcolor: "#DC2626" },
              }}
              onClick={() => {
                setRequestToUpdate(params.row);
                setIsFailing(true);
              }}
            >
              <FaTimesCircle size={16} />
            </Button>
          </Tooltip>

          <Tooltip title="Reassign Technician">
            <Button
              variant="contained"
              size="medium"
              sx={{
                bgcolor: "#F97316",
                color: "white",
                minWidth: 42,
                "&:hover": { bgcolor: "#EA580C" },
              }}
              onClick={() => {
                setRequestToUpdate(params.row);
                setIsReassigning(true);
              }}
            >
              <FaSyncAlt size={16} />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getAllRequests = async () => {
      setLoading(true);
      try {
        const [requests, walkIns] = await Promise.all([
          get_data("/progress-requests"),
          get_data("/progress-walkins"),
        ]);

        console.log(requests, walkIns);

        if (requests || walkIns) {
          const formattedRequests = (requests || []).map((req) => ({
            ...req,
            customer: req.customer?.full_name || "N/A",
            email: req.customer?.email || "N/A",
            address: req.customer?.address || "N/A",
            serviceCategory: req.serviceCategory || "N/A",
            model: req?.model || "N/A",
            contactNumber: req.customer?.contact_number || "N/A",
            technician: req.technician?.full_name || "Unassigned",
            technicianId: req.technician?._id || null,
          }));

          const formattedWalkIns = (walkIns || []).map((req) => ({
            ...req,
            customer: req.customer || "N/A",
            email: req.email || "N/A",
            serviceCategory: req.serviceCategory || "N/A",
            contactNumber: req.contactNumber || "N/A",
            technician: req.technician?.full_name || "Unassigned",
            technicianId: req.technician?._id || null,
          }));

          const merged = [...formattedRequests, ...formattedWalkIns];
          setRequests(merged);
          setFilteredRequests(merged);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setLoading(false);
      }
    };

    getAllRequests();
  }, []);

  // 🔍 Search Filter Function
  useEffect(() => {
    if (!requests) return;

    const query = search.toLowerCase().trim();

    const filtered = requests.filter((r) =>
      [
        r.customer || "",
        r.email || "",
        r.serviceCategory || "",
        r.model || "",
        r.status || "",
        r.technician || "",
        r.contactNumber || "",
        r.submittedAt?.split("T")[0] || "",
      ].some((field) => field.toLowerCase().includes(query))
    );

    setFilteredRequests(filtered);
  }, [search, requests]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading services...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full p-4 flex gap-2 bg-white shadow my-4 rounded-md">
        <input
          type="text"
          placeholder="Search name, technician, date, etc."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
        />
        <button
          className="w-[160px] bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2"
          onClick={() => setIsAdding(true)}
        >
          NEW REQUEST
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: "1350px" }}>
          <DataGrid
            rows={filteredRequests || []}
            columns={columns}
            getRowId={(row) => row._id}
            columnVisibilityModel={{
              email: false,
              technicianId: false,
            }}
            pagination
            autoHeight
          />
        </div>
      </div>

      {/* Modals */}
      {isFailing && (
        <UpdateRequestModal
          onCancel={setIsFailing}
          requestData={requestToUpdate}
          updatedData={setRequests}
          newStatus={"Failed"}
        />
      )}

      {isReassigning && (
        <AssignTechnicianForm
          onCancel={setIsReassigning}
          requestData={requestToUpdate}
          updatedData={setRequests}
        />
      )}

      {isFinished && (
        <FinishRequestModal
          onCancel={setIsFinished}
          requestData={requestToUpdate}
          updatedData={setRequests}
        />
      )}

      {isAdding && (
        <WalkInRequestModal
          onCancel={setIsAdding}
          updatedData={setRequests}
        />
      )}

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
