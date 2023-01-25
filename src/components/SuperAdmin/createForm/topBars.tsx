import "./CreateForm.css";
import Edit from "../../../assets/edit.png";
import Add from "../../../assets/add.png";
import Actions from "../../../assets/actions.png";
import { Sidebar } from "primereact/sidebar";
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import noImages from "../../../images//noimage.jpg";
import { useSelector, useDispatch } from "react-redux";
import { TabMenu } from "primereact/tabmenu";

const TopBars = (props: any) => {
  const count: any = useSelector((state) => state);
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [preview, setPreview] = useState(false);
  const [previewData, setPreviewData] = useState<any>();
  const [checked1, setChecked1] = useState(false);

  const onCityChange = (e: any) => {
    setSelectedCity1(e.value);
  };
  const cities = [{ name: "Admistrator", code: "NY" }];

  useEffect(() => {
    setPreviewData(count.dragAndDrop.initialStartDragSuperAdmin);
  }, [count.dragAndDrop.initialStartDragSuperAdmin]);

  // const TopBars = (props: any) => {
  const [activeIndex, setActiveIndex] = useState(3);
  const status = (e: any) => {
    setActiveIndex(e.index);
    props.pageClick(e);
    if (e.index === 5) {
      setPreview(true);
    }
  };

  return (
    <div>
      <TabMenu
        model={props.items}
        activeIndex={activeIndex}
        onTabChange={status}
      />

      <Sidebar
        visible={preview}
        position="top"
        style={{ width: "100vw", height: "70vw" }}
        onHide={() => setPreview(!preview)}
      >
        <div>
          <div className="flex  justify-content-center">
            <div className="dropdownBorderStyle">
              <span className="flex">
                Preview layout as
                <Dropdown
                  className="ml-2"
                  value={selectedCity1}
                  options={cities}
                  onChange={onCityChange}
                  optionLabel="name"
                  placeholder="Select a City"
                />
              </span>
            </div>
          </div>
          <div className="border-black-alpha-30 border-1 pb-7">
            <span className="contactName ">Create Untitled</span>
            <span className="contactuntitle">Untitled Image</span>

            <span className="ml-5">
              <img
                src={noImages}
                style={{ width: " 56px", height: "50px" }}
              ></img>
            </span>
            <span className="contactuntitle">Untitled Information</span>
            <div>
              <div>
                {Object.keys(previewData || []).map((list: any, i: number) => {
                  return (
                    <div key={i} className="previewCardAligment">
                      {previewData[list]?.map((item: any, index: number) => {
                        return (
                          <div key={index}>
                            <div className="card border-0 mt-3 ml-7">
                              <div className="names">
                                <p className="grey">
                                  {item.subName || item.type}
                                </p>
                                {item.names ||
                                item.type === "Untitled Owner" ? (
                                  <span className="p-input-icon-right ">
                                    <i className="pi pi-lock mt-0" />
                                    <InputText
                                      value={item.names || item.type}
                                      className="mt-3"
                                      disabled
                                    />
                                  </span>
                                ) : item.names === "Lookup" ? (
                                  <span className="p-input-icon-right ">
                                    <i className="pi pi-euro mt-0" />
                                    <InputText
                                      className="mt-3"
                                      disabled
                                      value={item.names || item.type}
                                    />
                                  </span>
                                ) : item.names === "Currency" ? (
                                  <span className="p-input-icon-left">
                                    <i className="pi pi-dollar mt-0" />
                                    <InputText
                                      className="mt-3 "
                                      disabled
                                      value={item.names || item.type}
                                    />
                                  </span>
                                ) : item.names || item.type === "Percent" ? (
                                  <p>
                                    <InputText
                                      value={item.names || item.type}
                                      disabled
                                    />
                                  </p>
                                ) : item.names ||
                                  item.type === "Untitled Name" ? (
                                  <p>
                                    <InputText
                                      value={item.names || item.type}
                                      disabled
                                    />
                                  </p>
                                ) : item.names === "Created By" ? (
                                  <p>
                                    <InputText
                                      value={item.names || item.type}
                                      disabled
                                    />
                                  </p>
                                ) : item.names ||
                                  item.type === "Secondary Email" ? (
                                  <p>
                                    <InputText
                                      disabled
                                      value={item.names || item.type}
                                    />
                                  </p>
                                ) : item.names ||
                                  item.type === "Image Upload" ? (
                                  <p>
                                    <Button
                                      label="+ New Image"
                                      className="bg-blue-100 text-primary"
                                    />
                                  </p>
                                ) : item.names || item.type === "Email" ? (
                                  <p>
                                    <InputText
                                      placeholder="Enter your email"
                                      value={item.names || item.type}
                                    />
                                  </p>
                                ) : item.names ||
                                  item.type === "File Upload" ? (
                                  <p>
                                    {/* <Dropdown
                                      className="mr-6"
                                      value={selectedCity1}
                                      options={fileUpload}
                                      onChange={onCityChange}
                                      optionLabel="name"
                                      style={{ width: "99%" }}
                                      placeholder="Select a file"
                                    /> */}
                                  </p>
                                ) : item.names ||
                                  item.type === "Email Opt Out" ? (
                                  <p>
                                    <Checkbox value={item.names || item.type} />
                                  </p>
                                ) : item.names ||
                                  item.type === "Modified By" ? (
                                  <p>
                                    <InputText
                                      disabled
                                      value={item.names || item.type}
                                    />
                                  </p>
                                ) : item.names || item.type === "Date/Time" ? (
                                  <p>
                                    <Calendar
                                      value={item.names || item.type}
                                      showTime
                                      disabled
                                      showSeconds
                                      placeholder="Enter the date"
                                    />
                                  </p>
                                ) : item.names || item.type === "Decimal" ? (
                                  <p>
                                    <InputText
                                      value={item.names || item.type}
                                      disabled
                                    />
                                  </p>
                                ) : item.names || item.type === "URL" ? (
                                  <p>
                                    <InputText
                                      value={item.names || item.type}
                                      disabled
                                    />
                                  </p>
                                ) : item.names || item.type === "Multi-Line" ? (
                                  <p>
                                    <InputTextarea
                                      value={item.names || item.type}
                                      disabled
                                    />
                                  </p>
                                ) : item.names || item.type === "Date" ? (
                                  <p>
                                    <Calendar
                                      value={item.names || item.type}
                                      placeholder="DD/MM/YY   "
                                    />
                                  </p>
                                ) : item.names === "Checkbox" ? (
                                  <div className="grid p-fluid">
                                    <div className="col-12">
                                      <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                          <Checkbox
                                            checked={checked1}
                                            onChange={(e) =>
                                              setChecked1(!checked1)
                                            }
                                          />
                                        </span>
                                        <InputText placeholder="Username" />
                                      </div>
                                    </div>
                                  </div>
                                ) : item.names || item.type === "Phone" ? (
                                  <p>
                                    {" "}
                                    <InputMask
                                      id="phone"
                                      mask="99-99-99-99-99"
                                      disabled
                                      placeholder="(999) 999-9999"
                                    ></InputMask>
                                  </p>
                                ) : item.names ||
                                  item.type === "Long integer" ? (
                                  <p>
                                    <InputText
                                      value={item.names || item.type}
                                      disabled
                                    />
                                  </p>
                                ) : item.names || item.type === "Number" ? (
                                  <p>
                                    <InputText
                                      value={item.names || item.type}
                                      disabled
                                    />
                                  </p>
                                ) : item.names || item.type === "User" ? (
                                  <span className="p-input-icon-right ">
                                    {/* <Dropdown
                                      className="mr-6"
                                      value={selectedCity1}
                                      options={cities}
                                      onChange={onCityChange}
                                      optionLabel="name"
                                      style={{ width: "99%" }}
                                      placeholder="Select a City"
                                    /> */}
                                  </span>
                                ) : (
                                  <InputText
                                    type="text"
                                    name="names"
                                    value={item.names || item.type}
                                    onChange={(e) => {}}
                                    disabled
                                    className="h-2rem my-auto"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default React.memo(TopBars);
