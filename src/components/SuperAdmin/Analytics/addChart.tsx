import "./analytics.css";
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown"
import CoulmnChart from "./Charts/columnChart";
import DonutChart from "./Charts/donutChart"
import PieChart from "./Charts/pieChart"
import BarChart from "./Charts/barChart"
import TableChart from "./Charts/tableChart";

const AddChart = (props: any) => {
    const chartList = [
        'Column chart', 'Donut chart', 'Pie chart', 'Bar chart', 'Line chart', 'Table chart', 'Funnel chart', 'Area chart', 'Heat map'
    ]
    const [selectedChart, setSelectedChart] = useState(null);
    return (
        <div>
            <Dialog
                header="Add chart"
                visible={true}
                style={{ width: '80vw' }}
                position="top"
                onHide={() => {
                    debugger;
                    debugger;
                    props.closeDig()
                }}
            >
                <div className="flex justify-content-center">
                    <div className="col">
                        <div className="flex align-items-center">
                            <div className="col">1. Component Name</div>
                            <InputText
                                id="name"
                                name="name"
                                className="ml-3 col"
                                style={{ height: "30px" }}
                            />
                        </div>
                        <div className="flex align-items-center mt-3">
                            <div className="col">2. Module(s)</div>
                            <div className="col">
                                <Dropdown
                                    className="ml-2"
                                    optionLabel="name"
                                    placeholder="Select Module"
                                    style={{ height: "30px" }}
                                />
                                <Dropdown
                                    className="ml-2 mt-2"
                                    optionLabel="name"
                                    placeholder="Select Related Module"
                                    style={{ height: "30px" }}
                                />
                            </div>
                        </div>
                        <div className="flex align-items-center mt-3">
                            <div className="col">3. Measure (y-axis)</div>
                            <div className="col">
                                <Dropdown
                                    className="ml-2"
                                    optionLabel="name"
                                    placeholder="Select module"
                                    style={{ height: "30px" }}
                                />
                                <Dropdown
                                    className="ml-2 mt-2"
                                    optionLabel="name"
                                    placeholder="Select measure"
                                    style={{ height: "30px" }}
                                />
                            </div>
                        </div>
                        <div className="flex align-items-center mt-3">
                            <div className="col">3. Measure (y-axis)</div>
                            <div className="col">
                                <Dropdown
                                    className="ml-2"
                                    optionLabel="name"
                                    placeholder="Select grouping"
                                    style={{ height: "30px" }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col ml-2">

                        <div className="flex justify-content-end">
                            <Dropdown
                                value={selectedChart}
                                options={chartList}
                                placeholder="Select chart"
                                style={{ height: "30px", width: "max-content" }}
                                onChange={(e) => setSelectedChart(e.value)}
                            />
                        </div>
                        <div className="Chart_Preview mt-4 p-4">
                            {selectedChart === 'Column chart' &&
                                <CoulmnChart style={{ width: '100%' }} /> || selectedChart === 'Donut chart' && <DonutChart />
                                || selectedChart === 'Pie chart' && <PieChart /> || selectedChart === 'Bar chart' && <BarChart />
                                || selectedChart === 'Table chart' && <TableChart />}
                        </div>
                    </div>
                </div>
            </Dialog >
        </div >
    );
};
export default AddChart;
