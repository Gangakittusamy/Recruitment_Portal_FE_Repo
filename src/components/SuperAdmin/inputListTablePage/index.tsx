import { TabView, TabPanel } from "primereact/tabview"
import { useEffect, useState } from "react"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { useNavigate } from "react-router"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Dropdown } from "primereact/dropdown"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useSelector, useDispatch } from "react-redux"
import { MultiSelect } from "primereact/multiselect"
import {
  ModuleNameGet,
  ModuleNameDelete,
  ModuleNameUpdate
} from "../../../features/Modules/module"
import { setSingleColumnForms } from "../../../features/counter/dragAndDrop"
import { SpeedDial } from "primereact/speeddial"
import NavBar from "../navBar"
import TablePageSideBar from "./listTableSidebar"
import "./tablePage.css"
import { Link } from "react-router-dom"
import React from "react"
import { useParams } from "react-router-dom"
import { ModuleNameGetFormsaa } from "../../../features/Modules/module"
import { leadGenerationTableGet } from "../../../features/Modules/leadGeneration"
import { LoginUserDetails } from "../../../features/Auth/userDetails"
import { ProgressSpinner } from "primereact/progressspinner"
import _ from "lodash"

//rolesGetForms
const FieldListTablePage = (props: any) => {
  const [getdata, setgetdata] = useState<any>([])
  const [id, setid] = useState<any>()
  const [Get, setGet] = useState<any>([])
  const [forms, setForms] = useState<any>([])
  const [formData, setformData] = useState<any>([])
  const [selectedProducts, setSelectedProducts] = useState(null)
  const [TableData, setTableData] = useState<any>([])
  const navigate: any = useNavigate()
  const dispatch: any = useAppDispatch()
  const count: any = useSelector((state) => state)
  let { editTableId } = useParams()
  const user: any = useAppSelector((state) => state)
  const [buttonName, setButtonName] = useState<any>()
  const [duplicate, setDuplicate] = useState<any>()
  const [selectedColumns, setSelectedColumns] = useState<any>(null)
  const [columns, setColumns] = useState<any>([])
  const [userSelectedColumns, setUserSelectedColumns] = useState<any>([])
  const [isLoading, setIsLoading] = useState<any>()
  const [listView, setListView] = useState<any>({
    name: "List View",
    icon: "list"
  })

  async function firstGetApi() {
    setIsLoading(true)
    let [res, response] = await Promise.all([
      dispatch(ModuleNameGetFormsaa(editTableId)),
      dispatch(leadGenerationTableGet(editTableId))
    ])
    setIsLoading(false)

    if (res) {
      setButtonName(res?.payload?.data?.data[0]?.modulename)
      const singleColumnData = res?.payload?.data?.data[0]?.singleColumnForms
      dispatch(setSingleColumnForms(singleColumnData ? singleColumnData : []))
    }
    // let response = await dispatch(leadGenerationTableGet(editTableId));

    let resp = response.payload.data
    resp = resp.map((x: any, i: number) => {
      return { ...x.tableData.tableData[0], id: x._id }
    })

    setgetdata(resp)

    // let resultId = response.payload.data[0].recuriter;

    // setid(resultId);

    const value = res.payload.data.data
      ? res.payload.data.data[0].moduleelements
      : []

    let formArray: any = []

    Object.keys(value).map((list, index) => {
      Object.keys(value[list] || []).map((heading: any, index: any) => {
        formData.push(list)
        formArray.push({
          formData: list,
          DataHeader: value[list][heading].fieldname,
          value: value[list][heading].defaultvalue,
          options: value[list][heading].options
            ? value[list][heading].options
            : {},
          type: value[list][heading].type,
          required: value[list][heading].required
            ? value[list][heading].required
            : false,
          unique: value[list][heading].unique
            ? value[list][heading].unique
            : false
        })
        TableData.push(heading)
        forms.push(value[list][heading])
      })
    })

    setGet(formArray)
    setForms(forms)
    setTableData(TableData)
    setformData(formData)
    setSelectedColumns(null)
  }

  useEffect(() => {
    firstGetApi()
    setUserSelectedColumns([])
  }, [editTableId])

  function removeDuplicates(result: any) {
    return result.filter(
      (item: any, index: number) => result.indexOf(item) === index
    )
  }

  if (getdata.length > 0) {
    if (selectedColumns === null) {
      let result = getdata.flatMap(Object.keys)
      let res = removeDuplicates(result)
      setDuplicate(res)

      let dup: any = []
      res.map((x: any, i: number) => {
        dup.push({ field: x, header: x })
      })

      setSelectedColumns(dup)
      let columns: any = []
      let userColumns: any = []

      res.map((x: any, i: number) => {
        userColumns.push(x)
        const column = { field: x, header: x }
        columns.push(column)
      })
      setUserSelectedColumns(userColumns)
      setColumns(columns)
    }
  }

  function onColumnToggle(event: any) {
    let selectedColumns = event.value
    let orderedSelectedColumns = columns.filter((col: any) =>
      selectedColumns.some(
        (sCol: { field: string }) => sCol.field === col.field
      )
    )
    setSelectedColumns(selectedColumns)
    let dup: any = []
    duplicate.map((x: any, i: number) => {
      dup.push({ field: x, header: x })
    })
    setSelectedColumns(orderedSelectedColumns)

    let userColumns: any = []
    orderedSelectedColumns.map((x: any, i: number) => {
      userColumns.push(x.field)
    })
    setUserSelectedColumns(userColumns)

    const isSameUser = (columns: any, orderedSelectedColumns: any) =>
      columns.field === orderedSelectedColumns.field &&
      columns.header === orderedSelectedColumns.header

    const onlyInLeft = (left: any, right: any, compareFunction: any) =>
      left.filter(
        (leftValue: any) =>
          !right.some((rightValue: any) =>
            compareFunction(leftValue, rightValue)
          )
      )

    const onlyInA = onlyInLeft(columns, orderedSelectedColumns, isSameUser)
    const onlyInB = onlyInLeft(orderedSelectedColumns, columns, isSameUser)

    const result = [...onlyInA, ...onlyInB]

    result.map((x: any, i: number) => {
      const filteredArray = userSelectedColumns.filter((c: any) => {
        return c !== x.field
      })
      setUserSelectedColumns(filteredArray)
    })
  }

  const groupByForms = (forms: any) => {
    const groupByForms = _.groupBy(forms, "formData")
    return groupByForms
  }

  const listViews = [
    {
      name: "List View",
      icon: "list"
    },
    { name: "Canvas View", icon: "qrcode" }
  ]

  const selectedViewTemplate = (option: any, props: any) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <i className={`pi pi-${option.icon} m-2`}></i>
        </div>
      )
    }
    return <span>{props.placeholder}</span>
  }

  const ViewOptionTemplate = (option: any) => {
    return (
      <div className="flex align-items-center">
        <i className={`pi pi-${option.icon} mr-2`}></i>
        <div>{option.name}</div>
      </div>
    )
  }

  const header = (
    <div className="flex justify-content-between align-items-center">
      <MultiSelect
        value={selectedColumns}
        options={columns}
        optionLabel="header"
        onChange={onColumnToggle}
        style={{ width: "20em", height: "3em" }}
      />
      {buttonName && (
        <div className="flex align-items-center view-select">
          <div>
            <Dropdown
              value={listView}
              onChange={(e) => setListView(e.value)}
              options={listViews}
              valueTemplate={selectedViewTemplate}
              itemTemplate={ViewOptionTemplate}
              optionLabel="name"
              className="w-full md:w-14rem"
            />
          </div>
          <Link
            to="/super-admin/CustomModule/being"
            state={{
              forms: groupByForms(Get),
              id: id,
              recId: editTableId,
              module: buttonName
            }}
          >
            <Button label={`Create a ${buttonName}`} />
          </Link>
        </div>
      )}
    </div>
  )

  const getColumnForCanvasView = (rowData: any) => {
    return (
      <div className="canvas-col-container">
        {rowData &&
          Object.keys(rowData).map((key: any, index: any) => {
            if (key !== "id" && userSelectedColumns?.includes(key)) {
              return (
                <div className="col-element">
                  <span className="title">{key}</span> :{" "}
                  <span className="value">{rowData[key]}</span>
                </div>
              )
            }
          })}
      </div>
    )
  }

  const rowEditButton = (rowData: any) => {
    return (
      <div className="row-edit-icon">
        <Link
          to={`/super-admin/CustomModule/edit/${rowData.id}`}
          state={{
            forms: groupByForms(Get),
            id: id,
            recId: editTableId,
            module: buttonName,
            rowData
          }}
        >
          <Button icon="pi pi-pencil" />
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: "rgb(250, 250, 251)", height: "100vh" }}>
      <div>
        <NavBar />
        {isLoading && (
          <div className="create_form_main">
            <ProgressSpinner
              style={{ width: "50px", height: "75vh" }}
              strokeWidth="8"
              className=""
            />
          </div>
        )}
        {!isLoading && (
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
                    <Column body={rowEditButton}></Column>

                    <Column
                      selectionMode="multiple"
                      headerStyle={{ width: "3rem" }}
                      exportable={false}
                    ></Column>

                    {listView.name === "List View" &&
                      userSelectedColumns.length > 0 &&
                      userSelectedColumns.map((column: any, index: any) => {
                        return column !== "id" ? (
                          <Column
                            key={index}
                            field={column}
                            header={column}
                          ></Column>
                        ) : (
                          <Column />
                        )
                      })}

                    {listView.name === "Canvas View" &&
                      userSelectedColumns.length > 0 && (
                        <Column body={getColumnForCanvasView}></Column>
                      )}
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default React.memo(FieldListTablePage)
