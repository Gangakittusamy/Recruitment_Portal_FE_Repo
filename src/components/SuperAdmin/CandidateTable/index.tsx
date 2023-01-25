import './candidateTable.css';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import Profile from '../../../assets/profile.png';
import { CANDIDATETABLE } from '../../Constant/const';
import CandidateListPage from '../OnRowSelectPage/candidateList';
const CandidateTable = () => {
  const [products, setProducts] = useState(CANDIDATETABLE);
  const [selectedRow, setselectedRow] = useState(false);
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [passData, setpassData] = useState([]);
  const countryBodyTemplate = (rowData: any) => {
    return (
      <div className="flex align-items-center">
        <img alt="flag" src={Profile} width={30} height={30} />
        <span className="ml-1">{rowData.name}</span>
      </div>
    );
  };
  const OnRowSelectData = (rowData: any) => {
    setselectedRow(!selectedRow);
    setpassData(rowData);
  };
  function Status(rowData: any) {
    return (
      <div>
        {rowData.status === 'Selected' ? (
          <div className="Status_Selected">Selected</div>
        ) : (
          <></>
        )}
        {rowData.status === 'Progress' ? (
          <div className="Status_Progress">Progress</div>
        ) : (
          <></>
        )}
        {rowData.status === 'Notselected' ? (
          <div className="Status_NotSelected">Notselected</div>
        ) : (
          <></>
        )}
        {rowData.status === 'OnHoldProgress' ? (
          <div className="Status_OnHoldProgress">OnHoldProgress</div>
        ) : (
          <></>
        )}
      </div>
    );
  }
  return (
    <div>
      {selectedRow ? (
        <CandidateListPage datas={passData} handleClick={OnRowSelectData} />
      ) : (
        <div className="mx-5 my-3">
          <div className="flex justify-content-between align-items-center">
            <h2 className=" "> Candidate List</h2>
          </div>

          <DataTable
            value={products}
            paginator
            responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            rows={5}
            rowsPerPageOptions={[5, 10, 15]}
            selectionMode="single"
            selection={selectedProduct1}
            onSelectionChange={OnRowSelectData}
            dataKey="id"
          >
            <Column field="sno" header="S.No" sortable></Column>
            <Column
              field="name"
              body={countryBodyTemplate}
              header="Name"
              filter
              sortable
            ></Column>
            <Column
              field="designation"
              header="Designation"
              sortable
              filter
            ></Column>
            <Column field="gender" header="Gender" sortable filter>
              {' '}
            </Column>
            <Column field="dob" header="Date of Birth" sortable filter></Column>
            <Column
              field="email"
              header="Email Address"
              sortable
              filter
            ></Column>
            <Column
              field="phone"
              header="Phone Number"
              sortable
              filter
            ></Column>
            <Column field="actions" header="Actions" sortable filter></Column>
            <Column
              field="status"
              body={Status}
              header="Status"
              sortable
              filterMenuStyle={{ width: '14rem' }}
              style={{ minWidth: '12rem' }}
              filter
            ></Column>
          </DataTable>
        </div>
      )}
    </div>
  );
};
export default React.memo(CandidateTable);
