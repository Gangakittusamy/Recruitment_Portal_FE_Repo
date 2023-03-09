import Edit from "../../../assets/edit.png"
import Add from "../../../assets/add.png"
import Actions from "../../../assets/actions.png"
import { Sidebar } from "primereact/sidebar"
import React, { useState, useEffect, useRef } from "react"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { InputTextarea } from "primereact/inputtextarea"
import { InputMask } from "primereact/inputmask"
import { Button } from "primereact/button"
import { Checkbox } from "primereact/checkbox"
import { InputNumber } from "primereact/inputnumber"
import noImages from "../../../images//noimage.jpg"
import { useSelector, useDispatch } from "react-redux"
import { useAppDispatch } from "../../../app/hooks"
import { useLocation } from "react-router-dom"
import {
  NewModuleCreation,
  ModuleNameGetFormsaa,
  ModuleNameUpdate,
  isValueAlreadyExist
} from "../../../features/Modules/module"
import { useNavigate } from "react-router-dom"
import { LoginUserDetails } from "../../../features/Auth/userDetails"
import {
  leadGenerationTable,
  leadGenerationTableGet,
  leadGenerationTableUpdate
} from "../../../features/Modules/leadGeneration"
import "./customModule.css"
import { Toast } from "primereact/toast"
import _ from "lodash"
import NavBar from "../navBar"
import { useParams } from "react-router-dom"
import { OverlayPanel } from "primereact/overlaypanel"
import { confirmDialog } from "primereact/confirmdialog"
import SubForm from "./subForm"

