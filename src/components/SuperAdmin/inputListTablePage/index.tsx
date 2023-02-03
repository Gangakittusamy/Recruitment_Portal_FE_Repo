import { TabView, TabPanel } from "primereact/tabview";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useSelector, useDispatch } from "react-redux";
import { MultiSelect } from "primereact/multiselect";
import {
  ModuleNameGet,
  ModuleNameDelete,
  ModuleNameUpdate,
} from "../../../features/Modules/module";
import { SpeedDial } from "primereact/speeddial";
import NavBar from "../navBar";
import TablePageSideBar from "./listTableSidebar";
import "./tablePage.css";
import { Link } from "react-router-dom";
import React from "react";
import { useParams } from "react-router-dom";
import { ModuleNameGetFormsaa } from "../../../features/Modules/module";
import { leadGenerationTableGet } from "../../../features/Modules/leadGeneration";
import { LoginUserDetails } from "../../../features/Auth/userDetails";

//rolesGetForms
const FieldListTablePage = (props: any) => {
  const [getdata, setgetdata] = useState<any>([]);
  const [id, setid] = useState<any>();
  const [Get, setGet] = useState<any>([]);
  const [forms, setForms] = useState<any>([]);
  const [formData, setformData] = useState<any>([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [TableData, setTableData] = useState<any>([]);
  const navigate: any = useNavigate();
  const dispatch: any = useAppDispatch();
  const count: any = useSelector((state) => state);
  let { editTableId } = useParams();
  const user: any = useAppSelector((state) => state);
  const [buttonName, setButtonName] = useState<any>();
  const [duplicate, setDuplicate] = useState<any>();
  const [selectedColumns, setSelectedColumns] = useState<any>(null);

  async function firstGetApi() {
    let res = await dispatch(ModuleNameGetFormsaa(editTableId));
    if (res) {
      setButtonName(res?.payload?.data?.data[0]?.modulename);
    }

    let response = await dispatch(leadGenerationTableGet(editTableId));

    let resp = response.payload.data;
    resp = resp.map((x: any, i: number) => {
      return x.tableData.tableData[0];
    });

    setgetdata(resp);

    // let resultId = response.payload.data[0].recuriter;

    // setid(resultId);

    const value = res.payload.data.data
      ? res.payload.data.data[0].moduleelements
      : [];

    Object.keys(value).map((list, index) => {
      Object.keys(value[list] || []).map((heading: any, index: any) => {
        formData.push(list);
        Get.push({
          formData: list,
          DataHeader: value[list][heading].fieldname,
          value: value[list][heading].defaultvalue,
        });
        TableData.push(heading);
        forms.push(value[list][heading]);
      });
    });

    setGet(Get);
    setForms(forms);
    setTableData(TableData);
    setformData(formData);
  }

  useEffect(() => {
    firstGetApi();
  }, [editTableId]);

  const [columns, setColumns] = useState<any>([]);
  const [userSelectedColumns, setUserSelectedColumns] = useState<any>([]);


  function removeDuplicates(result: any) {
    return result.filter(
      (item: any, index: number) => result.indexOf(item) === index
    );
  }

  if (getdata.length > 0) {
    if (selectedColumns === null) {
      // setSelectedColumns(columns);

      let result = getdata.flatMap(Object.keys);
      let res = removeDuplicates(result);
      setDuplicate(res);

      let dup: any = [];
      res.map((x: any, i: number) => {
        dup.push({ field: x, header: x });
      });

      setSelectedColumns(dup);
      let columns:any = []
      let userColumns:any = []

      res.map((x: any, i: number) => {
        userColumns.push(x)
        const column = { field: x, header: x }
        columns.push(column)
      });
      setUserSelectedColumns(userColumns)
      setColumns(columns)
    }
  }

  function onColumnToggle(event: any) {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col:any) =>
      selectedColumns.some(
        (sCol: { field: string }) => sCol.field === col.field
      )
    );
    setSelectedColumns(selectedColumns);
    let dup: any = [];
    duplicate.map((x: any, i: number) => {
      dup.push({ field: x, header: x });
    });
    setSelectedColumns(orderedSelectedColumns);

    let userColumns:any = []
    orderedSelectedColumns.map((x: any, i: number) => {
      userColumns.push(x.field)
    });
    setUserSelectedColumns(userColumns)

    const isSameUser = (columns: any, orderedSelectedColumns: any) =>
      columns.field === orderedSelectedColumns.field &&
      columns.header === orderedSelectedColumns.header;

    const onlyInLeft = (left: any, right: any, compareFunction: any) =>
      left.filter(
        (leftValue: any) =>
          !right.some((rightValue: any) =>
            compareFunction(leftValue, rightValue)
          )
      );

    const onlyInA = onlyInLeft(columns, orderedSelectedColumns, isSameUser);
    const onlyInB = onlyInLeft(orderedSelectedColumns, columns, isSameUser);

    const result = [...onlyInA, ...onlyInB];

    result.map((x: any, i: number) => {
      const filteredArray = userSelectedColumns.filter((c:any)=>{
        return c !== x.field
      })
      setUserSelectedColumns(filteredArray)
    });
  }

  const header = (
    <div className="flex justify-content-between">
      <MultiSelect
        value={selectedColumns}
        options={columns}
        optionLabel="header"
        onChange={onColumnToggle}
        style={{ width: "20em" }}
      />
      <Link
        to="/super-admin/CustomModule/being"
        state={{
          from: Get,
          id: id,
          recId: editTableId,
        }}
      >
        <Button label={`Create a ${buttonName}`} />
      </Link>
    </div>
  );

  return (
    <div style={{ background: "rgb(250, 250, 251)", height: "100vh" }}>
      <div>
        <NavBar />
        <div className="flex mt-3 create_form_main">
          <div style={{ background: "gainsboro" }}>
            <TablePageSideBar />
          </div>

          <div className="create_form_main_division ml-3">
            <div>
              <div>
                <DataTable
                  value={getdata}
                  paginator
                  responsiveLayout="scroll"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                  rows={5}
                  rowsPerPageOptions={[5, 10, 15]}
                  selectionMode="single"
                  header={header}
                  resizableColumns
                  columnResizeMode="fit"
                  selection={selectedProducts}
                  onSelectionChange={(e) => setSelectedProducts(e.value)}
                >
                  <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3rem" }}
                    exportable={false}
                  ></Column>

                  {userSelectedColumns.length > 0 && userSelectedColumns.map((column:any,index:any) => {
                    return <Column key={index} field={column} header={column}></Column>
                  })}

                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(FieldListTablePage);
