import "./analytics.css";
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown"

const AddChart = (props: any) => {

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
                        <Dropdown
                            optionLabel="name"
                            placeholder="Select chart"
                            style={{ height: "30px" }}
                        />
                        <div className="Chart_Preview mt-4">

                        </div>
                    </div>
                </div>
            </Dialog >
        </div>
    );
};
export default AddChart;
