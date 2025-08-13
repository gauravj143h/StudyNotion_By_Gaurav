import React, { useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register all chart components
ChartJS.register(...registerables);

const InstructorChart = ({ course }) => {
  const [currChart, setCurrChart] = useState("students");

  // Function to generate random colors
  const getRandomColors = (numColor) => {
    const colors = [];
    for (let i = 0; i < numColor; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, 
                         ${Math.floor(Math.random() * 256)}, 
                         ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  const chartDataForStudents = {
    labels: course.map((courseitem) => courseitem.courseName),
    datasets: [
      {
        data: course.map((courseitem) => courseitem.totalStudentsEnrolled),
        backgroundColor: getRandomColors(course.length),
      },
    ],
  };

  const chartDataForIncome = {
    labels: course.map((courseitem) => courseitem.courseName),
    datasets: [
      {
        data: course.map((courseitem) => courseitem.totalAmountGenerated),
        backgroundColor: getRandomColors(course.length),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom", labels: { color: "#fff" } },
      title: {
        display: true,
        text:
          currChart === "students"
            ? "Students Enrolled Per Course"
            : "Income Generated Per Course",
        color: "#fff",
        font: { size: 18 },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Visualize</h2>

      {/* Toggle Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setCurrChart("students")}
          className={`px-4 py-2 rounded-md font-medium transition ${
            currChart === "students"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`px-4 py-2 rounded-md font-medium transition ${
            currChart === "income"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Income
        </button>
      </div>

      {/* Chart */}
      <div className="max-w-[500px] mx-auto">
        <Pie
          data={
            currChart === "students"
              ? chartDataForStudents
              : chartDataForIncome
          }
          options={options}
        />
      </div>
    </div>
  );
};

export default InstructorChart;
