import { TabView, TabPanel } from "primereact/tabview"
import { useEffect, useState } from "react"
import { InputText } from "primereact/inputtext"
import ModuleScreen from "./modules"
import { Button } from "primereact/button"
import { useNavigate } from "react-router"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

import { Dropdown } from "primereact/dropdown"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useSelector, useDispatch } from "react-redux"
import {
  ModuleNameGet,
  ModuleNameDelete,
  ModuleNameUpdate,
  ModuleNameGetFormsaa,
  resetModuleForms
} from "../../../features/Modules/module"
import {
  setPickListDropDownData,
  setSingleColumnForms
} from "../../../features/counter/dragAndDrop"
import { SpeedDial } from "primereact/speeddial"
import NavBar from "../navBar"
import ModuleSideBar from "./moduleSidebar"
import "./Modules.css"
import { Link } from "react-router-dom"
import _ from "lodash"

const SettingsModules = (props: any) => {
  const [value3, setValue3] = useState("")
  const [activeIndex1, setActiveIndex1] = useState(0)
  const [state, setState] = useState<any>([])
  const [tableData, setTableData] = useState<any>([])
  const [id, setId] = useState<any>()
  const navigate: any = useNavigate()
  const dispatch: any = useAppDispatch()
  const count: any = useSelector((state) => state)
  const [showSideNavbar, setShowSideNavbar] = useState(false)

  const NextPage = () => {
    dispatch(resetModuleForms())
    dispatch(setSingleColumnForms([]))
    navigate("/super-admin/create-form")
  }

  useEffect(() => {
    GetModuleName()
    dispatch(setPickListDropDownData([]))
  }, [])

  const GetModuleName = async () => {
    let res = await dispatch(ModuleNameGet())
    setTableData(res.payload.data.user)
    setState(res.payload.data.user)
  }

  const items = [
    {
      label: "Update",
      icon: "pi pi-pencil",
      command: async (y: any) => {
        dispatch(setSingleColumnForms([]))
        let res = await dispatch(ModuleNameGetFormsaa(id))
        if (res.payload.status === 200) {
          setId(null)
          navigate(`/super-admin/edit/${id}`)
        }
      }
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: async (y: any) => {
        let res = await dispatch(ModuleNameDelete(id))
        if (res.payload.status == 202) {
          setId(null)
          GetModuleName()
        }
      }
    }
  ]
  const layoutPagelick = (rowdata: any) => {
    return (
      <div>
        <Link
          to="/super-admin/Settings/Modules/layoutpage"
          state={{ from: rowdata.modulename }}
        >
          <span className="text-blue-500">{rowdata.modulename}</span>
        </Link>
      </div>
    )
  }
  const editPolicy = (data: any) => {
    return (
      <div className="speeddial-linear-demo ">
        <SpeedDial
          model={items}
          onClick={(x: any) => {
            setId(data._id)
          }}
          direction="right"
        />
      </div>
    )
  }

  const navbarClicked = () => {
    setShowSideNavbar(false)
  }

  const filterTable = (searchText: any) => {
    const tableData = _.cloneDeep(state)
    if (searchText.length) {
      const filteredModules = tableData.filter((m: any) => {
        return m.modulename.toLowerCase().includes(searchText.toLowerCase())
      })
      setTableData(filteredModules)
    } else {
      setTableData(tableData)
    }
  }

  return (
    <div
      style={{ background: "rgb(250, 250, 251)", height: "100vh" }}
      className="modulesList"
    >
      <div>
        <NavBar />
        <div className="nav-open-icon">
          <i
            className="pi pi-align-justify"
            style={{ fontSize: "1.5rem" }}
            onClick={() => setShowSideNavbar((prev) => !prev)}
          ></i>
        </div>
        <div className="flex mt-3 create_form_main">
          <div
            style={{ background: "gainsboro" }}
            className={`side-nav-bar ${showSideNavbar ? "show" : ""}`}
          >
            <ModuleSideBar navbarClicked={navbarClicked} />
          </div>

          <div className="create_form_main_division">
            <TabView
              className="tabview"
              activeIndex={activeIndex1}
              onTabChange={(e) => setActiveIndex1(e.index)}
            >
              <TabPanel header="Modules">
                <div>
                  <div className="flex justify-content-between mb-3">
                    <span className="p-input-icon-left">
                      <i className="pi pi-search" style={{ top: "40%" }} />
                      <InputText
                        value={value3}
                        onChange={(e) => {
                          setValue3(e.target.value)
                          filterTable(e.target.value)
                        }}
                        placeholder="Search"
                      />
                    </span>
                    <span className="pl-1 new-module-btn">
                      <Button
                        label="New Module"
                        icon="pi pi-plus"
                        onClick={NextPage}
                      />
                    </span>
                  </div>
                  <div>
                    <DataTable
                      value={tableData}
                      paginator
                      responsiveLayout="scroll"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                      rows={5}
                      rowsPerPageOptions={[5, 10, 15]}
                      selectionMode="single"
                      dataKey="id"
                    >
                      <Column
                        field="modulename"
                        header="Display in Tab As"
                        className="text-primary"
                        body={layoutPagelick}
                      ></Column>
                      <Column field="modulename" header="Module Name"></Column>
                      <Column
                        field="created_at"
                        header="Last Modified"
                      ></Column>
                      <Column
                        body={editPolicy}
                        header="Actions"
                        className="actions"
                      ></Column>
                    </DataTable>
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Tab Groups"></TabPanel>
              <TabPanel header="WebTabs"></TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SettingsModules
