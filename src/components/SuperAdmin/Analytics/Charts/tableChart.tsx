import React from "react";
import "../analytics.css";
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

const TableChart = (props: any) => {
    const tableData = [
        {
            createdBy: 'Charles',
            count: '9'
        },
        {
            createdBy: 'Mary',
            count: '1'
        },
        {
            createdBy: 'Total',
            count: '10'
        }
    ]
    return (
        <div>
            <DataTable
                value={tableData}
                responsiveLayout="scroll"
                dataKey="id"
            >
              
                <Column field="createdBy" header="Created by"></Column>
                <Column
                    field="count"
                    header="Record Count"
                ></Column>
            </DataTable>
        </div>
    );
};
export default TableChart;
