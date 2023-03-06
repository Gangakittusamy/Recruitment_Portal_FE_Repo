import NavBar from "../../SuperAdmin/navBar/index";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import LayoutSideBar from "./layoutSidebar";
import "./layout.css";
import { useLocation } from "react-router-dom";

const LayoutPage = () => {
  const [state, setState] = useState<any>([]);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const location = useLocation();
  const { from } = location.state;
  return (
    <div style={{ background: "rgb(250, 250, 251)", height: "100vh" }}>
      <div>
        <NavBar />
        <div className="flex mt-3 create_form_main">
          <div className="layout_Sidebar">
            <LayoutSideBar />
          </div>

          <div className="create_form_main_division ml-3">
            <TabView
              className="tabview"
              activeIndex={activeIndex1}
              onTabChange={(e) => setActiveIndex1(e.index)}
            >
              <TabPanel header="Layout">
                <div>
                  <div className="text-900 capitalize  font-bold text-2xl">
                    {from}
                  </div>
                  <br />
                  <div>
                    Design your own layouts to fit your business processes, then
                    assign them to your user accounts based on permission
                    profiles.
                  </div>
                  <div className="flex justify-content-end mt-3">
                    <span>
                      <Button label="New Layout" icon="pi pi-plus" />
                    </span>
                  </div>
                  <div className="mt-3">
                    <DataTable
                      value={state}
                      paginator
                      responsiveLayout="scroll"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                      rows={5}
                      rowsPerPageOptions={[5, 10, 15]}
                      selectionMode="single"
                      dataKey="id"
                    >
                      <Column
                        field="Name"
                        header="Name"
                        className="text-primary"
                      ></Column>
                      <Column field="Shared To" header="Module Name"></Column>
                      <Column
                        field="Last Modified"
                        header="Last Modified"
                      ></Column>
                      <Column header="Status"></Column>
                    </DataTable>
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Layout Rules"></TabPanel>
              <TabPanel header="Validation Rules"></TabPanel>
              <TabPanel header="fields"></TabPanel>
              <TabPanel header="Links And Buttons"></TabPanel>
              <TabPanel header="Summary"></TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LayoutPage;
