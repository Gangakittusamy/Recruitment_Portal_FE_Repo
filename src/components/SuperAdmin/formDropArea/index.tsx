import { dragAndDropValueSuperAdmin } from "../../../features/counter/dragAndDrop";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import noImages from "../../../images/noimage.jpg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./FormDropArea.css";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { InputMask } from "primereact/inputmask";
import React from "react";

const FormDropArea = (props: any) => {
  const [uidv4, setuidv4] = useState<any>();
  const count: any = useSelector((state) => state);
  const [sidebar, setSidebar] = useState(false);
  const [selectedCity1, setSelectedCity1] = useState(null);

  useEffect(() => {
    setuidv4(count.dragAndDrop.initialStartDragSuperAdmin);
  }, [count.dragAndDrop.initialStartDragSuperAdmin]);

  const handleChange = (e: any, i: number) => {
    let index: any;
    let inputName: any[] = [];
    Object.keys(uidv4 || {}).map((x: any) => {
      index = x;
    });
    if (index != null) {
      [uidv4].map((x: any) => {
        inputName = x[index];
      });
    }
    inputName = inputName.map((x: any, idx: any) => {
      if (idx === i) {
        return { ...x, names: e.target.value };
      }
      return x;
    });

    setuidv4({ [index]: inputName });
  };
  function handlerClick() {
    // {
    //   Object.keys(previewData || []).map((list: any, i: number) => {
    //     previewData[list]?.map((item: any, index: number) => {
    //       {
    //         item.names === "Multi-Select"
    //           ? setSidebar(false)
    //           : setSidebar(true);
    //       }
    //     });
    //   });
    // }
    setSidebar(!sidebar);
  }
  const onCityChange = (e: any) => {
    setSelectedCity1(e.value);
  };
  const fileUpload = [
    { name: "Upload File", code: "NY" },
    { name: "document", code: "NY" },
  ];
  const cities = [{ name: "Admistrator", code: "NY" }];
  return (
    <div className="mx-auto">
      <div className="flex justify-content-between ">
        <h3>Form Creation</h3>
        <div className="flex align-items-center">
          <i className="pi pi-pencil" style={{ fontSize: "1em" }}></i>
          <p className="ml-1">Edit</p>
        </div>
      </div>
      <div className="FormDiv">
        {Object.keys(uidv4 || {}).map((list: any, i: number) => {
          return (
            <Droppable key={list} droppableId={list}>
              {(provided, snapshot) => (
                <div className="FormDropArea" ref={provided.innerRef}>
                  {uidv4[list].length
                    ? uidv4[list].map((item: any, index: number) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="FormDropAreaMain px-2"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={provided.draggableProps.style}
                            >
                              <div
                                className="FormDropAreaCard"
                                {...provided.dragHandleProps}
                              >
                                <input
                                  type="text"
                                  name="names"
                                  value={item.names}
                                  onChange={(e) => {
                                    handleChange(e, index);
                                  }}
                                  className="h-2rem my-auto border-none text-yellow-800"
                                />
                                <section className="grey py-2">
                                  {item.subName}
                                </section>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    : !provided.placeholder && (
                        <span className="Appp ">Drop items here</span>
                      )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>

      <div className="mt-7 flex text-left justify-content-end">
        <Button label="Cancel" className="p-button-secondary" />
        <Button label="Save" className="p-button-secondary ml-2" />
        <Button
          label="Preview"
          className="p-button-secondary ml-2"
          onClick={handlerClick}
        ></Button>
      </div>
      <Sidebar
        visible={sidebar}
        position="top"
        style={{ width: "92vw", height: "50vw" }}
        onHide={() => setSidebar(!sidebar)}
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
              {/* <Footer cards={cards} /> */}
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
                {Object.keys(uidv4 || []).map((list: any, i: number) => {
                  return (
                    <div key={i} className="previewCardAligment">
                      {uidv4[list]?.map((item: any, index: number) => {
                        return (
                          <div key={index}>
                            <div className="card border-0 mt-3 ml-7">
                              <div className="names">
                                <p className="grey">{item.subName}</p>
                                {item.names === "Untitled Owner" ? (
                                  <span className="p-input-icon-right ">
                                    <i className="pi pi-lock mt-0" />
                                    <InputText
                                      className="mt-3"
                                      value={"john"}
                                      disabled
                                    />
                                  </span>
                                ) : item.names === "Lookup" ? (
                                  <span className="p-input-icon-right ">
                                    <i className="pi pi-euro mt-0" />
                                    <InputText className="mt-3" disabled />
                                  </span>
                                ) : item.names === "Currency" ? (
                                  <span className="p-input-icon-left">
                                    <i className="pi pi-dollar mt-0" />
                                    <InputText className="mt-3 " />
                                  </span>
                                ) : item.names === "Percent" ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === "Untitled Name" ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === "Created By" ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === "Secondary Email" ? (
                                  <p>
                                    <InputText disabled />
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
                                    <InputText placeholder="Enter your email" />
                                  </p>
                                ) : item.names === "File Upload" ? (
                                  <p>
                                    <Dropdown
                                      className="mr-6"
                                      value={selectedCity1}
                                      options={fileUpload}
                                      onChange={onCityChange}
                                      optionLabel="name"
                                      style={{ width: "99%" }}
                                      placeholder="Select a file"
                                    />
                                  </p>
                                ) : item.names === "Email Opt Out" ? (
                                  <p>
                                    <Checkbox />
                                  </p>
                                ) : item.names === "Modified By" ? (
                                  <p>
                                    <InputText disabled />
                                  </p>
                                ) : item.names === "Date/Time" ? (
                                  <p>
                                    <Calendar
                                      showTime
                                      showSeconds
                                      placeholder="Enter the date"
                                    />
                                  </p>
                                ) : item.names === "Decimal" ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === "URL" ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === "Multi-Line" ? (
                                  <p>
                                    <InputTextarea />
                                  </p>
                                ) : item.names === "Date" ? (
                                  <p>
                                    <Calendar placeholder="DD/MM/YY   " />
                                  </p>
                                ) : item.names === "Checkbox" ? (
                                  <span className="p-input-icon-right ">
                                    <Checkbox
                                      style={{
                                        position: "relative",
                                        left: "30px",
                                        bottom: "4px",
                                      }}
                                    />
                                    <InputText className="mt-3" />
                                  </span>
                                ) : item.names === "Phone" ? (
                                  <p>
                                    {" "}
                                    <InputMask
                                      id="phone"
                                      mask="99-99-99-99-99"
                                      placeholder="(999) 999-9999"
                                    ></InputMask>
                                  </p>
                                ) : item.names === "Long integer" ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === "Number" ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === "User" ? (
                                  <span className="p-input-icon-right ">
                                    <Dropdown
                                      className="mr-6"
                                      value={selectedCity1}
                                      options={cities}
                                      onChange={onCityChange}
                                      optionLabel="name"
                                      style={{ width: "99%" }}
                                      placeholder="Select a City"
                                    />
                                  </span>
                                ) : (
                                  <input
                                    type="text"
                                    name="names"
                                    value={item.names}
                                    onChange={(e) => {}}
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

export default React.memo(FormDropArea);
