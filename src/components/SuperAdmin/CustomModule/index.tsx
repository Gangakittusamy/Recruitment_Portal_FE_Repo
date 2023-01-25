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
import { useAppDispatch } from "../../../app/hooks";
import { useLocation } from "react-router-dom";
import {
  NewModuleCreation,
  ModuleNameGetFormsaa,
  ModuleNameUpdate,
} from "../../../features/Modules/module";
import { useNavigate } from "react-router-dom";
import { leadGenerationTable } from "../../../features/Modules/leadGeneration";
import { LoginUserDetails } from "../../../features/Auth/userDetails";
import { leadGenerationTableGet } from "../../../features/Modules/leadGeneration";

const CustomModule = (props: any) => {
  const [state, setState] = React.useState<any>([]);
  const count: any = useSelector((state) => state);
  const dispatch = useAppDispatch();
  const [previewData, setPreviewData] = useState<any>();

  const [checked1, setChecked1] = useState(false);
  const location = useLocation();
  const { from } = location.state;
  const { form } = location.state;
  const { name } = location.state;
  const { id } = location.state;
  const { recId } = location.state;
  const { moduleElements } = location.state;
  const navigate = useNavigate();
  const [ids, setIds] = useState<any>();

  function handleChange(evt: any) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const saveForm = async () => {
    // let payload: object = {
    //   payload: {
    //     _id: id,
    //     modulename: name,
    //     moduleElements: moduleElements,
    //     recuriter: form,
    //     tableData: {
    //       tableData: [{ data: state }],
    //     },
    //   },
    //   editId: id,
    // };

    let payload = {
      recuriter: ids,
      moduleId: recId,
      tableData: {
        tableData: [state],
      },
    };

    // let res = await dispatch(leadGenerationTable(val));

    const res = await dispatch(leadGenerationTable(payload));

    if (res.payload.status == "Form-tableData created successfully") {
      navigate(-1);
      await dispatch(leadGenerationTableGet(id));
    }
  };

  useEffect(() => {
    apple();
  }, []);

  async function apple() {
    let value = await dispatch(LoginUserDetails());
    setIds(value.payload.user.id);
  }

  return (
    <div>
      <div>
        <div className="border-black-alpha-30 border-1 pb-7">
          <span className="contactName ">Create Untitled</span>
          <span className="contactuntitle">Untitled Image</span>
          <span className="ml-5">
            <img
              src={noImages}
              style={{ width: " 56px", height: "50px" }}
            ></img>
          </span>
          <span className="contactuntitle">Untitled Information </span>
          <div>
            <div>
              <div className="previewCardAligment">
                {from?.map((item: any, index: number) => {
                  return (
                    <div key={index}>
                      <div className="card border-0 mt-3 ml-7">
                        <div className="names">
                          <p className="grey">{item.value}</p>
                          {item.DataHeader === "Untitled Owner" ? (
                            <span className="p-input-icon-right ">
                              <i className="pi pi-lock mt-0" />
                              <InputText
                                name={item.DataHeader}
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
                                name={item.DataHeader}
                                value={state.Currency}
                                onChange={handleChange}
                              />
                            </span>
                          ) : item.DataHeader === "Percent" ? (
                            <p>
                              <InputText
                                name={item.DataHeader}
                                value={state.Percent}
                                onChange={handleChange}
                                placeholder="Percent"
                              />
                            </p>
                          ) : item.DataHeader === "Single Line" ? (
                            <p>
                              <InputText
                                name={item.DataHeader}
                                value={state.SingleLine}
                                onChange={handleChange}
                              />
                            </p>
                          ) : item.DataHeader === "Untitled Name" ? (
                            <p>
                              <InputText
                                name={item.DataHeader}
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
                                name={item.DataHeader}
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
                                name={item.DataHeader}
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
                                name={item.DataHeader}
                                value={state.Decimal}
                                onChange={handleChange}
                              />
                            </p>
                          ) : item.DataHeader === "Long integer" ? (
                            <p>
                              <InputText
                                name={item.DataHeader}
                                value={state.LongInteger}
                                onChange={handleChange}
                              />
                            </p>
                          ) : item.DataHeader === "URL" ? (
                            <p>
                              <InputText
                                name={item.DataHeader}
                                value={state.URL}
                                onChange={handleChange}
                              />
                            </p>
                          ) : item.DataHeader === "Multi-Line" ? (
                            <p>
                              <InputTextarea
                                name={item.DataHeader}
                                value={state.Multi}
                                onChange={handleChange}
                              />
                            </p>
                          ) : item.DataHeader === "Date" ? (
                            <p>
                              <Calendar
                                name={item.DataHeader}
                                value={item.Date}
                                onChange={handleChange}
                                placeholder="DD/MM/YY   "
                              />
                            </p>
                          ) : item.DataHeader === "Pick List" ? (
                            <p>Pick List</p>
                          ) : item.DataHeader === "Checkbox" ? (
                            <div className="grid p-fluid">
                              <div className="col-12">
                                <div className="p-inputgroup">
                                  <span className="p-inputgroup-addon">
                                    <Checkbox
                                      checked={checked1}
                                      onChange={(e) => setChecked1(!checked1)}
                                    />
                                  </span>
                                  <InputText placeholder="Username" />
                                </div>
                              </div>
                            </div>
                          ) : item.DataHeader === "Phone" ? (
                            <p>
                              {" "}
                              <InputMask
                                id="phone"
                                mask="99-99-99-99-99"
                                name={item.DataHeader}
                                value={state.lastName}
                                onChange={handleChange}
                                placeholder="(999) 999-9999"
                              ></InputMask>
                            </p>
                          ) : item.DataHeader === "Number" ? (
                            <p>
                              <InputText
                                name={item.DataHeader}
                                value={item.Number}
                                onChange={handleChange}
                                placeholder="Number"
                              />
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  );
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
                    saveForm();
                  }}
                />
              </div>
              {/* );
                 })} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomModule);
