// src/pages/admin/Feedback.jsx
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { get_data } from "../../services/getMethod"; // ✅ your existing fetch service

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch feedbacks from backend
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await get_data(`/feedback`);

      if (res) {
        setFeedbacks(
          res.map((item, index) => ({
            id: item._id,
            customer: item.customer?.full_name,
            rating: item?.feedbackRating ,
            comment: item?.feedbackMessage,
            date: item?.createdAt.split("T")[0]
          }))
        );
      }
    } catch (err) {
      console.error("Failed to fetch feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [search]);

  const columns = [
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 0.5 },
    { field: "comment", headerName: "Comment", flex: 2 },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  return (
    <div className="p-4 bg-white rounded-md shadow space-y-4">
      {/* Search bar */}
      <div className="w-full flex gap-x-4">
        <input
          type="text"
          placeholder="Search name, service type, date, etc."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
        />
        <Button
          onClick={fetchFeedbacks}
          variant="contained"
          sx={{
            bgcolor: "#f97316",
            "&:hover": { bgcolor: "#ea580c" },
          }}
        >
          Search
        </Button>
      </div>

      {/* DataGrid */}
      <DataGrid
        rows={feedbacks}
        columns={columns}
        autoHeight
        pagination
        pageSize={10}
        loading={loading}
        sx={{
          bgcolor: "white",
          borderRadius: "0.5rem",
          "& .MuiDataGrid-columnHeaders": { bgcolor: "#f3f4f6", color: "#374151" },
        }}
      />

      {/* Export Button */}
      <div className="w-full flex justify-end">
        <Button
          variant="contained"
          sx={{
            bgcolor: "#f97316",
            "&:hover": { bgcolor: "#ea580c" },
          }}
          onClick={() => console.log("Export triggered")}
        >
          Export
        </Button>
      </div>
    </div>
  );
}
