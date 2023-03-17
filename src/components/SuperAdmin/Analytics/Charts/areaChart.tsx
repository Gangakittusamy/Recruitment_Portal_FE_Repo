import { Chart, ChartType, registerables } from "chart.js";
import React from "react";
import "../analytics.css";

let ctx = React.createRef()
const AreaChart = (props: any) => {
    Chart.register(...registerables);
    const labels = ['Charles', 'Mary', 'Ryan'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Advertisement',
            data: [0.5, 1, 1.5],
            lineTension: 0.3,
            borderWidth: 1,
            fill: true,
        },
        {
            label: 'Trade show',
            data: [2, 0.5, 1],
            lineTension: 0.3,
            borderWidth: 1,
            fill: true,
        }]
    };
    const type: ChartType = 'line'

    const config = {
        type: type,
        data: data,
        options: {
            tension: 0.3,
            plugins: {
                filler: {
                    propagate: true
                }
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
export default AreaChart;
