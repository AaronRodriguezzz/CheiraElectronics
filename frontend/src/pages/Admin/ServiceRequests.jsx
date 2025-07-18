import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { update_data } from '../../services/putMethod';
import { get_data } from "../../services/getMethod";

export default function ServiceRequests() {
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(null);

  const columns = [
    { field: "customer", headerName: "Customer Name", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "serviceType", headerName: "Service", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "submittedAt", headerName: "Date Requested", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="h-full flex items-center gap-2">
          <Button
            variant="contained"
            size="small"
            onClick={() => updateStatus("In Progress", params.row._id)}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => updateStatus("Rejected", params.row._id)}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const updateStatus = async (newStatus, id) => {
    try {
      const updateResponse = await update_data('/update_request_status', { status: newStatus });
      if (updateResponse) {
        console.log("Status updated successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAllRequests = async () => {
      setLoading(true);
      try{
        const requests = await get_data('/all-requests');

        if(requests){

          console.log('requests', requests);
            const formatted = requests.map((req) => ({
            ...req, 
            customer: req.customer?.full_name,
            email: req.customer?.email,
            contactNumber: req.customer?.contact_number
          }));
          setRequests(formatted);
        }

        setLoading(false);

      }catch(err){
        console.log(err);
      }
    }

    getAllRequests();
  },[])

  useEffect(() => {
    console.log(requests);
  },[requests])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading services...</p>
      </div>
    );
  }
 
  return (
    <div>
      <div className="w-full p-4 bg-white shadow my-4 rounded-md">
        <input
          type="text"
          placeholder="Search name, service type, date, etc."
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
        />
      </div>

      <DataGrid
        rows={requests}
        columns={columns}
        getRowId={(row) => row._id} // 👈 This tells MUI to use _id as the unique identifier
        pagination
      />
    </div>
  );
}
  