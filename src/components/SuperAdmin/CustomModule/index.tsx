import Edit from "../../../assets/edit.png"
import Add from "../../../assets/add.png"
import Actions from "../../../assets/actions.png"
import { Sidebar } from "primereact/sidebar"
import React, { useState, useEffect } from "react"
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
  ModuleNameUpdate
} from "../../../features/Modules/module"
import { useNavigate } from "react-router-dom"
import { leadGenerationTable } from "../../../features/Modules/leadGeneration"
import { LoginUserDetails } from "../../../features/Auth/userDetails"
import { leadGenerationTableGet } from "../../../features/Modules/leadGeneration"
import "./customModule.css"

const CustomModule = (props: any) => {
  const [state, setState] = React.useState<any>([])
  const count: any = useSelector((state) => state)
  const dispatch = useAppDispatch()

  const [checked1, setChecked1] = useState(false)
  const location = useLocation()
  const { forms, id, recId, module } = location.state
  const navigate = useNavigate()
  const [ids, setIds] = useState<any>()

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
    let payload = {
      recuriter: ids,
      moduleId: recId,
      tableData: {
        tableData: [state]
      }
    }

    const res = await dispatch(leadGenerationTable(payload))

    if (res.payload.status == "Form-tableData created successfully") {
      navigate(-1)
      await dispatch(leadGenerationTableGet(id))
    }
  }

  useEffect(() => {
    apple()
  }, [])

  async function apple() {
    let value = await dispatch(LoginUserDetails())
    setIds(value.payload.user.id)
  }

  return (
    <div>
      <div>
        <div className="border-black-alpha-30 border-1 pb-7">
          <span className="contactName ">{`Create ${module}`}</span>
          <div className="module-profile">
            <span className="contactuntitle">{`${module} image`}</span>
            <span className="ml-5">
              <img
                src={noImages}
                style={{ width: " 56px", height: "50px" }}
              ></img>
            </span>
          </div>
          {/* <span className="contactuntitle">Untitled Information </span> */}
          <div>
            <div>
              <div className="createForm">
                {Object.keys(forms).map((formName: any, index: any) => {
                  return (
                    <div key={index} className="indv-form">
                      <h4 className="formName">{formName}</h4>
                      <div className="indv-form-elem">
                        {forms[formName].map((item: any, index: number) => {
                          return (
                            <div
                              key={index}
                              className="card border-0 form-item"
                            >
                              {item.type === "Pick List" ? (
                                <div className="names">
                                  <p className="grey">{item.DataHeader}</p>
                                  <Dropdown
                                    options={item.options}
                                    optionLabel="value"
                                    placeholder="Select"
                                    name={item.DataHeader}
                                    value={state[item.DataHeader]}
                                    onChange={handleChange}
                                    style={{
                                      position: "relative",
                                      left: "28px",
                                      height: "34px",
                                      top: "10px",
                                      border: "1px solid lightgrey",
                                      color: "#8083A3",
                                      width: "-webkit-fill-available"
                                    }}
                                    className="border-0"
                                  />
                                </div>
                              ) : (
                                <div className="names">
                                  <p className="grey">{item.value}</p>
                                  {item.DataHeader === "Untitled Owner" ? (
                                    <span className="p-input-icon-right ">
                                      <i className="pi pi-lock mt-0" />
                                      <InputText
                                        name={item.value}
                                        value={state.Owner}
                                        onChange={handleChange}
                                        className="mt-3"
                                      />
                                    </span>
                                  ) : item.DataHeader === "Currency" ? (
                                    <span className="p-input-icon-left">
                                      <i className="pi pi-dollar mt-0" />
                                      <InputText
                                        className="mt-3 "
                                        name={item.value}
                                        value={state.Currency}
                                        onChange={handleChange}
                                        style={{width:"190px"}}
                                      />
                                    </span>
                                  ) : item.DataHeader === "Percent" ? (
                                    <p>
                                      <InputText
                                        name={item.value}
                                        value={state.Percent}
                                        onChange={handleChange}
                                        placeholder="Percent"
                                      />
                                    </p>
                                  ) : item.DataHeader === "Single Line" ? (
                                    <p>
                                      <InputText
                                        name={item.value}
                                        value={state.SingleLine}
                                        onChange={handleChange}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Untitled Name" ? (
                                    <p>
                                      <InputText
                                        name={item.value}
                                        value={state.Name}
                                        onChange={handleChange}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Image Upload" ? (
                                    <p>
                                      <Button
                                        label="+ Image Upload"
                                        className="bg-blue-100 text-primary"
                                      />
                                    </p>
                                  ) : item.DataHeader === "Email" ? (
                                    <p>
                                      <InputText
                                        name={item.value}
                                        value={state.Email}
                                        onChange={handleChange}
                                      />
                                    </p>
                                  ) : item.DataHeader === "File Upload" ? (
                                    <p>
                                      <Button
                                        label="+ File Upload"
                                        className="bg-blue-100 text-primary"
                                      />
                                    </p>
                                  ) : item.DataHeader === "Date/Time" ? (
                                    <p>
                                      <Calendar
                                        name={item.value}
                                        value={state.DateTime}
                                        showTime
                                        showSeconds
                                        placeholder="Enter the date"
                                        onChange={handleChange}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Decimal" ? (
                                    <p>
                                      <InputText
                                        name={item.value}
                                        value={state.Decimal}
                                        onChange={handleChange}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Long integer" ? (
                                    <p>
                                      <InputText
                                        name={item.value}
                                        value={state.LongInteger}
                                        onChange={handleChange}
                                      />
                                    </p>
                                  ) : item.DataHeader === "URL" ? (
                                    <p>
                                      <InputText
                                        type="url"
                                        name={item.value}
                                        value={state.URL}
                                        onChange={handleChange}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Multi-Line" ? (
                                    <p>
                                      <InputTextarea
                                        name={item.value}
                                        value={state.Multi}
                                        onChange={handleChange}
                                        style={{width:"190px"}}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Date" ? (
                                    <p>
                                      <Calendar
                                        name={item.value}
                                        value={item.Date}
                                        onChange={handleChange}
                                        placeholder="DD/MM/YY   "
                                      />
                                    </p>
                                  ) : item.DataHeader === "Checkbox" ? (
                                    <div>
                                      <Checkbox
                                        name={item.value}
                                        style={{
                                          position: "relative",
                                          right: "120px",
                                          height: "44px",
                                          top: "15px",
                                          width: "-webkit-fill-available"
                                        }}
                                        onChange={handleChange}
                                        checked={state[item.value]}
                                      />
                                    </div>
                                  ) : item.DataHeader === "Phone" ? (
                                    <p>
                                      {" "}
                                      <InputNumber
                                        id="phone"
                                        name={item.value}
                                        value={state.lastName}
                                        onChange={(e)=>handleChange(e.originalEvent)}
                                        placeholder="(+91) 999-9999-999"
                                        useGrouping={false}
                                      />
                                    </p>
                                  ) : item.DataHeader === "Number" ? (
                                    <p>
                                      <InputText
                                        name={item.value}
                                        value={item.Number}
                                        onChange={handleChange}
                                        placeholder="Number"
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