const CustomModule = (props: any) => {
  const [state, setState] = React.useState<any>([])
  const count: any = useSelector((state) => state)
  const dispatch = useAppDispatch()

  const [checked1, setChecked1] = useState(false)
  const location = useLocation()
  const { forms, id, recId, module, rowData } = location.state
  const navigate = useNavigate()
  const [ids, setIds] = useState<any>()
  const toast: any = useRef(null)
  const [singleColumnForms, setSingleColumnForms] = useState<string[]>([])
  const { editId } = useParams()
  const formImage = useRef<OverlayPanel>(null)
  const [image, setImage] = useState<any>("")
  const [formImg, setFormImg] = useState<any>("")
  const [formImgChanged, setFormImgChanged] = useState<any>(false)

  useEffect(() => {
    setSingleColumnForms(count.dragAndDrop.singleColumnForms)
  }, [count.dragAndDrop.singleColumnForms])

  function handleChange(evt: any) {
    let value = ""
    if (evt.target.type === "checkbox") {
      value = evt.target.checked
    } else {
      value = evt.target.value
    }
    setState({
      ...state,
      [evt.target.name]: value
    })
  }

  const saveForm = async () => {
    const formValues = _.cloneDeep(state)
    let isDuplicateValueExist = false
    for (const key in formValues) {
      if (formValues[key] === "Duplicate value") {
        isDuplicateValueExist = true
      }
    }
    if (!isDuplicateValueExist) {
      let requiredElements: any = []
      for (const key in forms) {
        const currentFormId = key
        const requiredFields = forms[currentFormId]
          .filter((f: any) => f.required && f.required === true)
          .map((f: any) => (f.type === "Pick List" ? f.DataHeader : f.value))
        requiredElements = requiredElements.concat(requiredFields)
      }
      const submittedElements = Object.keys(state)
      const isFormValid = requiredElements.every((ai: any) =>
        submittedElements.includes(ai)
      )
      if (isFormValid) {
        let payload = new FormData()
        const tableData: any = {
          tableData: [state]
        }
        payload.append("recuriter", ids)
        payload.append("moduleId", recId)
        payload.append("tableData", JSON.stringify(tableData))
        payload.append("formImage", formImg)
        if (!editId) {
          const res = await dispatch(leadGenerationTable(payload))
          if (res.payload.status == "Form-tableData created successfully") {
            navigate(-1)
            await dispatch(leadGenerationTableGet(id))
          }
        } else {
          const data = {
            payload,
            id: editId
          }
          const res = await dispatch(leadGenerationTableUpdate(data))
          if (
            res.payload.status ==
            "Form-tableData and Form-Image data updated successfully"
          ) {
            navigate(-1)
            await dispatch(leadGenerationTableGet(id))
          }
        }
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Warning",
          detail: "Please fill the required fields",
          life: 3000
        })
      }
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Form contains duplicate values",
        life: 3000
      })
    }
  }

  useEffect(() => {
    apple()
    if (editId) {
      setState(rowData)
      setFormImg(rowData.formImage)
    }
  }, [])

  async function apple() {
    let value = await dispatch(LoginUserDetails())
    setIds(value.payload.user.id)
  }

  const verifyUniqueField = async (e: any, field: any, unique: any) => {
    if (unique) {
      let data: any = { editId: recId }
      data.payload = {}
      data.payload[field] = e.target.value
      const res = await dispatch(isValueAlreadyExist(data))
      if (res.payload.status === true) {
        setState({
          ...state,
          [e.target.name]: "Duplicate value"
        })
        e.target.value = "Duplicate value"
      }
    }
  }

  const formImageHandler = (event: any) => {
    const selectedFile = event.target.files[0]
    setImage(selectedFile)
  }

  const ChangeFormImage = (e: any) => {
    e.preventDefault()
    setFormImg(image)
    setFormImgChanged(true)
    formImage.current?.hide()
  }

  const getFormImageUrl = (formImg: any) => {
    let img = formImg
    if (formImgChanged) {
      img = URL.createObjectURL(formImg)
    }
    return img
  }

  const goToEditPage = () => {
    navigate(`/super-admin/edit/${localStorage.getItem("moduleId")}`)
  }

  return (
    <div>
      <NavBar />
      <Toast ref={toast} />
      <div>
        <div className="border-black-alpha-30 border-1 pb-7">
          <span className="contactName ">{`Create ${module}`}</span>
          <div className="module-profile" style={{ position: "relative" }}>
            <div className="flex">
              <span className="contactuntitle mb-4">{`${module} image`}</span>
              <span onClick={goToEditPage} className="contactEditPage mb-3">Edit Page Layout</span>
            </div>
            {formImg && (
              <div
                className="img-delete"
                onClick={(e: any) => {
                  confirmDialog({
                    message: "Do you want to remove this image?",
                    header: "Confirmation",
                    icon: "pi pi-info-circle",
                    accept: () => {
                      setFormImg("")
                    }
                  })
                }}
              >
                <i className="pi pi-times"></i>
              </div>
            )}
            <span
              className="ml-5"
              style={{ cursor: "pointer" }}
              onClick={(e) => formImage.current?.toggle(e)}
            >
              <img
                id="formHeadImage"
                src={formImg ? getFormImageUrl(formImg) : noImages}
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              ></img>
            </span>
          </div>
          <OverlayPanel
            ref={formImage}
            showCloseIcon
            id="overlay_panel"
            style={{ width: "350px" }}
            className="overlaypanel-demo"
          >
            <div>
              <form>
                <InputText type="file" onChange={formImageHandler} />
                <div
                  className="flex justify-content-end"
                  style={{ gap: "17px" }}
                >
                  <Button
                    className="mt-2"
                    onClick={(e) => {
                      e.preventDefault()
                      setImage("")
                      formImage.current?.hide()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="mt-2 "
                    onClick={ChangeFormImage}
                  >
                    Change
                  </Button>
                </div>
              </form>
            </div>
          </OverlayPanel>
          <div>
            <div>
              <div className="createForm">
                {Object.keys(forms).map((formName: any, index: any) => {
                  return (
                    <div key={index} className="indv-form">
                      <h4 className="formName">{formName}</h4>
                      <div
                        className={`indv-form-elem ${singleColumnForms.includes(formName)
                          ? "single-col"
                          : ""
                          }`}
                      >
                        {forms[formName].map((item: any, index: number) => {
                          return (
                            <div
                              key={index}
                              className="card border-0 form-item"
                            >
                              {item.type === "Pick List" ? (
                                <div className="names">
                                  <p
                                    className={`grey ${item.required && item.required === true
                                      ? "required"
                                      : ""
                                      }`}
                                  >
                                    {item.DataHeader}
                                  </p>
                                  <Dropdown
                                    options={item.options}
                                    optionLabel="value"
                                    placeholder="Select"
                                    name={item.DataHeader}
                                    value={state[item.DataHeader]}
                                    onChange={handleChange}
                                    style={{
                                      position: "relative",
                                      height: "30px",
                                      color: "#8083A3"
                                    }}
                                    className="border-0"
                                  />
                                </div>
                              ) : (
                                <div className="names">
                                  <p
                                    className={`grey ${item.required && item.required === true
                                      ? "required"
                                      : ""
                                      }`}
                                  >
                                    {item.value}
                                  </p>
                                  {item.DataHeader === "Untitled Owner" ? (
                                    <span className="p-input-icon-right ">
                                      <i className="pi pi-lock mt-0" />
                                      <InputText
                                        placeholder={
                                          item.unique ? "Unique Field" : ""
                                        }
                                        name={item.value}
                                        value={state[item.value]}
                                        onChange={handleChange}
                                        className="mt-3"
                                        onBlur={(e) => {
                                          verifyUniqueField(
                                            e,
                                            item.value,
                                            item.unique
                                          )
                                        }}
                                      />
                                    </span>
                                  ) : item.DataHeader === "Currency" ? (
                                    <p className="field-container">
                                      <span className="p-input-icon-left">
                                        <i
                                          className="pi pi-dollar mt-0"
                                          style={{ top: "8px" }}
                                        />
                                        <InputText
                                          name={item.value}
                                          value={state[item.value]}
                                          onChange={handleChange}
                                        />
                                      </span>
                                    </p>
                                  ) : item.DataHeader === "Percent" ? (
                                    <p className="field-container">
                                      <InputText
                                        name={item.value}
                                        value={state[item.value]}
                                        onChange={handleChange}
                                        placeholder="Percent"
                                      />
                                    </p>
                                  ) : item.DataHeader === "Single Line" ? (
                                    <p className="field-container">
                                      <InputText
                                        placeholder={
                                          item.unique ? "Unique Field" : ""
                                        }
                                        name={item.value}
                                        value={state[item.value]}
                                        onChange={handleChange}
                                        onBlur={(e) => {
                                          verifyUniqueField(
                                            e,
                                            item.value,
                                            item.unique
                                          )
                                        }}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Untitled Name" ? (
                                    <p className="field-container">
                                      <InputText
                                        placeholder={
                                          item.unique ? "Unique Field" : ""
                                        }
                                        name={item.value}
                                        value={state[item.value]}
                                        onChange={handleChange}
                                        onBlur={(e) => {
                                          verifyUniqueField(
                                            e,
                                            item.value,
                                            item.unique
                                          )
                                        }}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Image Upload" ? (
                                    <p className="field-container">
                                      <Button
                                        label="+ Image Upload"
                                        className="bg-blue-100 text-primary"
                                      />
                                    </p>
                                  ) : item.DataHeader === "Email" ? (
                                    <p className="field-container">
                                      <InputText
                                        placeholder={
                                          item.unique ? "Unique Field" : ""
                                        }
                                        name={item.value}
                                        value={state[item.value]}
                                        onChange={handleChange}
                                        onBlur={(e) => {
                                          verifyUniqueField(
                                            e,
                                            item.value,
                                            item.unique
                                          )
                                        }}
                                      />
                                    </p>
                                  ) : item.DataHeader === "File Upload" ? (
                                    <p className="field-container">
                                      <Button
                                        label="+ File Upload"
                                        className="bg-blue-100 text-primary"
                                      />
                                    </p>
                                  ) : item.DataHeader === "Date/Time" ? (
                                    <p className="field-container">
                                      <Calendar
                                        name={item.value}
                                        value={state[item.value]}
                                        showTime
                                        showSeconds
                                        placeholder="Enter the date"
                                        onChange={handleChange}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Decimal" ? (
                                    <p className="field-container">
                                      <InputText
                                        name={item.value}
                                        value={state[item.value]}
                                        onChange={handleChange}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Long integer" ? (
                                    <p className="field-container">
                                      <InputText
                                        name={item.value}
                                        value={state[item.value]}
                                        onChange={handleChange}
                                      />
                                    </p>
                                  ) : item.DataHeader === "URL" ? (
                                    <p className="field-container">
                                      <InputText
                                        placeholder={
                                          item.unique ? "Unique Field" : ""
                                        }
                                        type="url"
                                        name={item.value}
                                        value={state[item.value]}
                                        onChange={handleChange}
                                        onBlur={(e) => {
                                          verifyUniqueField(
                                            e,
                                            item.value,
                                            item.unique
                                          )
                                        }}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Multi-Line" ? (
                                    <p className="field-container">
                                      <InputTextarea
                                        name={item.value}
                                        value={state[item.value]}
                                        onChange={handleChange}
                                        style={{ width: "190px" }}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Date" ? (
                                    <p className="field-container">
                                      <Calendar
                                        name={item.value}
                                        value={state[item.value]}
                                        onChange={handleChange}
                                        placeholder="DD/MM/YY   "
                                      />
                                    </p>
                                  ) : item.DataHeader === "Checkbox" ||
                                    item.DataHeader === "Email Opt Out" ? (
                                    <div>
                                      <Checkbox
                                        name={item.value}
                                        style={{
                                          position: "relative",
                                          right: "228px",
                                          height: "44px",
                                          top: "15px",
                                          width: "-webkit-fill-available"
                                        }}
                                        onChange={handleChange}
                                        checked={state[item.value]}
                                      />
                                    </div>
                                  ) : item.DataHeader === "Phone" ? (
                                    <p className="field-container">
                                      {" "}
                                      <InputNumber
                                        placeholder={
                                          item.unique ? "Unique Field" : ""
                                        }
                                        id="phone"
                                        name={item.value}
                                        value={state[item.value]}
                                        onChange={(e) =>
                                          handleChange(e.originalEvent)
                                        }
                                        onBlur={(e) => {
                                          verifyUniqueField(
                                            e,
                                            item.value,
                                            item.unique
                                          )
                                        }}
                                        useGrouping={false}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Number" ? (
                                    <p className="field-container">
                                      <InputText
                                        name={item.value}
                                        value={state[item.value]}
                                        onChange={handleChange}
                                      />
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="indv-form-elem">
                {
                 (localStorage.getItem('moduleName') === 'Invoices' || localStorage.getItem('moduleName') === 'Sales Orders' || localStorage.getItem('moduleName') === 'Purchase Orders' || localStorage.getItem('moduleName') === 'Quotes') && 
                 < SubForm />
                }
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CustomModule)
