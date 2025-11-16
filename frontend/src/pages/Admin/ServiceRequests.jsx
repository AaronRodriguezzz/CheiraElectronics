import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { get_data } from "../../services/getMethod";
import { statusColorMap } from "../../data/StatusColor";
import Button from "@mui/material/Button";
import AssignTechnicianForm from "../../components/modals/requestAcceptanceModal";
import UpdateRequestModal from "../../components/modals/statusUpdateModal";
import ViewServiceRequestModal from "../../components/modals/viewRequestModal";

export default function ServiceRequests() {
  const [requests, setRequests] = useState(null);
  const [filteredRequests, setFilteredRequests] = useState(null);
  const [search, setSearch] = useState("");

  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [requestToView, setRequestToView] = useState(null);
  const [requestToUpdate, setRequestToUpdate] = useState(null);
  const [loading, setLoading] = useState(null);

  const serviceRequestsCols = [
    { field: "customer", headerName: "Customer Name", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", width: 150 },
    { field: "serviceCategory", headerName: "Category", width:180 },
    { field: "model", headerName: "Model", width: 160 },
    { field: "serviceType", headerName: "Service Type", width: 200 },
    {
      field: "submittedAt",
      headerName: "Date Requested",
      width: 120,
      renderCell: (params) => <span>{params.value.split("T")[0]}</span>,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <span
          className="p-2 rounded-full text-white text-md font-medium"
          style={{ backgroundColor: statusColorMap[params.value] }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="h-full w-auto flex md:flex-row flex-col items-center gap-2">
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={() => {
              setRequestToUpdate(params.row);
              setIsAccepting(true);
            }}
            sx={{ fontSize: 12 }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => {
              setRequestToUpdate(params.row);
              setIsRejecting(true);
            }}
            sx={{ fontSize: 12 }}
          >
            Reject
          </Button>
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

  useEffect(() => {
    const getAllRequests = async () => {
      setLoading(true);
      try {
        const requests = await get_data("/all-requests");

        if (requests) {
          console.log(requests);
          const formatted = requests.map((req) => ({
            ...req,
            customer: req.customer?.full_name,
            address: req.customer?.address,
            email: req.customer?.email,
            contactNumber: req.customer?.contact_number,
          }));
          setRequests(formatted);
          setFilteredRequests(formatted);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
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
        r.customer,
        r.email,
        r.serviceCategory,
        r.model,
        r.status,
        r.contactNumber,
        r.submittedAt?.split("T")[0],
      ]
        .filter(Boolean)
        .some((field) => field.toString().toLowerCase().includes(query))
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
      {/* Search Input */}
      <div className="w-full p-4 bg-white shadow my-4 rounded-md">
        <input
          type="text"
          placeholder="Search name, service type, date, etc."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
        />
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[1500px]">
          <DataGrid
            rows={filteredRequests || []}
            columns={serviceRequestsCols}
            getRowId={(row) => row._id}
            pagination
          />
        </div>
      </div>

      {/* Accept Technician Modal */}
      {isAccepting && (
        <AssignTechnicianForm
          onCancel={setIsAccepting}
          requestData={requestToUpdate}
          updatedData={setRequests}
        />
      )}

      {/* Reject Modal */}
      {isRejecting && (
        <UpdateRequestModal
          onCancel={setIsRejecting}
          requestData={requestToUpdate}
          updatedData={setRequests}
          newStatus={"Rejected"}
        />
      )}

      {/* View Modal */}
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
