import { Chart, ChartType, registerables } from "chart.js";
import React from "react";
import "../analytics.css";

let ctx = React.createRef()
const CoulmnChart = (props: any) => {
  Chart.register(...registerables);
  const values = [1, 2];
  const data = {
    labels: ['Charles', 'Mary'],
    datasets: [{
      data: values,
      backgroundColor: values.map(item => "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")),
    }]
  };
  const type: ChartType = 'bar'

  const config = {
    type: type,
    data: data,
    options: {
    responsive: true,
    maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Record count'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Created by'
          }

        }
      }
    },
  };
  function funct(el: any) {
    new Chart(el, config)
  }
  return (
    <canvas id="el" ref={(el) => el && funct(el)}>
    </canvas>
  );
};
export default CoulmnChart;
