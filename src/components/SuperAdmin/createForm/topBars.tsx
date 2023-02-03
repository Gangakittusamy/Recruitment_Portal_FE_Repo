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
import { formcompleted } from "../../../features/counter/dragAndDrop";
import _ from "lodash";

const TopBars = (props: any) => {
  const [store1, setstore1] = useState<any>([]);
  const [store2, setstore2] = useState<any>([]);
  const [store3, setstore3] = useState<any>([]);
  const [store4, setstore4] = useState<any>([]);
  const [store5, setstore5] = useState<any>([]);
  const [store6, setstore6] = useState<any>([]);
  const [store7, setstore7] = useState<any>([]);
  const [store8, setstore8] = useState<any>([]);
  const [store9, setstore9] = useState<any>([]);
  const [store10, setstore10] = useState<any>([]);
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  const [value7, setValue7] = useState('');
  const [value8, setValue8] = useState('');
  const [value9, setValue9] = useState('');
  const [value10, setValue10] = useState('');
  const [pickList1, setPickList1] = useState<any>();
  const [pickList2, setPickList2] = useState<any>();
  const [pickList3, setPickList3] = useState<any>();
  const [pickList4, setPickList4] = useState<any>();
  const [pickList5, setPickList5] = useState<any>();
  const [pickList6, setPickList6] = useState<any>();
  const [pickList7, setPickList7] = useState<any>();
  const [pickList8, setPickList8] = useState<any>();
  const [pickList9, setPickList9] = useState<any>();
  const [pickList10, setPickList10] = useState<any>();
  const [pickList, setPickList] = useState<any>();
  const [uidv4, setuidv4] = useState<any>();
  const [list1, setList1] = useState<any>([]);
   const [store, setstore] = useState<any>([]);
  const count: any = useSelector((state) => state);
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [preview, setPreview] = useState(false);
  const [previewData, setPreviewData] = useState<any>();
  const [checked1, setChecked1] = useState(false);
  const handleChange = (
    e: any,
    i: number,
    list: any,
    type: string,
    inputId: any
  ) => {
    const newList = {
      id: list,

      subName: type,
      names: e.target.value,
      inputIdValue: inputId,
    };

    dispatch(formcompleted({ action: newList }));
    // let index: any;
    let index: string = list;
    let inputName: any[] = [];
    let val1 = Object.keys(uidv4);
    let val2 = val1.indexOf(list);
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

    let value = Object.assign({}, uidv4);
    let omiter = _.omit(value, list);
    const obj = { [index]: inputName };
    let keyValues = Object.entries(omiter);
    keyValues.splice(val2, 0, [list, inputName]);
    let newObj = Object.fromEntries(keyValues);

    setuidv4(newObj);
  };
  const onCityChange = (e: any) => {
    setSelectedCity1(e.value);
  };
  const cities = [{ name: "Admistrator", code: "NY" }];
 useEffect(() => {
    setList1(count.dragAndDrop.PickListData);
    console.log(
      count.dragAndDrop.PickListData,
      'count.dragAndDrop.PickListData'
    );
    // store.push(count.dragAndDrop.PickListData);
    
    (count.dragAndDrop.PickListData || []).map((id: any, index: any) => {
      
      if (id) {
        if (index == 0) {
          const val = count.dragAndDrop.PickListData[0].map((list: any) => {
            setValue(list.name);
            return list;
          });
          setstore(val);
        }
        else if (index == 1) {
          const val = count.dragAndDrop.PickListData[1].map((list: any) => {
            setValue1(list.name);
            return list;
          });
          setstore1(val);
        }
        else if (index == 2) {
          const val = count.dragAndDrop.PickListData[2].map((list: any) => {
            setValue2(list.name);
            return list;
          });
          setstore2(val);
        }
        else if (index == 3) {
          const val = count.dragAndDrop.PickListData[3].map((list: any) => {
            setValue3(list.name);
            return list;
          });
          setstore3(val);
        }
        else if (index == 4) {
          const val = count.dragAndDrop.PickListData[4].map((list: any) => {
            setValue4(list.name);
            return list;
          });
          setstore4(val);
        }
        else if (index == 5) {
          const val = count.dragAndDrop.PickListData[5].map((list: any) => {
            setValue5(list.name);
            return list;
          });
          setstore5(val);
        }
        else if (index == 6) {
          const val = count.dragAndDrop.PickListData[6].map((list: any) => {
            setValue6(list.name);
            return list;
          });
          setstore6(val);
        }
        else if (index == 7) {
          const val = count.dragAndDrop.PickListData[7].map((list: any) => {
            setValue7(list.name);
            return list;
          });
          setstore7(val);
        }
        else if (index == 8) {
          const val = count.dragAndDrop.PickListData[8].map((list: any) => {
            setValue8(list.name);
            return list;
          });
          setstore8(val);
        }
        else if (index == 9) {
          const val = count.dragAndDrop.PickListData[9].map((list: any) => {
            setValue9(list.name);
            return list;
          });
          setstore9(val);
        }
        else if (index == 10) {
          const val = count.dragAndDrop.PickListData[10].map((list: any) => {
            setValue10(list.name);
            return list;
          });
          setstore10(val);
        }
      } else {
        setList1(count.dragAndDrop.PickListData);
      }
    });
  }, [count.dragAndDrop.PickListData]);
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
                                {item.names === "Pick List"?
                                 <>
                                 {index == 0 ? (
                                   <div>
                                     <div className="flex">
                                       <InputText
                                         value={value}
                                         style={{
                                           width: '100px',
                                         }}
                                         className="border-0"
                                         onChange={(e) =>
                                           setValue1(e.target.value)
                                         }
                                       />
                                       <Dropdown
                                         value={pickList}
                                         options={store}
                                         onChange={(e) => {
                                           handleChange(
                                             e,
                                             index,
                                             list,"pick list","list"
                                           );
                                           setPickList(e.value);
                                         }}
                                         optionLabel="value"
                                         placeholder="Pick List"
                                         style={{
                                           position: 'relative',
                                           left: '28px',
                                           height: '44px',
                                           border:
                                             '1px solid lightgrey',
                                           color: '#8083A3',
                                         }}
                                         className="border-0"
                                       />
                                     </div>
                                   </div>
                                 ) : index == 1 ? (
                                   <div className="flex">
                                     <InputText
                                       value={value1}
                                       style={{
                                         width: '100px',
                                       }}
                                       className="border-0"
                                       onChange={(e) =>
                                         setValue1(e.target.value)
                                       }
                                     />
                                     <Dropdown
                                       value={pickList1}
                                       options={store1}
                                       onChange={(e) => {
                                         handleChange( e,
                                           index,
                                           list,"pick list","list");
                                         setPickList1(e.value);
                                       }}
                                       optionLabel="value"
                                       placeholder="Pick List"
                                       style={{
                                         height: '44px',
                                         border: '1px solid lightgrey',
                                         color: '#8083A3',
                                       }}
                                       className="  ml-4 border-0"
                                     />
                                   </div>
                                 ) : index == 2 ? (
                                   <div className="flex">
                                     <InputText
                                       value={value2}
                                       style={{
                                         width: '100px',
                                       }}
                                       className="border-0"
                                       onChange={(e) =>
                                         setValue1(e.target.value)
                                       }
                                     />
                                     <Dropdown
                                       value={pickList2}
                                       options={store2}
                                       onChange={(e) => {
                                         handleChange( e,
                                           index,
                                           list,"pick list","list");
                                         setPickList2(e.value);
                                       }}
                                       optionLabel="value"
                                       placeholder="Pick List"
                                       style={{
                                         position: 'relative',
                                         left: '28px',
                                         height: '44px',
                                         border: '1px solid lightgrey',
                                         color: '#8083A3',
                                       }}
                                       className="border-0"
                                     />
                                   </div>
                                 ) : index == 3 ? (
                                   <div>
                                     <div className="flex">
                                       <InputText
                                         value={value3}
                                         style={{
                                           width: '100px',
                                         }}
                                         className="border-0"
                                         onChange={(e) =>
                                           setValue1(e.target.value)
                                         }
                                       />
                                       <Dropdown
                                         value={pickList3}
                                         options={store3}
                                         onChange={(e) => {
                                           handleChange(
                                             e,
                                             index,
                                             list,"pick list","list"
                                           );
                                           setPickList3(e.value);
                                         }}
                                         optionLabel="value"
                                         placeholder="Pick List"
                                         style={{
                                           position: 'relative',
                                           left: '28px',
                                           height: '44px',
                                           border:
                                             '1px solid lightgrey',
                                           color: '#8083A3',
                                         }}
                                         className="border-0"
                                       />
                                     </div>
                                   </div>
                                 ) : index == 4 ? (
                                   <div>
                                     <div className="flex">
                                       <InputText
                                         value={value4}
                                         style={{
                                           width: '100px',
                                         }}
                                         className="border-0"
                                         onChange={(e) =>
                                           setValue1(e.target.value)
                                         }
                                       />
                                       <Dropdown
                                         value={pickList4}
                                         options={store4}
                                         onChange={(e) => {
                                           handleChange(
                                             e,
                                             index,
                                             list,"pick list","list"
                                           );
                                           setPickList4(e.value);
                                         }}
                                         optionLabel="value"
                                         placeholder="Pick List"
                                         style={{
                                           position: 'relative',
                                           left: '28px',
                                           height: '44px',
                                           border:
                                             '1px solid lightgrey',
                                           color: '#8083A3',
                                         }}
                                         className="border-0"
                                       />
                                     </div>
                                   </div>
                                 ) : index == 5 ? (
                                   <div>
                                     <div className="flex">
                                       <InputText
                                         value={value5}
                                         style={{
                                           width: '100px',
                                         }}
                                         className="border-0"
                                         onChange={(e) =>
                                           setValue1(e.target.value)
                                         }
                                       />
                                       <Dropdown
                                         value={pickList5}
                                         options={store5}
                                         onChange={(e) => {
                                           handleChange(
                                             e,
                                             index,
                                             list,"pick list","list"
                                           );
                                           setPickList5(e.value);
                                         }}
                                         optionLabel="value"
                                         placeholder="Pick List"
                                         style={{
                                           position: 'relative',
                                           left: '28px',
                                           height: '44px',
                                           border:
                                             '1px solid lightgrey',
                                           color: '#8083A3',
                                         }}
                                         className="border-0"
                                       />
                                     </div>
                                   </div>
                                 ) : index==6?
                                 <div className="flex">
                                       <InputText
                                         value={value6}
                                         style={{
                                           width: '100px',
                                         }}
                                         className="border-0"
                                         onChange={(e) =>
                                           setValue1(e.target.value)
                                         }
                                       />
                                       <Dropdown
                                         value={pickList6}
                                         options={store6}
                                         onChange={(e) => {
                                           handleChange(
                                             e,
                                             index,
                                             list,"pick list","list"
                                           );
                                           setPickList6(e.value);
                                         }}
                                         optionLabel="value"
                                         placeholder="Pick List"
                                         style={{
                                           position: 'relative',
                                           left: '28px',
                                           height: '44px',
                                           border:
                                             '1px solid lightgrey',
                                           color: '#8083A3',
                                         }}
                                         className="border-0"
                                       />
                                     </div>
                                   :index == 7?<div className="flex">
                                   <InputText
                                     value={value7}
                                     style={{
                                       width: '100px',
                                     }}
                                     className="border-0"
                                     onChange={(e) =>
                                       setValue1(e.target.value)
                                     }
                                   />
                                   <Dropdown
                                     value={pickList7}
                                     options={store7}
                                     onChange={(e) => {
                                       handleChange(
                                         e,
                                         index,
                                         list,"pick list","list"
                                       );
                                       setPickList7(e.value);
                                     }}
                                     optionLabel="value"
                                     placeholder="Pick List"
                                     style={{
                                       position: 'relative',
                                       left: '28px',
                                       height: '44px',
                                       border:
                                         '1px solid lightgrey',
                                       color: '#8083A3',
                                     }}
                                     className="border-0"
                                   />
                                 </div>:index==8?<div className="flex">
                                       <InputText
                                         value={value8}
                                         style={{
                                           width: '100px',
                                         }}
                                         className="border-0"
                                         onChange={(e) =>
                                           setValue1(e.target.value)
                                         }
                                       />
                                       <Dropdown
                                         value={pickList8}
                                         options={store8}
                                         onChange={(e) => {
                                           handleChange(
                                             e,
                                             index,
                                             list,"pick list","list"
                                           );
                                           setPickList8(e.value);
                                         }}
                                         optionLabel="value"
                                         placeholder="Pick List"
                                         style={{
                                           position: 'relative',
                                           left: '28px',
                                           height: '44px',
                                           border:
                                             '1px solid lightgrey',
                                           color: '#8083A3',
                                         }}
                                         className="border-0"
                                       />
                                     </div>:index==9?<div className="flex">
                                       <InputText
                                         value={value9}
                                         style={{
                                           width: '100px',
                                         }}
                                         className="border-0"
                                         onChange={(e) =>
                                           setValue1(e.target.value)
                                         }
                                       />
                                       <Dropdown
                                         value={pickList9}
                                         options={store9}
                                         onChange={(e) => {
                                           handleChange(
                                             e,
                                             index,
                                             list,"pick list","list"
                                           );
                                           setPickList9(e.value);
                                         }}
                                         optionLabel="value"
                                         placeholder="Pick List"
                                         style={{
                                           position: 'relative',
                                           left: '28px',
                                           height: '44px',
                                           border:
                                             '1px solid lightgrey',
                                           color: '#8083A3',
                                         }}
                                         className="border-0"
                                       />
                                     </div>:index==10?<div className="flex">
                                       <InputText
                                         value={value10}
                                         style={{
                                           width: '100px',
                                         }}
                                         className="border-0"
                                         onChange={(e) =>
                                           setValue1(e.target.value)
                                         }
                                       />
                                       <Dropdown
                                         value={pickList10}
                                         options={store10}
                                         onChange={(e) => {
                                           handleChange(
                                             e,
                                             index,
                                             list,"pick list","list"
                                           );
                                           setPickList10(e.value);
                                         }}
                                         optionLabel="value"
                                         placeholder="Pick List"
                                         style={{
                                           position: 'relative',
                                           left: '28px',
                                           height: '44px',
                                           border:
                                             '1px solid lightgrey',
                                           color: '#8083A3',
                                         }}
                                         className="border-0"
                                       />
                                     </div>:""
                                 }
                               </>
                                :<InputText
                                type="text"
                                name="names"
                                value={item.names || item.type}
                                onChange={(e) => {}}
                                disabled
                                className="h-2rem my-auto"
                              />}
                                {/* {item.names ||
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
                                )} */}
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
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

