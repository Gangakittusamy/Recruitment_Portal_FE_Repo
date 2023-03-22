import "../analytics.css";
import "anychart";
import { useEffect, useState } from "react";

const FunnelChart = (props: any) => {
    
    function funct() {
        var data = [
            ["Charles", 332000],
            ["Mary", 134480],
        ];
        var chart = anychart.funnel(data);

        // set the container id
        chart.container("container");
        chart.baseWidth("35%");
        chart.neckWidth("10%");
        chart.neckHeight("40%");
        chart.legend(false)

        // initiate drawing the chart
        chart.draw();
    }
    useEffect(() => {
        funct()
    }, []);
    return (
        <div id="container">
        </div>
    );
};
export default FunnelChart
