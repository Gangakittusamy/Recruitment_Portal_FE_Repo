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
  const [value, setValue] = useState("");
  const [getdata, setgetdata] = useState<any>([]);
  const [modulename, setmodulename] = useState("");
  const [id, setid] = useState<any>();
  const [Get, setGet] = useState<any>([]);
  const [DataGet, setDataGet] = useState<any>([]);
  const [Getdata, setGetdata] = useState<any>([]);
  const [forms, setForms] = useState<any>([]);
  const [formData, setformData] = useState<any>([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [TableData, setTableData] = useState<any>([]);
  const [moduleElements, setModuleElements] = useState<any>();
  const navigate: any = useNavigate();
  const dispatch: any = useAppDispatch();
  const count: any = useSelector((state) => state);
  let { editTableId } = useParams();
  const user: any = useAppSelector((state) => state);
  const [buttonName, setButtonName] = useState<any>();
  const [coloumnData, setColoumnData] = useState<any>();
  const [duplicate, setDuplicate] = useState<any>();
  const [selectedColumns, setSelectedColumns] = useState<any>(null);

  async function firstGetApi() {
    let app = {};
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

  const columns = [
    { field: "Single Line", header: "Single Line" },
    { field: "Multi-Line", header: "Multi-Line" },
    { field: "Email", header: "Email" },
    { field: "Phone", header: "Phone" },
    { field: "Pick List", header: "Pick List" },
    { field: "Date", header: "Date" },
    { field: "Date/Time", header: "Date/Time" },
    { field: "Number", header: "Number" },
    { field: "Currency", header: "Currency" },
    { field: "Decimal", header: "Decimal" },
    { field: "Percent", header: "Percent" },
    { field: "Long integer", header: "Long integer" },
    { field: "Checkbox", header: "Checkbox" },
    { field: "URL", header: "URL" },
    { field: "File Upload", header: "File Upload" },
    { field: "Image Upload", header: "Image Upload" },
  ];

  // useEffect(() => {
  //   GetModuleName();
  // }, []);
  const [singleLine, setSingleLine] = useState<any>("");
  const [multiLine, setMultipleLine] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [phone, setPhone] = useState<any>("");
  const [pickList, setPickList] = useState<any>("");
  const [date, setDate] = useState<any>("");
  const [dateTime, setDateTime] = useState<any>("");
  const [number, setNumber] = useState<any>("");
  const [currency, setCurrency] = useState<any>("");
  const [decimal, setDecimal] = useState<any>("");
  const [percent, setPercent] = useState<any>("");
  const [longInteger, setInteger] = useState<any>("");
  const [checkbox, setCheckbox] = useState<any>("");
  const [url, setURL] = useState<any>("");
  const [fileUpload, setFileUpload] = useState<any>("");
  const [imageUpload, setImageUpload] = useState<any>("");

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

      res.map((x: any, i: number) => {
        if (x === "Single Line") {
          setSingleLine("Single Line");
        } else if (x === "Multi-Line") {
          setMultipleLine("Multi-Line");
        } else if (x === "Email") {
          setEmail("Email");
        } else if (x === "Phone") {
          setPhone("Phone");
        } else if (x === "Pick List") {
          setPickList("Pick List");
        } else if (x === "Date") {
          setDate("Date");
        } else if (x === "Date/Time") {
          setDateTime("Date/Time");
        } else if (x === "Number") {
          setNumber("Number");
        } else if (x === "Currency") {
          setCurrency("Currency");
        } else if (x === "Decimal") {
          setDecimal("Decimal");
        } else if (x === "Percent") {
          setPercent("Percent");
        } else if (x === "Long integer") {
          setInteger("Long integer");
        } else if (x === "Checkbox") {
          setCheckbox("Checkbox");
        } else if (x === "URL") {
          setURL("URL");
        } else if (x === "File Upload") {
          setFileUpload("File Upload");
        } else if (x === "Image Upload") {
          setImageUpload("Image Upload");
        }
      });
    }
  }

  function onColumnToggle(event: any) {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
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

    orderedSelectedColumns.map((x: any, i: number) => {
      if (x.field === "Single Line") {
        setSingleLine("Single Line");
      } else if (x.field === "Multi-Line") {
        setMultipleLine("Multi-Line");
      } else if (x.field === "Email") {
        setEmail("Email");
      } else if (x.field === "Phone") {
        setPhone("Phone");
      } else if (x.field === "Pick List") {
        setPickList("Pick List");
      } else if (x.field === "Date") {
        setDate("Date");
      } else if (x.field === "Date/Time") {
        setDateTime("Date/Time");
      } else if (x.field === "Number") {
        setNumber("Number");
      } else if (x.field === "Currency") {
        setCurrency("Currency");
      } else if (x.field === "Decimal") {
        setDecimal("Decimal");
      } else if (x.field === "Percent") {
        setPercent("Percent");
      } else if (x.field === "Long integer") {
        setInteger("Long integer");
      } else if (x.field === "Checkbox") {
        setCheckbox("Checkbox");
      } else if (x.field === "URL") {
        setURL("URL");
      } else if (x.field === "File Upload") {
        setFileUpload("File Upload");
      } else if (x.field === "Image Upload") {
        setImageUpload("Image Upload");
      }
    });

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
      if (x.field === "Single Line") {
        setSingleLine("");
      } else if (x.field === "Multi-Line") {
        setMultipleLine("");
      } else if (x.field === "Email") {
        setEmail("");
      } else if (x.field === "Phone") {
        setPhone("");
      } else if (x.field === "Pick List") {
        setPickList("");
      } else if (x.field === "Date") {
        setDate("");
      } else if (x.field === "Date/Time") {
        setDateTime("");
      } else if (x.field === "Number") {
        setNumber("");
      } else if (x.field === "Currency") {
        setCurrency("");
      } else if (x.field === "Decimal") {
        setDecimal("");
      } else if (x.field === "Percent") {
        setPercent("");
      } else if (x.field === "Long integer") {
        setInteger("");
      } else if (x.field === "Checkbox") {
        setCheckbox("");
      } else if (x.field === "URL") {
        setURL("");
      } else if (x.field === "File Upload") {
        setFileUpload("");
      } else if (x.field === "Image Upload") {
        setImageUpload("");
      }
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

                  {singleLine == "Single Line" ? (
                    <Column field="Single Line" header="Single Line"></Column>
                  ) : null}
                  {multiLine == "Multi-Line" ? (
                    <Column field="Multi-Line" header="Multi-Line"></Column>
                  ) : null}
                  {email == "Email" ? (
                    <Column field="Email" header="Email"></Column>
                  ) : null}
                  {phone == "Phone" ? (
                    <Column field="Phone" header="Phone"></Column>
                  ) : null}
                  {pickList == "Pick List" ? (
                    <Column field="Pick List" header="Pick List"></Column>
                  ) : null}
                  {date == "Date" ? (
                    <Column field="Date" header="Date"></Column>
                  ) : null}
                  {dateTime == "Date/Time" ? (
                    <Column field="Date/Time" header="Date/Time"></Column>
                  ) : null}
                  {number == "Number" ? (
                    <Column field="Number" header="Number"></Column>
                  ) : null}
                  {currency == "Currency" ? (
                    <Column field="Currency" header="Currency"></Column>
                  ) : null}
                  {decimal == "Decimal" ? (
                    <Column field="Decimal" header="Decimal"></Column>
                  ) : null}
                  {percent == "Percent" ? (
                    <Column field="Percent" header="Percent"></Column>
                  ) : null}
                  {longInteger == "Long integer" ? (
                    <Column field="Long integer" header="Long integer"></Column>
                  ) : null}
                  {checkbox == "Checkbox" ? (
                    <Column field="Checkbox" header="Checkbox"></Column>
                  ) : null}
                  {url == "URL" ? (
                    <Column field="URL" header="URL"></Column>
                  ) : null}
                  {fileUpload == "File Upload" ? (
                    <Column field="File Upload" header="File Upload"></Column>
                  ) : null}
                  {imageUpload == "Image Upload" ? (
                    <Column field="Image Upload" header="Image Upload"></Column>
                  ) : null}

                  {/* <Column field="Single Line" header="Single Line"></Column>
                  <Column field="Multi-Line" header="Multi-Line"></Column>
                  <Column field="Email" header="Email"></Column>
                  <Column field="Phone" header="Phone"></Column>
                  <Column field="Pick List" header="Pick List"></Column>
                  <Column field="Date" header="Date"></Column>
                  <Column field="Date/Time" header="Date/Time"></Column>
                  <Column field="Number" header="Number"></Column>
                  <Column field="Currency" header="Currency"></Column>
                  <Column field="Decimal" header="Decimal"></Column>
                  <Column field="Percent" header="Percent"></Column>
                  <Column field="Long integer" header="Long integer"></Column>
                  <Column field="Checkbox" header="Checkbox"></Column>
                  <Column field="URL" header="URL"></Column>
                  <Column field="File Upload" header="File Upload"></Column>
                  <Column field="Image Upload" header="Image Upload"></Column> */}
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
