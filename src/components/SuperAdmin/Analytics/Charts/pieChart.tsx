import { Chart, ChartType, registerables } from "chart.js";
import React from "react";
import "../analytics.css";

let ctx = React.createRef()
const CoulmnChart = (props: any) => {
    Chart.register(...registerables);
    const data = {
        labels: ['Ricky', 'Charles', 'Mary'],
        datasets: [{
            data: [20, 30, 50],
        }]
    };
    const type: ChartType = 'pie'

    const config = {
        type: type,
        data: data,
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
            },
        },
    };
    function funct(el: any) {
        new Chart(el, config)
    }
    return (
        <canvas style={{
            height: "169px", width: "405px"
        }} id="el" ref={(el) => el && funct(el)}>
        </canvas>
    );
};
export default CoulmnChart;
