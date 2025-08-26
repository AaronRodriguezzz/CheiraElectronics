import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { update_data } from '../../services/putMethod';
import { get_data } from "../../services/getMethod";
import { statusColorMap } from "../../data/StatusColor";
import Button from "@mui/material/Button";
import AssignTechnicianForm from "../../components/modals/requestAcceptanceModal";
import UpdateRequestModal from "../../components/modals/statusUpdateModal";

export default function ServiceRequests() {
  const [requests, setRequests] = useState(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [requestToUpdate, setRequestToUpdate] = useState(null);
  const [loading, setLoading] = useState(null);

  const serviceRequestsCols = [
    { field: "customer", headerName: "Customer Name", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "serviceType", headerName: "Service", flex: 1 },
    { 
      field: "submittedAt", 
      headerName: "Date Requested", 
      width: 120,
      renderCell: (params) => {
        return <span>{params.value.split('T')[0]}</span>
      }
    },
    { 
      field: "status", 
      headerName: "Status", 
      width:100,
      renderCell: (params) => {
        console.log('statusColorMap', statusColorMap, params.value);
        return <span 
          className={`p-2 rounded-full text-white`}
          style={{ backgroundColor: statusColorMap[params.value] }}
        >
          {params.value}
        </span>
      } 
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
              setRequestToUpdate(params.row)
              setIsAccepting(true)
            }}
            sx={{fontSize: 12}}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => {
              setRequestToUpdate(params.row)
              setIsRejecting(true)
            }}            
            sx={{fontSize: 12}}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => updateStatus("Rejected", params.row._id)}
            sx={{fontSize: 12}}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  const updateStatus = async (newStatus, id) => {
    try {
      const updateResponse = await update_data(`/update-status/${id}`, { status: newStatus });

      if (updateResponse) {
        setRequests(prev => prev.filter(req => req._id !== updateResponse._id ))
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
            serviceType: req.serviceType?.name,
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

      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: "1350px"}}>
          <DataGrid
            rows={requests}
            columns={serviceRequestsCols}
            getRowId={(row) => row._id}
            pagination
            autoHeight
          />
        </div>
      </div>

      {isAccepting && <AssignTechnicianForm 
        onCancel={setIsAccepting}
        requestData={requestToUpdate}
        updatedData={setRequests}
      />}

      {isRejecting && <UpdateRequestModal 
        onCancel={setIsRejecting}
        requestData={requestToUpdate}
        updatedData={setRequests}
        newStatus={'Rejected'}
      />}

    </div>
  );
}
  