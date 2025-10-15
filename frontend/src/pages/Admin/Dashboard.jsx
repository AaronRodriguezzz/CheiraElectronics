import React from "react";
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
import { useEffect, useState } from "react";
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
  const [lineData, setLineData] = useState({});
  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await get_data('/dashboard-record');
        
        if(res) {
          setDashboardData(res.statusSummaryData);
          setLineData({
            labels: res.salesSummary?.map(item => item._id) || [],
            datasets: [
              {
                label: "Total Revenue",
                data: res.salesSummary?.map(item => item.totalRevenue) || [],
                borderColor: "orange",
                fill: true,
              },
            ],
          });
          setBarData({
            labels: res.serviceAvailsSummary?.map(item => item.serviceName) || [],
            datasets: [
              {
                label: "Services Availed Ranking",
                data: res.serviceAvailsSummary?.map(item => item.count) || [],
                backgroundColor: res.serviceAvailsSummary
                  ? res.serviceAvailsSummary.map(() => "rgba(255, 165, 0, 0.8)") // same color for all
                  : [],
              },
            ],
          });
          setPieData({
            labels: res.statusSummaryData?.map(item => item.label) || [],
            datasets: [
              {
                data: res.statusSummaryData?.map(item => item.count) || [],
                backgroundColor: res.statusSummaryData?.map(item => statusColorMap[item.label] || "gray") || [],
              },
            ],
          });

        }
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }

    fetchDashboardData();
  }, []);

  if (dashboardData.length === 0 || lineData.labels?.length === 0 || barData.labels?.length === 0 || pieData.labels?.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="max-h-screen space-y-6">
      {/* Summary Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dashboardData && dashboardData.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow text-center"
          >
            <h2 className="text-lg font-semibold">{stat.label}</h2>
            <p className="text-2xl font-bold text-orange-500">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Feedback Rating */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Average Feedback Rating</h2>
        <div className="flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
          ))}
          <Star size={20} className="text-yellow-400" />
          <span className="ml-2 text-sm text-gray-600">(4.2 / 5)</span>
        </div>
      </div>

      <div className="flex gap-4 h-[600px]">
        {/* Line Chart */}
        <div className="flex-[2] bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Daily Sales</h2>
          <div className="h-[95%] w-full">
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Right Side Column */}
        <div className="flex-[1] flex flex-col gap-4">
          {/* Bar Chart */}
          <div className="h-[49%] bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Monthly Service Requests</h2>
            <div className="h-[90%] w-full">
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="h-[49%] bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Weekly Summary</h2>
            <div className="h-[90%] w-full">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
