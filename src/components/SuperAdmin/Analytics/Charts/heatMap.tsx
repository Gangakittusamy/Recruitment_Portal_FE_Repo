import "../analytics.css";
import "anychart";
import { useEffect } from "react";

const HeatMap = (props: any) => {

    function funct() {
        var data = [
            { x: "Charles", y: "Apr", heat: 15 },
            { x: "Mary", y: "Apr", heat: 17 },
            { x: "Ricky", y: "Apr", heat: 21 },
            { x: "Charles", y: "May", heat: 34 },
            { x: "Mary", y: "May", heat: 33 },
            { x: "Ricky", y: "May", heat: 32 },
            { x: "Charles", y: "Jun", heat: 41 },
            { x: "Mary", y: "Jun", heat: 30 },
            { x: "Ricky", y: "Jun", heat: 13 },
            { x: "Charles", y: "Jul", heat: 15 },
            { x: "Mary", y: "Jul", heat: 23 },
            { x: "Ricky", y: "Jul", heat: 19 }
        ];
        var chart = anychart.heatMap(data);
        chart.title("Heat Map: Basic Sample");
        chart.container("container");
        var title = chart.title();
        title.enabled(false);
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
export default HeatMap
