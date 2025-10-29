import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Star } from "lucide-react";
import { get_data } from "../../services/getMethod";
import { statusColorMap } from "../../data/StatusColor";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [lineData, setLineData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [requestComparisonData, setRequestComparisonData] = useState(null);
  const [technicianPerformanceData, setTechnicianPerformanceData] = useState(null);
  const [filter, setFilter] = useState("daily");
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const res = await get_data(`/dashboard-record?filter=${filter}`);

        if (res) {
          const {
            salesSummary = [],
            serviceAvailsSummary = [],
            statusSummaryData = [],
            requestComparison = [],
            technicianPerformance = [],
            averageRating = 0,
          } = res;

          // 🧮 Status Summary
          setDashboardData(statusSummaryData);

          // 🧮 Line Chart (Sales Trend)
          setLineData({
            labels: salesSummary.map((item) => item._id || "Unknown"),
            datasets: [
              {
                label: "Total Revenue (₱)",
                data: salesSummary.map((item) => item.totalRevenue || 0),
                borderColor: "orange",
                backgroundColor: "rgba(255,165,0,0.2)",
                tension: 0.3,
                fill: true,
              },
            ],
          });

          // 🧮 Bar Chart (Top Services)
          setBarData({
            labels: serviceAvailsSummary.map((item) => item.serviceName || "Unknown"),
            datasets: [
              {
                label: "Service Availed Count",
                data: serviceAvailsSummary.map((item) => item.count || 0),
                backgroundColor: "rgba(255,165,0,0.8)",
              },
            ],
          });

          // 🧮 Pie Chart (Status Summary)
          setPieData({
            labels: statusSummaryData.map((item) => item.label),
            datasets: [
              {
                data: statusSummaryData.map((item) => item.count),
                backgroundColor: statusSummaryData.map(
                  (item) => statusColorMap[item.label] || "gray"
                ),
              },
            ],
          });

          // 🧮 Walk-In vs Online Comparison
          setRequestComparisonData({
            labels: requestComparison.map((i) => i.label),
            datasets: [
              {
                label: "Requests",
                data: requestComparison.map((i) => i.count),
                backgroundColor: ["#f97316", "#2563eb"],
              },
            ],
          });

          // 🧮 Technician Performance
          setTechnicianPerformanceData(technicianPerformance);

          // ⭐ Feedback Rating
          setAverageRating(averageRating);

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [filter]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading dashboard data...</p>
      </div>
    );
  }

  // 🧠 Render stars dynamically
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
        ))}
        {halfStar && (
          <Star size={20} className="text-yellow-400 fill-yellow-400 opacity-60" />
        )}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} size={20} className="text-gray-300" />
        ))}
      </>
    );
  };

  return (
    <div className="overflow-y-hidden space-y-6">
      {/* ✅ Summary Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dashboardData.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow text-center"
          >
            <h2 className="text-lg font-semibold">{stat.label}</h2>
            <p className="text-2xl font-bold text-orange-500">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* ✅ Feedback Rating */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Average Feedback Rating</h2>
        <div className="flex items-center gap-1">
          {renderStars(averageRating)}
          <span className="ml-2 text-sm text-gray-600">
            ({averageRating} / 5)
          </span>
        </div>
      </div>

      {/* ✅ Mini Nav Filter */}
      <div className="flex gap-2 p-2">
        {["daily", "monthly", "yearly"].map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === option
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-orange-200"
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {/* ✅ Charts Section */}
      <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]">
        {/* Line Chart */}
        <div className="flex-[2] bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Sales Trend ({filter})</h2>
          <div className="h-[90%] w-full">
            {lineData ? (
              <Line data={lineData} options={{ maintainAspectRatio: false }} />
            ) : (
              <p>No sales data available.</p>
            )}
          </div>
        </div>

        {/* Side Column */}
        <div className="flex-[1] flex flex-col gap-4">
          {/* Pie Chart */}
          <div className="h-[49%] bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Request Status Summary</h2>
            <div className="h-[90%] w-full">
              {pieData ? (
                <Pie data={pieData} options={{ maintainAspectRatio: false }} />
              ) : (
                <p>No summary data available.</p>
              )}
            </div>
          </div>

          {/* Top Services */}
          <div className="h-[49%] bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Top Categories</h2>
            <div className="h-[90%] w-full">
              {barData ? (
                <Bar data={barData} options={{ maintainAspectRatio: false }} />
              ) : (
                <p>No service data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Comparison & Technician Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Walk-in vs Online Requests */}
        <div className="bg-white p-4 rounded-xl shadow h-[400px]">
          <h2 className="font-semibold mb-2">Walk-in vs Online Requests</h2>
          <div className="h-[90%] w-full">
            {requestComparisonData ? (
              <Bar data={requestComparisonData} options={{ maintainAspectRatio: false }} />
            ) : (
              <p>No comparison data available.</p>
            )}
          </div>
        </div>

        {/* Technician Performance */}
        <div className="bg-white p-4 rounded-xl shadow h-[400px]">
          <h2 className="font-semibold mb-2">Technician Performance</h2>
          <div className="h-[90%] w-full">
            {technicianPerformanceData ? (
              <Bar
                data={{
                  labels: technicianPerformanceData.map((t) => t.technician || "Unknown"),
                  datasets: [
                    {
                      label: "Completed",
                      data: technicianPerformanceData.map((t) => t.completed || 0),
                      backgroundColor: "rgba(34,197,94,0.8)",
                    },
                    {
                      label: "Failed",
                      data: technicianPerformanceData.map((t) => t.failed || 0),
                      backgroundColor: "rgba(239,68,68,0.8)",
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: { position: "bottom" },
                  },
                }}
              />
            ) : (
              <p>No technician data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
