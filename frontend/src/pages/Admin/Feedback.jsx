import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Rating, Tooltip } from "@mui/material";
import { get_data } from "../../services/getMethod";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Feedback() {
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ Fetch feedbacks from API
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await get_data(`/feedback`);

      if (res) {
        const formatted = res.map((item) => ({
          id: item._id,
          customer: item.customer?.full_name || "Unknown",
          rating: item?.feedbackRating || 0,
          comment: item?.feedbackMessage || "",
          date: item?.createdAt?.split("T")[0] || "",
        }));

        setAllFeedbacks(formatted);
        setFeedbacks(formatted);
      }
    } catch (err) {
      console.error("Failed to fetch feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Export data to Excel
  const exportToExcel = () => {
    if (!allFeedbacks.length) return alert("No data to export.");

    const ws = XLSX.utils.json_to_sheet(allFeedbacks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Feedback Record File");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "feedback-list.xlsx");
  };

  // ✅ Live Search Logic
  useEffect(() => {
    if (!search.trim()) {
      setFeedbacks(allFeedbacks); // Reset when search is empty
    } else {
      const filtered = allFeedbacks.filter((item) => {
        const value = search.toLowerCase();
        return (
          item.customer.toLowerCase().includes(value) ||
          item.comment.toLowerCase().includes(value) ||
          item.rating.toString().includes(value) ||
          item.date.includes(value)
        );
      });
      setFeedbacks(filtered);
    }
  }, [search, allFeedbacks]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const columns = [
    { field: "customer", headerName: "Customer", flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={`${params.value} / 5`} arrow>
          <Rating
            value={Number(params.value)}
            precision={0.5}
            readOnly
            size="small"
          />
        </Tooltip>
      ),
    },
    { field: "comment", headerName: "Comment", flex: 2 },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  return (
    <div className="p-4 bg-white rounded-md shadow space-y-4">
      {/* 🔍 Search bar */}
      <div className="w-full flex gap-x-4">
        <input
          type="text"
          placeholder="Search name, rating, comment, or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-gray-300"
        />
        {search && (
          <Button
            onClick={() => setSearch("")}
            variant="outlined"
            sx={{
              color: "#f97316",
              borderColor: "#f97316",
              "&:hover": { borderColor: "#ea580c", color: "#ea580c" },
            }}
          >
            Clear
          </Button>
        )}
      </div>

      {/* 📋 DataGrid Table */}
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
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "#f3f4f6",
            color: "#374151",
            fontWeight: "600",
          },
          "& .MuiDataGrid-cell": {
            alignItems: "center",
            display: "flex",
          },
        }}
      />

      {/* 📤 Export Button */}
      <div className="w-full flex justify-end">
        <Button
          variant="contained"
          sx={{
            bgcolor: "#f97316",
            "&:hover": { bgcolor: "#ea580c" },
          }}
          onClick={exportToExcel}
        >
          Export
        </Button>
      </div>
    </div>
  );
}
