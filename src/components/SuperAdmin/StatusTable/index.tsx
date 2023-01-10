import   './statustable.css'
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import OnRowSelect from '../OnRowSelectPage/index';
import Profile from '../../../assets/profile.png';
import { CANDIDATETABLE } from '../../Constant/const';

const StatusTable = () => {
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [products, setProducts] = useState(CANDIDATETABLE);
  const [status, setstatus] = useState();
  const [selectedRow, setselectedRow] = useState(false);
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [passData, setpassData] = useState([]);
  const statuses = [
    'Selected',
    'Progress',
    'Notselected',
    'OnHoldProgress',
  ];
  const statusItemTemplate = (option: any) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };
  const OnRowSelectData = (rowData: any) => {
    setselectedRow(!selectedRow);
    setpassData(rowData);
  };
  const countryBodyTemplate = (rowData: any) => {
    return (
      <div className="flex align-items-center">
        <img alt="flag" src={Profile} width={30} height={30} />
        <span className="ml-1">{rowData.name}</span>
      </div>
    );
  };
  const dateFilterTemplate = (options:any) => {
     return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="date" mask="99/99/9999" />
 }
  const statusRowFilterTemplate = (options: any) => {
    return (
      <div>
        <Dropdown
          value={options.value}
          options={statuses}
          onChange={(e) => options.filterApplyCallback(e.value)}
          itemTemplate={statusItemTemplate}
          placeholder="Select a Status"
          className="p-column-filter w-12"
          showClear
        />
      </div>
    );
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
        <OnRowSelect datas={passData} handleClick={OnRowSelectData} />
      ) : (
        <div className="mx-5 my-3">
          <div className="flex justify-content-between align-items-center">
            <h2 className=" "> Interview Status</h2>
          </div>
          {status}

          <DataTable
          
            value={products}
            paginator
            filterDisplay="row"
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
              filterPlaceholder="Name"
              style={{ minWidth: '12rem' }}
              sortable
            ></Column>
            <Column
              field="designation"
              header="Designation"
              sortable
              filter
              filterPlaceholder="Designation"
              style={{ minWidth: '12rem' }}
            ></Column>
            <Column
              field="gender"
              header="Gender"
              sortable
              filter
              filterPlaceholder="Gender"
              style={{ minWidth: '12rem' }}
            >
              {' '}
            </Column>
            <Column
              field="dob"
              header="Date of Birth"
              sortable
              filter
              
              filterPlaceholder="Date"
              style={{ minWidth: '12rem' }}
              
            ></Column>
            <Column
              field="email"
              header="Email Address"
              sortable
              filter
              filterPlaceholder="Email"
              style={{ minWidth: '12rem' }}
            ></Column>
            <Column
              field="phone"
              header="Phone Number"
              sortable
              filter
              filterPlaceholder="Phone Number"
              style={{ minWidth: '12rem' }}
            ></Column>
            <Column
              field="actions"
              header="Actions"
              sortable
              filter
              filterPlaceholder="Actions"
              style={{ minWidth: '12rem' }}
            ></Column>
            <Column
              field="status"
              body={Status}
              header="Status"
              sortable
              showFilterMenu={false}
              filterMenuStyle={{ width: '14rem' }}
              style={{ minWidth: '12rem' }}
              filter
              filterElement={statusRowFilterTemplate}
            ></Column>
          </DataTable>
        </div>
      )}
    </div>
  );
};
export default React.memo(StatusTable);
