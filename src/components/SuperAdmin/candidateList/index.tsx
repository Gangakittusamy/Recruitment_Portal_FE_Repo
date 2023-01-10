import "./CandidateList.css";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const CandidateList = () => {
  const [products, setProducts] = useState([
    {
      code: 1,
      name: "Recruiters",
    },
    {
      code: 2,
      name: "Recruiters list",
    },
    {
      code: 3,
      name: "Recruiters Top",
    },
  ]);

  const [city, setCity] = useState();

  const citySelectItems = [
    { label: "New York", value: "NY" },
    { label: "Rome", value: "RM" },
    { label: "London", value: "LDN" },
    { label: "Istanbul", value: "IST" },
    { label: "Paris", value: "PRS" },
  ];

  return (
    <div className="mx-5">
      <div className="flex justify-content-between ">
        <div></div>
        <h2>Candidate List</h2>
        <div className="flex justify-content-center align-items-center">
          <i className="pi pi-pencil"></i>
          <p className="ml-2">Edit</p>
        </div>
      </div>
      <div className="flex justify-content-between">
        <Dropdown
          value={city}
          options={citySelectItems}
          onChange={(e) => setCity(e.value)}
          placeholder="Selected"
          className=" Candidate_Button border-none  surface-300 flex align-items-center  justify-content-center"
        />
        <div className="flex justify-content-center align-items-center text-900">
          <Button
            label="Add New"
            className="mr-2 surface-300 border-none text-900 "
          />
          <Dropdown
            value={city}
            options={citySelectItems}
            onChange={(e) => setCity(e.value)}
            placeholder="Sort: A-Z"
            className="Candidate_Button h-full border-none"
          />
        </div>
      </div>
      <div className="mt-3">
        <DataTable value={products} responsiveLayout="scroll">
          <Column field="code" header="Ap no"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="quantity" header="Gender"></Column>
          <Column field="category" header="Applied For"></Column>
          <Column field="quantity" header="Experience"></Column>
          <Column field="quantity" header="Mail ID"></Column>
          <Column field="quantity" header="Status"></Column>
          <Column field="quantity" header="Phone Number"></Column>
          <Column field="quantity" header="Action"></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default React.memo(CandidateList);
