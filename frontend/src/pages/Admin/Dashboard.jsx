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
  const summaryStats = [
    { label: "Pending", count: 12 },
    { label: "In Progress", count: 8 },
    { label: "Completed", count: 30 },
    { label: "Re-opened", count: 2 },
    { label: "Accepted", count: 40 },
  ];

  const barData = {
    labels: ["Repair A", "Repair B", "Repair C"],
    datasets: [
      {
        label: "Requests this Month",
        data: [20, 35, 10],
        backgroundColor: "rgba(255, 165, 0, 0.8)",
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Completed Services",
        data: [5, 10, 8, 15, 20, 25],
        borderColor: "orange",
        fill: false,
      },
    ],
  };

  const pieData = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [15, 5, 3],
        backgroundColor: ["green", "orange", "gray"],
      },
    ],
  };

  return (
    <div className="max-h-screen space-y-6">
      {/* Summary Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {summaryStats.map((stat, index) => (
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
          <h2 className="font-semibold mb-2">Monthly Completed Services</h2>
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
