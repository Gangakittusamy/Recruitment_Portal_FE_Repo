import "./CreateForm.css"
import React, { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import {
  dragAndDropDialogIndexSuperAdmin,
  formcompleted,
  setPickListDropDownData,
  dragAndDropValueSuperAdmin
} from "../../../features/counter/dragAndDrop"
import { ITEMS } from "../../Constant/const"
import Picklist from "../../CommonModules/PickList/PickList"
import {
  NewModuleCreation,
  ModuleNameUpdate,
  ModuleNameGet,
  formNameForPreview
} from "../../../features/Modules/module"
import { object } from "yup"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import SingleLine from "../Dialogs/singleLine"
import { Toast } from "primereact/toast"
import { useNavigate } from "react-router"
import { LoginUserDetails } from "../../../features/Auth/userDetails"
import { Dropdown } from "primereact/dropdown"
import { Checkbox } from "primereact/checkbox"
import { useParams } from "react-router-dom"
import _ from "lodash"

interface formModel {
  name: string
  id: string
}

const DropArea = (props: any) => {
  let { editId } = useParams()
  const [uidv4, setuidv4] = useState<any>()
  const count: any = useSelector((state) => state)
  const [formName, setFormName] = useState<any>([{ name: "", id: "" }])
  const [moduleName, setModuleName] = useState<any>()
  const [array, setArray] = useState<any>([])
  const [sidebar, setSidebar] = useState(false)
  const [date, setDate] = useState<Date | Date[] | undefined>(new Date())
  const [selectedCity1, setSelectedCity1] = useState(null)
  const dispatch = useAppDispatch()
  const toast: any = useRef(null)
  const navigate = useNavigate()
  const [list1, setList1] = useState<any>([])
  const [store, setstore] = useState<any>([])
  const [editArray, setEditArray] = useState<any>()
  const [finaValue, setFinalValue] = useState<any>({})
  const [fieldDeleteDialog, setFieldDeleteDialog] = useState(false)
  const [currentField, setCurrentField] = useState("")
  const user: any = useAppSelector((state) => state)

  useEffect(() => {
    GetModuleName()
  }, [])

  const GetModuleName = async () => {
    let res = await dispatch(LoginUserDetails())
  }

  useEffect(() => {
    setModuleName(props.moduleValue)
  }, [props.moduleValue])

  useEffect(() => {
    if (count.dragAndDrop.newSectionIndex >= formName.length) {
      setFormName([...formName, { name: "", id: "" }])
    }
  }, [count.dragAndDrop.newSectionIndex])

  useEffect(() => {
    if (
      !count.module.rolesGetForms &&
      window.location.pathname !== `/super-admin/edit/${editId}`
    ) {
      setuidv4(count.dragAndDrop.initialStartDragSuperAdmin)
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
      setuidv4(count.dragAndDrop.initialStartDragSuperAdmin)
    }
  }, [count.dragAndDrop.initialStartDragSuperAdmin])

  const add = async () => {
    let index: any
    let inputName: any[] = []
    Object.keys(count.dragAndDrop.initialStartDragSuperAdmin || {}).map(
      (x: any) => {
        index = x
      }
    )

    if (index != null) {
      ;[count.dragAndDrop.initialStartDragSuperAdmin].map((x: any) => {
        inputName = x[index]
      })
    }

    inputName = inputName.map((x: any, idx: any) => {
      if (x.id === count.dragAndDrop.pickListDragableId) {
        return { ...x, picklist: count.dragAndDrop.PickListData }
      }
      return x
    })
  }

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
      inputIdValue: inputId
    }

    dispatch(formcompleted({ action: newList }))
    // let index: any;
    let index: string = list
    let inputName: any[] = []
    let val1 = Object.keys(uidv4)
    let val2 = val1.indexOf(list)
    if (index != null) {
      ;[uidv4].map((x: any) => {
        inputName = x[index]
      })
    }
    inputName = inputName.map((x: any, idx: any) => {
      if (idx === i) {
        return { ...x, names: e.target.value }
      }
      return x
    })

    let value = Object.assign({}, uidv4)
    let omiter = _.omit(value, list)
    const obj = { [index]: inputName }
    let keyValues = Object.entries(omiter)
    keyValues.splice(val2, 0, [list, inputName])
    let newObj = Object.fromEntries(keyValues)

    setuidv4(newObj)
  }

  const onCityChange = (e: any) => {
    setSelectedCity1(e.value)
  }

  const openDialog = (item: any, list: any) => {
    let value = ITEMS[count.dragAndDrop.DialogIndex]
    if (value) {
      if (value.names === "Pick List") {
        const pickListDropdownData = count.dragAndDrop.PickListData
        const existingItem = pickListDropdownData.find((p: any) => {
          return p.itemId == item.id
        })
        if (!existingItem) {
          return (
            <Picklist
              pickListDialogVisible={true}
              formID={list}
              itemId={item.id}
            />
          )
        }
      } else if (value.names === "Single Line") {
        return <SingleLine SingleLineDialogVisible={true} />
      }
    }
  }

  const saveForm = async () => {
    const value = Object.assign({}, uidv4)

    if (formName[0].id !== "") {
      formName.map((f: formModel, i: number) => {
        value[f.name] = value[f.id]
        delete value[f.id]
      })
    }

    let response: any = { ...value }

    Object.keys(response || {}).map((list: any, i: number) => {
      response[list] = response[list].map((x: any) => {
        if (x.names === "Pick List") {
          const pickListDropdownData = count.dragAndDrop.PickListData.filter(
            (p: any) => {
              return p.itemId === x.id
            }
          )
          return {
            type: x.subName,
            fieldname: pickListDropdownData[0].fieldLabel,
            options: pickListDropdownData
          }
        } else {
          return {
            type: x.names,
            fieldname: x.subName,
            defaultvalue: x.names
          }
        }
      })
    })

    let payload: any = {
      modulename: moduleName,
      recuriter: count?.userValue?.roles?.id,
      moduleelements: response
    }

    if (
      isValidModuleName(payload.modulename) &&
      isAllFormsValid(payload.moduleelements)
    ) {
      let res
      if (window.location.pathname === `/super-admin/edit/${editId}`) {
        let val = {
          payload: payload,
          editId: editId
        }

        res = await dispatch(ModuleNameUpdate(val))
        if (res.payload.status == 200) {
          dispatch(ModuleNameGet())
        }
      } else {
        res = await dispatch(NewModuleCreation(payload))
        if (res.payload.status == 200) {
          dispatch(ModuleNameGet())
        }
      }
      if (res.payload.status == 200) {
        navigate("/super-admin")
      }
    } else if (
      isValidModuleName(payload.modulename) &&
      !isAllFormsValid(payload.moduleelements)
    ) {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Form is empty",
        life: 3000
      })
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please enter the module name. Duplicate name not allowed",
        life: 3000
      })
    }
  }

  const isValidModuleName = (module: any) => {
    let moduleValid = true
    if (window.location.pathname !== `/super-admin/edit/${editId}`) {
      const existingModules = user.module.modules
      if (existingModules) {
        const isExistingModuleName = existingModules.find((m: any) => {
          return m.modulename === module
        })
        if (!module || isExistingModuleName) {
          moduleValid = false
        }
      }
    }
    return moduleValid
  }

  const isAllFormsValid = (forms: any) => {
    let allFormsValid = true
    for (const key in forms) {
      if (forms[key].length === 0) {
        allFormsValid = false
      }
    }
    return allFormsValid
  }

  useEffect(() => {
    if (count.module.rolesGetForms) {
      let val: any = Object.keys(
        count.module.rolesGetForms[0]?.moduleelements || []
      )
      let val1: any = []
      val.map((x: any, i: any) => {
        val1.push({ name: x, id: "" })
      })

      setFormName(val1)
      setModuleName(count.module.rolesGetForms[0]?.modulename)
    }

    if (
      count.dragAndDrop.EditIdDragAndDrop !== null &&
      count.module.rolesGetForms !== null &&
      formName.length > 1
    ) {
      let value: any = count.dragAndDrop.EditIdDragAndDrop

      const upd_obj = formName.map((obj: any, i: number) => {
        if (obj.id == "") {
          return { name: obj.name, id: value[i] }
        }
        return obj
      })

      setFormName(upd_obj)
    }
  }, [count.module.rolesGetForms])

  useEffect(() => {
    setList1(count.dragAndDrop.PickListData)
    store.push(count.dragAndDrop.PickListData)
    add()
    const val = store.map((list: any) => {
      return list
    })
    setstore(val)
  }, [count.dragAndDrop.PickListData])

  let handleChangeForm = (i: number, e: any, list: any) => {
    let newFormValues = _.cloneDeep(formName)
    newFormValues[i].name = e.target.value
    newFormValues[i].id = list
    setFormName(newFormValues)
  }

  const getFieldName = (item: any) => {
    const pickListDropdownData = count.dragAndDrop.PickListData
    const options = pickListDropdownData.find((d: any) => {
      return d.itemId == item.id
    })
    return options ? options.fieldLabel : ""
  }

  const getDropDownValue = (item: any) => {
    const pickListDropdownData = count.dragAndDrop.PickListData
    const options = pickListDropdownData.filter((d: any) => {
      return d.itemId == item.id
    })
    return options
  }

  const picklistNameHandler = (e: any, item: any) => {
    const pickListDropdownData = count.dragAndDrop.PickListData
    const modifiedPickListArray = pickListDropdownData.map((d: any) => {
      if (d.itemId == item.id) {
        return {
          fieldLabel: e.target.value,
          formID: d.formID,
          id: d.id,
          itemId: d.itemId,
          type: d.type,
          value: d.value
        }
      } else {
        return d
      }
    })
    dispatch(setPickListDropDownData(modifiedPickListArray))
  }

  const showSection = (item: any) => {
    if (item.subName !== "Pick List" && item.subName !== "Checkbox") {
      return true
    } else {
      return false
    }
  }

  const removeField = (itemId: any) => {
    const currentFormElements = count.dragAndDrop.initialStartDragSuperAdmin
    let modifiedModule: any = {}
    for (const key in currentFormElements) {
      const currentFormId = key
      let currentFields = currentFormElements[currentFormId]
      const modifiedForm = currentFields.filter((f: any) => {
        return f.id !== itemId
      })
      modifiedModule[key] = modifiedForm
    }
    dispatch(dragAndDropValueSuperAdmin(modifiedModule))
    setCurrentField("")
  }

  return (
    <div className="">
      <Toast ref={toast} />
      <div className="ml-8 pl-2"></div>

      <div className="FormDiv1">
        {Object.keys(uidv4 || {}).map((list: any, i: number) => {
          return (
            <div key={list}>
              <Droppable key={list} droppableId={list}>
                {(provided, snapshot) => (
                  <div className="border-dotted border-400 mt-4 ml-3 mr-3">
                    <section className="mt-2 p-2  mx-auto">
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
                                      color: "#333333"
                                    }}
                                    value={x.name}
                                    onChange={(e) =>
                                      handleChangeForm(i, e, list)
                                    }
                                    onBlur={() => {
                                      dispatch(formNameForPreview(formName))
                                    }}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            )
                          })
                        : ""}
                    </section>
                    <div className="dragCard" ref={provided.innerRef}>
                      {
                        uidv4[list].length ? (
                          uidv4[list].map((item: any, index: number) => (
                            <div key={item.id} className="p-2">
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
                                      {item.subName === "Pick List" ? (
                                        <>
                                          <div className="flex">
                                            <InputText
                                              value={getFieldName(item)}
                                              style={{
                                                width: "100px"
                                              }}
                                              className="border-0"
                                              onChange={(e) =>
                                                picklistNameHandler(e, item)
                                              }
                                            />
                                            <Dropdown
                                              options={getDropDownValue(item)}
                                              optionLabel="value"
                                              placeholder="Select"
                                              style={{
                                                position: "relative",
                                                left: "80px",
                                                height: "34px",
                                                top: "3px"
                                              }}
                                            />
                                          </div>
                                        </>
                                      ) : item.subName === "Checkbox" ? (
                                        <div className="flex">
                                          <input
                                            type="text"
                                            name="names "
                                            style={{
                                              height: "44px",
                                              border: "1px solid lightgrey"
                                            }}
                                            value={item.names || item.type}
                                            onChange={(e) => {
                                              handleChange(
                                                e,
                                                index,
                                                list,
                                                item.subName || item.fieldname,
                                                item.id
                                              )
                                            }}
                                            className=" text-500  border-0 "
                                          />
                                          <Checkbox
                                            style={{
                                              position: "relative",
                                              left: "28px",
                                              height: "44px",
                                              top: "10px",
                                              border: "1px solid lightgrey",
                                              color: "#8083A3"
                                            }}
                                            className="border-0"
                                          ></Checkbox>
                                        </div>
                                      ) : (
                                        <input
                                          type="text"
                                          name="names "
                                          style={{
                                            height: "44px",
                                            border: "1px solid lightgrey"
                                            // color: "#8083A3",
                                          }}
                                          value={item.names || item.type}
                                          onChange={(e) => {
                                            handleChange(
                                              e,
                                              index,
                                              list,
                                              item.subName || item.fieldname,
                                              item.id
                                            )
                                          }}
                                          className=" text-500  border-0 "
                                        />
                                      )}

                                      {showSection(item) && (
                                        <section
                                          className="grey font-semibold  "
                                          style={{
                                            width: "150px",
                                            padding: "4px"
                                          }}
                                        >
                                          {item.subName || item.fieldname}
                                        </section>
                                      )}

                                      <div className="field-options">
                                        <button
                                          onClick={() => {
                                            setFieldDeleteDialog(
                                              (prevState) => !prevState
                                            )
                                            setCurrentField(item.id)
                                          }}
                                          onBlur={() => {
                                            setFieldDeleteDialog(false)
                                          }}
                                        >
                                          <i className="pi pi-ellipsis-v"></i>
                                        </button>
                                        {currentField === item.id ? (
                                          <div
                                            id="field-dialog"
                                            className={`options-modal ${
                                              fieldDeleteDialog
                                                ? "show"
                                                : "hidden"
                                            }`}
                                          >
                                            <ul>
                                              <li
                                                onClick={() =>
                                                  removeField(item.id)
                                                }
                                              >
                                                Remove
                                              </li>
                                            </ul>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>

                              {count.dragAndDrop.DialogIndex == 5 &&
                              item.subName == "Pick List"
                                ? openDialog(item, list)
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
          )
        })}
      </div>

      <div className="flex  justify-content-end mt-2 mb-3 mr-5">
        <Button
          label="Cancel"
          className="surface-300 border-300 text-color mr-5"
          onClick={() => navigate(-1)}
        />
        <Button
          label="Save"
          className="bg-primary"
          onClick={() => {
            saveForm()
          }}
        />
      </div>
    </div>
  )
}

export default React.memo(DropArea)
