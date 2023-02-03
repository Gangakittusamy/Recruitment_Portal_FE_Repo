import "./CreateForm.css";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import {
  dragAndDropDialogIndexSuperAdmin,
  formcompleted,
} from "../../../features/counter/dragAndDrop";
import { ITEMS } from "../../Constant/const";
import Picklist from "../../CommonModules/PickList/PickList";
import {
  NewModuleCreation,
  ModuleNameUpdate,
} from "../../../features/Modules/module";
import { object } from "yup";
import { useAppDispatch } from "../../../app/hooks";
import SingleLine from "../Dialogs/singleLine";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router";
import { LoginUserDetails } from "../../../features/Auth/userDetails";
import { Dropdown } from "primereact/dropdown";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { ModuleNameGet } from "../../../features/Modules/module";

interface formModel {
  name: string;
  id: string;
}

const DropArea = (props: any) => {
 
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
  let { editId } = useParams();
  const [uidv4, setuidv4] = useState<any>();
  const count: any = useSelector((state) => state);
  const [formName, setFormName] = useState<any>([{ name: "", id: "" }]);
  const [moduleName, setModuleName] = useState<any>();
  const [array, setArray] = useState<any>([]);
  const [sidebar, setSidebar] = useState(false);
  const [date, setDate] = useState<Date | Date[] | undefined>(new Date());
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [pickList, setPickList] = useState<any>();
  const dispatch = useAppDispatch();
  const toast: any = useRef(null);
  const navigate = useNavigate();
  const [list1, setList1] = useState<any>([]);
  const [store, setstore] = useState<any>([]);
  const [editArray, setEditArray] = useState<any>();
  const [finaValue, setFinalValue] = useState<any>({});

  useEffect(() => {
    setModuleName(props.moduleValue);
  }, [props.moduleValue]);

  useEffect(() => {
    if (count.dragAndDrop.newSectionIndex >= formName.length) {
      setFormName([...formName, { name: "", id: "" }]);
    }
  }, [count.dragAndDrop.newSectionIndex]);

  useEffect(() => {
    if (
      !count.module.rolesGetForms &&
      window.location.pathname !== `/super-admin/edit/${editId}`
    ) {
      setuidv4(count.dragAndDrop.initialStartDragSuperAdmin);
    }

    if (window.location.pathname == `/super-admin/edit/${editId}`) {
      // let totalValue = count.module.rolesGetForms[0].moduleelements;
      // let keyValue;
      // for (let key in totalValue) {
      //   keyValue = totalValue[key];
      //   setEditArray(totalValue[key]);
      // }
      // let arrayValue = [];
      // let arrayVal = [];
      // for (let val in keyValue) {
      //   arrayValue.push(keyValue[val]);
      //   arrayVal.push(val);
      // }

      setuidv4(count.dragAndDrop.initialStartDragSuperAdmin);
    }
  }, [count.dragAndDrop.initialStartDragSuperAdmin]);

  const add = async () => {
    let index: any;
    let inputName: any[] = [];
    Object.keys(count.dragAndDrop.initialStartDragSuperAdmin || {}).map(
      (x: any) => {
        index = x;
      }
    );

    if (index != null) {
      [count.dragAndDrop.initialStartDragSuperAdmin].map((x: any) => {
        inputName = x[index];
      });
    }

    inputName = inputName.map((x: any, idx: any) => {
      if (x.id === count.dragAndDrop.pickListDragableId) {
        return { ...x, picklist: count.dragAndDrop.PickListData };
      }
      return x;
    });
  };

  useEffect(() => {
    GetModuleName();
  }, []);

  const GetModuleName = async () => {
    let res = await dispatch(LoginUserDetails());
  };

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

  const openDialog = (index:number) => {
    let value = ITEMS[count.dragAndDrop.DialogIndex];

    if (value) {
      if (value.names === "Pick List") {
        return <Picklist pickListDialogVisible={true} indexid={index}/>;
      } else if (value.names === "Single Line") {
        return <SingleLine SingleLineDialogVisible={true} />;
      }
    }
  };

  const saveForm = async () => {
    let val: object = {};

    const value = Object.assign({}, uidv4);

    if (formName[0].id !== "") {
      formName.map((f: formModel, i: number) => {
        value[f.name] = value[f.id];
        delete value[f.id];
      });
    }
    

    let response: any = { ...value };

    // Object.defineProperties(response, { ...value, writable: true });

    Object.keys(response || {}).map((list: any, i: number) => {
      response[list] = response[list].map((x: any) => {
        return {
          type: x.names,
          fieldname: x.subName,
          defaultvalue: x.names,
        };
      });
    });

    // response[list].map((x: any, idx: number) => {
    //   response[list][idx] = {
    //     type: x.names,
    //     fieldname: x.subName,
    //     defaultvalue: x.names,
    //   };
    // });

    // resp[list] = {
    //   [x.subName]: {
    //     type: x.names,
    //     fieldname: x.names,
    //     defaultvalue: x.names,
    //   },
    // };

    let payload: object = {
      modulename: moduleName,
      recuriter: count?.userValue?.roles?.id,
      moduleelements: response,
    };

    let res;
    if (window.location.pathname === `/super-admin/edit/${editId}`) {
      let val = {
        payload: payload,
        editId: editId,
      };

      res = await dispatch(ModuleNameUpdate(val));
      if (res.payload.status == 200) {
        dispatch(ModuleNameGet());
      }
    } else {
      res = await dispatch(NewModuleCreation(payload));
      if (res.payload.status == 200) {
        dispatch(ModuleNameGet());
      }
    }

    if (res.payload.status == 200) {
      navigate("/super-admin");
    }
  };
  useEffect(() => {
    setList1(count.dragAndDrop.PickListData);
    console.log(
      count.dragAndDrop.PickListData,
      'count.dragAndDrop.PickListData'
    );
    // store.push(count.dragAndDrop.PickListData);
    add();
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
    if (count.module.rolesGetForms) {
      let val: any = Object.keys(
        count.module.rolesGetForms[0]?.moduleelements || []
      );
      let val1: any = [];
      val.map((x: any, i: any) => {
        val1.push({ name: x, id: "" });
      });

      setFormName(val1);
      setModuleName(count.module.rolesGetForms[0]?.modulename);
    }

    if (
      count.dragAndDrop.EditIdDragAndDrop !== null &&
      count.module.rolesGetForms !== null &&
      formName.length > 1
    ) {
      let value: any = count.dragAndDrop.EditIdDragAndDrop;

      const upd_obj = formName.map((obj: any, i: number) => {
        if (obj.id == "") {
          return { name: obj.name, id: value[i] };
        }
        return obj;
      });

      setFormName(upd_obj);
    }
  }, [count.module.rolesGetForms]);

  // useEffect(() => {
  //   setList1(count.dragAndDrop.PickListData);
  //   store.push(count.dragAndDrop.PickListData);
  //   add();
  //   const val = store.map((list: any) => {
  //     return list;
  //   });
  //   setstore(val);
  // }, [count.dragAndDrop.PickListData]);

  let handleChangeForm = (i: number, e: any, list: any) => {
    let newFormValues = [...formName];
    newFormValues[i].name = e.target.value;
    newFormValues[i].id = list;

    setFormName(newFormValues);
  };

  return (
    <div className="">
      <Toast ref={toast} />
      <div className="ml-8 pl-2"></div>

      <div className="FormDiv1">
        {Object.keys(uidv4 || {}).map((list: any, i: number) => {
          return (
            <div>
              <Droppable key={list} droppableId={list}>
                {(provided, snapshot) => (
                  <div className="border-dotted border-400 mt-4 ml-3 mr-3">
                    <section className="mt-2 p-2  mx-auto">
                      {/* <section className="mt-2 p-2 ml-8   "> */}
                      {formName.length
                        ? formName.map((x: any, idx: number) => {
                            return (
                              <div key={idx} className="ml-3">
                                {i == idx ? (
                                  <input
                                    placeholder="Untitled form"
                                    className="  mx-auto  text-sm w-25rem  text-900 "
                                    style={{
                                      height: "48px",
                                      color: "#333333",
                                    }}
                                    value={x.name}
                                    onChange={(e) =>
                                      handleChangeForm(i, e, list)
                                    }
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            );
                          })
                        : ""}

                      {/* </section> */}
                    </section>
                    <div className="dragCard" ref={provided.innerRef}>
                      {
                        uidv4[list].length ? (
                          uidv4[list].map((item: any, index: number) => (
                            <div
                              //  className=" border-dashed border-2 w-30rem ml-8 mt-1"
                              className="p-2"
                            >
                              {/* <section className="ml-8 pl-2 mt-2">
                              <input
                                placeholder="Untiled form"
                                className=" w-30rem my-auto  text-sm  text-900"
                                style={{
                                  height: "52px",
                                  color: "#333333",
                                }}
                                value={formName.name}
                                onChange={(e) => handleChangeForm(i, e)}
                              />
                            </section> */}

                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    className="Dropcard px-2"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    style={provided.draggableProps.style}
                                    {...provided.dragHandleProps}
                                  >
                                     <div className="names flex justify-content-between align-items-center">
                                      {item.subName === 'Pick List' ? (
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
                                      ) : (
                                        <input
                                          type="text"
                                          name="names "
                                          style={{
                                            height: '44px',
                                            border: '1px solid lightgrey',
                                            // color: "#8083A3",
                                          }}
                                          value={item.names || item.type}
                                          onChange={(e) => {
                                            handleChange( e,
                                              index,
                                              list,"pick list","list");
                                          }}
                                          className=" text-500  border-0 "
                                        />
                                      )}
                                      <section
                                        className="grey font-semibold  "
                                        style={{
                                          // border: "1px solid gray",
                                          width: '150px',
                                          padding: '4px',
                                        }}
                                      >
                                        {item.subName == 'Pick List'
                                          ? ''
                                          : item.subName || item.fieldname}
                                        {/* {item.subName || item.fieldname} */}
                                      </section>

                                      <p className="delete">
                                        <i className="pi pi-ellipsis-v"></i>
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </Draggable>

                              {count.dragAndDrop.DialogIndex == 5 &&
                              item.subName == "Pick List"
                                ? openDialog(index)
                                : item.subName == "Single Line"
                                ? openDialog(index)
                                : ""}
                            </div>
                          ))
                        ) : (
                          // !provided.placeholder && (
                          <div
                            className=" mx-auto pt-4 p-2 surface-300 border-round-sm h-6rem  flex justify-content-center  mt-2 mb-2"
                            style={{ width: "199%" }}
                          >
                            <p className="">
                              + Drop items here{provided.placeholder}
                            </p>
                          </div>
                        )
                        // )
                      }
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>

      <div className="flex  justify-content-end mt-2 mb-3 mr-5">
        <Button
          label="Cancel"
          className="surface-300 border-300 text-color mr-5"
        />
        <Button
          label="Save"
          className="bg-primary"
          onClick={() => {
            saveForm();
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(DropArea);
