import { Chart, ChartType, registerables } from "chart.js";
import React from "react";
import "../analytics.css";

let ctx = React.createRef()
const LineChart = (props: any) => {
    Chart.register(...registerables);
    const labels = ['Charles', 'Mary', 'Ryan'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: [0.5, 1, 1.5],
            lineTension: 0.3,
            borderWidth: 1,
        },
        {
            label: 'My First Dataset',
            data: [2, 0.5, 1],
            lineTension: 0.3,
            borderWidth: 1,
        }]
    };
    const type: ChartType = 'line'

    const config = {
        type: type,
        data: data,
        options: {
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
                    text: 'Sum(Profit)'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Year(StockDT)'
                  }
        
                }
              }
        }

    };
    function funct(el: any) {
        new Chart(el, config)
    }
    return (
        <canvas id="el" ref={(el) => el && funct(el)}>
        </canvas>
    );
};
export default LineChart;
