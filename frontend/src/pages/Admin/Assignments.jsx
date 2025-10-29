// src/pages/admin/TechnicianAssign.jsx
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { update_data } from "../../services/putMethod";
import { get_data } from "../../services/getMethod";
import { statusColorMap } from "../../data/StatusColor";
import UpdateRequestModal from "../../components/modals/statusUpdateModal";
import AssignTechnicianForm from "../../components/modals/requestAcceptanceModal";
import FinishRequestModal from "../../components/modals/finishRequests";
import WalkInRequestModal from "../../components/modals/walkInRequestModal";

export default function TechnicianAssign() {
  const [isReassigning, setIsReassigning] = useState(false);
  const [isFailing, setIsFailing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [requests, setRequests] = useState(null);
  const [requestToUpdate, setRequestToUpdate] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "customer", headerName: "Customer Name", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "serviceCategory", headerName: "Category", flex: 1 },
    { field: "technician", headerName: "Technician", flex: 1 },
    { field: "technicianId", headerName: "Technician", hide: true},
    { field: "remarks", headerName: "Remarks", hide: true},
    { field: "email", headerName: "Email", hide: true},
    { 
      field: "submittedAt", 
      headerName: "Date Requested", 
      width: 150,
      renderCell: (params) => {
        return <span>{params.value.split('T')[0]}</span>
      }
    },
    { 
      field: "type", 
      headerName: "Type", 
      width: 120,
      renderCell: (params) => {
        return <span 
          className={`${params.value === 'Walk-In' ? 'text-blue-500' : 'text-green-500'}`}
        >
          {params.value}
        </span>
      } 
    },
    { 
      field: "status", 
      headerName: "Status", 
      width: 120,
      renderCell: (params) => {
        return <span 
          className={`p-2 rounded-full text-white bg-${statusColorMap[params.value]}`}
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
        <div className="h-full flex items-center gap-1">
          <Button 
            variant="contained" 
            size="small" 
            sx={{bgcolor: 'green', fontSize: 12 }}
            onClick={() => {
              console.log(params.row)
              setRequestToUpdate(params.row)
              setIsFinished(true)
            }}          
          >
            Finish
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            color="error"
            onClick={() => {
              setRequestToUpdate(params.row)
              setIsFailing(true)
            }}
            sx={{fontSize: 12}}
          >
            Failed
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setRequestToUpdate(params.row);
              setIsReassigning(true);
            }}
            sx={{fontSize: 12}}
          >
            <span className="hidden 2xl:inline">Reassigned</span>
            <span className="inline 2xl:hidden">↻</span> {/* icon or short text */}
          </Button>
        </div>      
      ),
    },
  ];

  useEffect(() => {
    const getAllRequests = async () => {
        setLoading(true);
        try {
          const [requests, walkIns] = await Promise.all([
            get_data('/progress-requests'),
            get_data('/progress-walkins'),
          ]);

          if (requests || walkIns) {
            const formattedRequests = (requests || []).map((req) => ({
              ...req,
              customer: req.customer?.full_name || "N/A",
              email: req.customer?.email || "N/A",
              serviceCategory: req.serviceCategory || "N/A",
              contactNumber: req.customer?.contact_number || "N/A",
              technician: req.technician?.full_name || "Unassigned",
              technicianId: req.technician?._id || null,
              type: "Appointment",
            }));

            const formattedWalkIns = (walkIns || []).map((req) => ({
              ...req,
              customer: req.customer || "N/A",
              email: req.email || "N/A",
              serviceCategory: req.serviceCategory || "N/A",
              contactNumber: req.contactNumber || "N/A",
              technician: req.technician?.full_name || "Unassigned",
              technicianId: req.technician?._id || null,
              type: "Walk-In",
            }));

            // ✅ Merge both arrays into one unified list
            setRequests([...formattedRequests, ...formattedWalkIns]);
            console.log(requests);
          }

          setLoading(false);
        } catch (err) {
          console.error("Error fetching requests:", err);
          setLoading(false);
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

      <div className="w-full p-4 flex gap-2 bg-white shadow my-4 rounded-md">
        <input 
          type="text" 
          placeholder="Search name,service type, date, etc."
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
        />

        <button className="w-[140px] bg-orange-500 text-white rounded-lg" onClick={() => setIsAdding(true)}>NEW REQUEST</button>
      </div>

      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: "1350px"}}>
          <DataGrid 
            rows={requests} 
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

      {isFailing && <UpdateRequestModal 
        onCancel={setIsFailing}
        requestData={requestToUpdate}
        updatedData={setRequests}
        newStatus={'Failed'}
      />}

      {isReassigning && <AssignTechnicianForm 
        onCancel={setIsReassigning}
        requestData={requestToUpdate}
        updatedData={setRequests}
        
      />}
      

      {isFinished && <FinishRequestModal 
        onCancel={setIsFinished}
        requestData={requestToUpdate}
        updatedData={setRequests}
      />}

      {isAdding && <WalkInRequestModal 
        onCancel={() =>  setIsAdding(false)}
        updatedData={setRequests}
      />}

      
    </div>
  );
}
