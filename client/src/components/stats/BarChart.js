import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Tooltip } from "chart.js";

function BarChart({ chartData }) {
  return (
    <Bar
      id="bar-chart"
      data={chartData}
      options={{
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(255, 255, 255, 0.2)", // Color of the y-axis gridlines
            },
          },
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.2)", // Color of the x-axis gridlines
            },
          },
        },
        plugins: {
          tooltip: {
            backgroundColor: "rgb", // Example tooltip background color
            cornerRadius: 5, // Set the corner radius value
          },
        },
      }}
      style={{ height: "10vh", width: "70vw", backgroundColor: "black" }} // Adjust the values accordingly
    />
  );
}
export default BarChart;
