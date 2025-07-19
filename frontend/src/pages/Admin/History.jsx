// src/pages/admin/History.jsx
import React, {useState, useEffect} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { get_data } from "../../services/getMethod";
import statusColorMap from "../../data/StatusColor";

export default function History() {
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "customerName", headerName: "Customer Name", flex: 1 },
    { field: "contactNumber", headerName: "Contact", flex: 1 },
    { field: "serviceType", headerName: "Service", flex: 1 },
    { field: "technician", headerName: "Technician", flex: 1 },
    { field: "updatedBy", headerName: "Updated By", flex: 1 },
    { field: "rejectionReason", headerName: "Remarks", flex: 1 },
    { 
      field: "updatedAt", 
      headerName: "Date Updated", 
      width: 150,
      renderCell: (params) => {
        return <span>{params.value.split('T')[0]}</span>
      }
    },    
    { 
      field: "status", 
      headerName: "Status", 
      width: 120,
      renderCell: (params) => {
        return <span className={`text-${statusColorMap[params.value]}`}>{params.value}</span>
      } 
    },    
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: () => (
        <Button variant="contained" size="small">Reopen</Button>
      ),
    },
  ];


  useEffect(() => {
    const getAllRequests = async () => {
      setLoading(true);
      try{
        const requests = await get_data('/requests-history');

        if(requests){

          console.log('requests', requests);
          const formatted = requests.map((req) => ({
            ...req, 
            customerName: req.customer?.full_name,
            contactNumber: req.customer?.contact_number,
            technician: req.technician?.full_name || 'N/A',
            updatedBy: req?.updatedBy?.full_name || 'N/A',
            rejectionReason: req?.remarks || 'N/A'
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

      <div className="w-full flex p-4 gap-x-4 bg-white shadow my-4 rounded-md">
        <input 
          type="text" 
          placeholder="Search name,service type, date, etc."
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
        />
      </div>

      <DataGrid 
        rows={requests} 
        columns={columns}
        getRowId={(row) => row._id} 
        pagination 
      />

      <div className="w-full flex justify-end mt-4">
        <Button variant="contained" className="mb-4">Export</Button>
      </div>
    </div>
  );
}
