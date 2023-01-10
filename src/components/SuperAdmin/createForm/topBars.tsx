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
  const [activeIndex, setActiveIndex] = useState(6);
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
        style={{ width: "92vw", height: "50vw" }}
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
                                <p className="grey">{item.subName}</p>
                                {item.names === "Untitled Owner" ? (
                                  <span className="p-input-icon-right ">
                                    <i className="pi pi-lock mt-0" />
                                    <InputText
                                    value={item.names}
                                      className="mt-3"
                                      
                                      disabled
                                    />
                                  </span>
                                ) : item.names === "Lookup" ? (
                                  <span className="p-input-icon-right ">
                                    <i className="pi pi-euro mt-0" />
                                    <InputText className="mt-3" disabled value={item.names}/>
                                  </span>
                                ) : item.names === "Currency" ? (
                                  <span className="p-input-icon-left">
                                    <i className="pi pi-dollar mt-0" />
                                    <InputText className="mt-3 " disabled value={item.names}/>
                                  </span>
                                ) : item.names === "Percent" ? (
                                  <p>
                                    <InputText value={item.names} disabled/>
                                  </p>
                                ) : item.names === "Untitled Name" ? (
                                  <p>
                                    <InputText value={item.names} disabled/>
                                  </p>
                                ) : item.names === "Created By" ? (
                                  <p>
                                    <InputText value={item.names} disabled/>
                                  </p>
                                ) : item.names === "Secondary Email" ? (
                                  <p>
                                    <InputText disabled value={item.names} />
                                  </p>
                                ) : item.names === "Image Upload" ? (
                                  <p>
                                    <Button
                                      label="+ New Image"
                                      className="bg-blue-100 text-primary"
                                    />
                                  </p>
                                ) : item.names === "Email" ? (
                                  <p>
                                    <InputText placeholder="Enter your email" value={item.names}/>
                                  </p>
                                ) : item.names === "File Upload" ? (
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
                                ) : item.names === "Email Opt Out" ? (
                                  <p>
                                    <Checkbox value={item.names} />
                                  </p>
                                ) : item.names === "Modified By" ? (
                                  <p>
                                    <InputText disabled value={item.names} />
                                  </p>
                                ) : item.names === "Date/Time" ? (
                                  <p>
                                    <Calendar
                                    value={item.names}
                                      showTime
                                      disabled
                                      showSeconds
                                      placeholder="Enter the date"
                                    />
                                  </p>
                                ) : item.names === "Decimal" ? (
                                  <p>
                                    <InputText value={item.names} disabled/>
                                  </p>
                                ) : item.names === "URL" ? (
                                  <p>
                                    <InputText  value={item.names} disabled/>
                                  </p>
                                ) : item.names === "Multi-Line" ? (
                                  <p>
                                    <InputTextarea  value={item.names} disabled/>
                                  </p>
                                ) : item.names === "Date" ? (
                                  <p>
                                    <Calendar value={item.names} placeholder="DD/MM/YY   " />
                                  </p>
                                ) : item.names === "Checkbox" ? (
                                  <div className="grid p-fluid">
                    <div className="col-12">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Checkbox checked={checked1} onChange={(e) => setChecked1(!checked1)} />
                            </span>
                            <InputText placeholder="Username"/>
                        </div>
                    </div></div>
                                ) : item.names === "Phone" ? (
                                  <p>
                                    {" "}
                                    <InputMask
                                      id="phone"
                                      mask="99-99-99-99-99"
                                      disabled
                                      placeholder="(999) 999-9999"
                                    ></InputMask  >
                                  </p>
                                ) : item.names === "Long integer" ? (
                                  <p>
                                    <InputText  value={item.names} disabled/>
                                  </p>
                                ) : item.names === "Number" ? (
                                  <p>
                                    <InputText  value={item.names} disabled/>
                                  </p>
                                ) : item.names === "User" ? (
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
                                    value={item.names}
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
