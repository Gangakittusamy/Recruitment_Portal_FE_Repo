import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import NavBar from "../../navBar"
import TablePageSideBar from ".././listTableSidebar"
import { TabView, TabPanel } from "primereact/tabview"
import "./formOverview.css"
import FilledFormDetails from "./filledFormDetails"

const FormOverview = () => {
  const location = useLocation()
  const { formElements, moduleId, moduleName, selectedForm } = location.state

  return (
    <div style={{ background: "rgb(250, 250, 251)", height: "100vh" }}>
      <div>
        <NavBar />
        <div className="flex mt-3 create_form_main">
          <div style={{ background: "gainsboro" }}>
            <TablePageSideBar />
          </div>
          <div className="create_form_main_division ml-3">
            <TabView>
              <TabPanel header="Overview">
                <FilledFormDetails
                  formElements={formElements}
                  selectedForm={selectedForm}
                />
                <div className="border-black-alpha-30 border-1 pb-3 overview-indv-block mt-5 attachments">
                  <div className="heading">Attachments</div>
                  <div className="content">No Attachment</div>
                </div>
              </TabPanel>
              <TabPanel header="Timeline">
                <p className="m-0">timeline</p>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(FormOverview)
