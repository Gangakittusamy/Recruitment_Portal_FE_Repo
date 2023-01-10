import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState, useEffect, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { ColorPicker } from "primereact/colorpicker";
import { InputTextarea } from "primereact/inputtextarea";

import "./PickList.css";

interface PickListProps {
  pickListDialogVisible: boolean;
}

const Picklist: React.FC<PickListProps> = ({ pickListDialogVisible }) => {
  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];
  const [checked, setChecked] = useState(false);
  const [colorchecked, setcolorchecked] = useState(false);
  const [state, setState] = useState(false);
  const [OptionOne, setOptionOne] = useState(false);
  const [OptionTwo, setOptionTwo] = useState(false);
  const [OptionThree, setOptionThree] = useState(false);
  const [picklist, setpicklist] = useState<any>();
  const [Months, setMonths] = useState(false);
  const [order, setOrder] = useState("");
  const [checkAlpha, setCheckAlpha] = useState(false);
  const [checkRequire, setCheckRequire] = useState("");
  const [checkToolTip, setCheckToolTip] = useState("");
  const [arr, setArr] = useState(inputArr);
  const [selectedCity1, setSelectedCity1] = useState<any>([
    { name: "Normal", code: "NY" },
  ]);
  const [Multiselect, setMultiselect] = useState<any>([]);
  const [color2, setColor2] = useState("");
  const op: any = useRef(null);
  const Days = [
    {
      names: "Monday",

      id: 1,
    },
    {
      names: "Tuesday",

      id: 2,
    },
    {
      names: "Wednesday",

      id: 3,
    },
    {
      names: "Thursday",

      id: 4,
    },
    {
      names: "Friday",

      id: 5,
    },
    {
      names: "Friday",

      id: 6,
    },
    {
      names: "Saturday",

      id: 7,
    },
  ];
  const Month = [
    {
      names: "january",

      id: 1,
    },
    {
      names: "feburary",

      id: 2,
    },
    {
      names: "March",

      id: 3,
    },
    {
      names: "April",

      id: 4,
    },
    {
      names: "May",

      id: 5,
    },
    {
      names: "June",

      id: 6,
    },
    {
      names: "July",

      id: 7,
    },
    {
      names: "Augest",

      id: 8,
    },
    {
      names: "September",

      id: 9,
    },
    {
      names: "October",

      id: 10,
    },
    {
      names: "November",

      id: 11,
    },
    {
      names: "December",

      id: 12,
    },
  ];
  const Continent = [
    {
      names: "Asia ",

      id: 1,
    },
    {
      names: "North America",

      id: 2,
    },
    {
      names: "South America",

      id: 3,
    },
    {
      names: "Africa",

      id: 4,
    },
    {
      names: "Antartica",

      id: 5,
    },
    {
      names: "Australia",

      id: 6,
    },
    {
      names: "Eroup",

      id: 7,
    },
  ];
  useEffect(() => {
    setState(pickListDialogVisible);
  }, [pickListDialogVisible]);

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
  ];
  function ClickPickList(name: any) {
    if (name == "days") {
      setpicklist(Days);
    } else if (name == "month") {
      setpicklist(Month);
    } else if (name == "Continents") {
      setpicklist(Continent);
    }
  }

  // function ClickMonths (){
  //   setDays(false)
  //   setMonths(!Months)
  // }
  function handlerSiebarOptionOne() {
    setOptionOne(!OptionOne);
  }
  function handlerSiebarOptionTwo() {
    setOptionTwo(!OptionTwo);
  }
  function handlerSiebarOptionThree() {
    setOptionThree(!OptionThree);
  }
  const handlerCheck = (e: any) => {
    setChecked(!checked);
  };
  const handlerCheckcolor = (e: any) => {
    setcolorchecked(!colorchecked);
  };
  var k = 1;
  const handlerCheckclose = (e: any) => {
    setState(false);
  };

  const addInput = () => {
    setArr((s: any) => {
      const lastId = s[s.length - 1].id;
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };
  const deleteinput = (i: any) => {
    const deleteVal = [...arr];
    deleteVal.splice(i, 1);
    setArr(deleteVal);
  };

  const onValueChange = (e: any) => {
    setOrder(e.target.value);
  };

  const defaultValue = (e: { value: any }) => {
    setSelectedCity1(e.value);
  };

  const onCityChange = (e: any) => {
    let selectedCities: any[] = [];
    selectedCities = [...Multiselect];

    if (e.checked) selectedCities.push(e.value);
    else selectedCities.splice(selectedCities.indexOf(e.value), 1);

    setMultiselect(selectedCities);
  };
  const handleChange = (e: any) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  return (
    <div className="flex">
      {checked ? (
        <Dialog
          header="Picklist History Tracking"
          visible={checked}
          style={{ width: "45vw" }}
          position="top"
          onHide={() => setChecked(!checked)}
        >
          <div>
            <header>
              <span>Related List Name</span>
              <InputText
                type="text"
                className=" mb-2 w-12 mt-1 border-noround"
                placeholder="Pick List 1 History"
              />
            </header>

            <div className="mt-4">
              <span className="mt-4">Related List Columns</span>

              <div className="border-1 border-400 p-3 mt-3">
                <div className="inline-flex checkboxPosition">
                  <div className="field-checkbox">
                    <Checkbox
                      inputId="city1"
                      name="city"
                      value="Pick List 1"
                      onChange={onCityChange}
                      checked={Multiselect.indexOf("Pick List 1") !== -1}
                    />
                    <label htmlFor="city1">Pick List 1</label>
                  </div>
                  <div className="field-checkbox ml-145 ">
                    <Checkbox
                      inputId="city2"
                      name="city"
                      value="Modified Time"
                      onChange={onCityChange}
                      checked={Multiselect.indexOf("Modified Time") !== -1}
                    />
                    <label htmlFor="city2">Modified Time</label>
                  </div>
                </div>
                <br />
                <div className="inline-flex checkboxPositionTwo">
                  <div className="field-checkbox">
                    <Checkbox
                      inputId="city3"
                      name="city"
                      value="Duration"
                      onChange={onCityChange}
                      checked={Multiselect.indexOf("Duration") !== -1}
                    />
                    <label htmlFor="city3">Duration</label>
                  </div>
                  <div className="field-checkbox ml-145">
                    <Checkbox
                      inputId="city4"
                      name="city"
                      value="Modified By"
                      onChange={onCityChange}
                      checked={Multiselect.indexOf("Modified By") !== -1}
                    />
                    <label htmlFor="city4">Modified By</label>
                  </div>
                </div>
                <br />
                <div className="inline-flex checkboxPositionThree">
                  <div className="field-checkbox ">
                    <Checkbox
                      inputId="city3"
                      name="city"
                      value="Email"
                      onChange={onCityChange}
                      checked={Multiselect.indexOf("Email") !== -1}
                    />
                    <label htmlFor="city3">Email</label>
                  </div>
                  <div className="field-checkbox ml-145">
                    <Checkbox
                      inputId="city4"
                      name="city"
                      value="Secondary Email"
                      onChange={onCityChange}
                      checked={Multiselect.indexOf("Secondary Email") !== -1}
                    />
                    <label htmlFor="city4">Secondary email</label>
                  </div>
                </div>
                <div className="field-checkbox">
                  <Checkbox
                    inputId="city4"
                    name="city"
                    value="Email Opt Out"
                    onChange={onCityChange}
                    checked={Multiselect.indexOf("Email Opt Out") !== -1}
                  />
                  <label htmlFor="city4">Email Opt Out</label>
                </div>
                <span className="backborder">
                  {" "}
                  <i className="pi pi-info mr-2 mt-1"></i> You cannot select
                  more than 10 new fields
                </span>
              </div>
            </div>
            <div className="pt">
              <div className="footerstyle">
                <span className="p-2 text-primary" onClick={handlerCheckclose}>
                  Don't save this field
                </span>
                <button
                  className="buttonStyle ml-8 mt-1"
                  onClick={handlerCheck}
                >
                  {" "}
                  Cancel{" "}
                </button>
                <Button label="Done" />
              </div>
            </div>
          </div>
        </Dialog>
      ) : (
        <Dialog
          header="Pick List Properties"
          visible={state}
          style={{ width: "50vw" }}
          position="top"
          onHide={() => setState(false)}
        >
          <p>
            Field Label <br />
            <InputText type="text" className="w-7 mt-1" />
          </p>
          <div className="flex justify-content-between ">
            <span>Pick List Option</span>{" "}
            <span onClick={(e) => op.current.toggle(e)}>
              <i className="pi pi-cog cursor-pointer"></i>
            </span>
          </div>
          <OverlayPanel
            ref={op}
            style={{ width: "255px" }}
            className="overlaypanel-demo"
          >
            <div>
              <span className=" options" onClick={handlerSiebarOptionOne}>
                View/add unused values
              </span>
              <hr />
              <span className=" options" onClick={handlerSiebarOptionTwo}>
                Add prefined choices
              </span>
              <br />
              <br />
              <span className="  options " onClick={handlerSiebarOptionThree}>
                Add Bulk choices
              </span>
              <br />
            </div>
          </OverlayPanel>
          <Dialog
            header="Unused Values"
            visible={OptionOne}
            style={{ width: "50vw" }}
            position="top"
            onHide={() => setOptionOne(!OptionOne)}
          >
            <div className="allOptionUse">All options are in use.</div>
          </Dialog>
          <Dialog
            header="Pick List Properties"
            visible={OptionTwo}
            style={{ width: "46.2%" }}
            position="top"
            onHide={() => setOptionTwo(!OptionTwo)}
          >
            <div>
              <span>Import Predefined Choices</span>

              <div className="containerPicklist">
                <div className="leftside">
                  <span
                    className="p-1 ml-3 flex options"
                    onClick={() => ClickPickList("days")}
                  >
                    Days of the week
                  </span>
                  <hr />
                  <span
                    className="p-1 ml-3 flex options"
                    onClick={() => ClickPickList("month")}
                  >
                    Month of the year
                  </span>
                  <hr />
                  <span className="p-1 ml-3 flex options">Time Zones</span>
                  <hr />
                  <span className="p-1 ml-3 flex options">US State</span>
                  <hr />
                  <span
                    className="p-1 ml-3 flex options"
                    onClick={() => ClickPickList("Continents")}
                  >
                    Continents
                  </span>
                  <hr />
                  <span className="p-1 ml-3 flex options">
                    Countries / Regions
                  </span>
                  <hr />
                </div>
                <div className="rightside">
                  {picklist?.map((list: any) => {
                    return (
                      <div>
                        <div className="ml-4 mt-3"> {list.names}</div>
                      </div>
                    );
                  })}
                  {/* {picklist} */}
                </div>
              </div>
              <div className="footerstyle">
                <span className="p-2 text-primary" onClick={handlerCheckclose}>
                  Don't save this field
                </span>
                <button
                  className="buttonStyle ml-8 mt-1"
                  onClick={handlerCheck}
                >
                  {" "}
                  Cancel{" "}
                </button>
                <Button label="Done" />
              </div>
            </div>
          </Dialog>
          <Dialog
            header="Bulk Choice"
            visible={OptionThree}
            style={{ width: "45vw" }}
            position="top"
            onHide={() => setOptionThree(!OptionThree)}
          >
            <div>
              {" "}
              <div className="field col-12 md:col-4">
                <span className="p-float-label">
                  <InputTextarea id="textarea" rows={15} cols={65} autoResize />
                  <label htmlFor="textarea">Textarea</label>
                </span>
              </div>
              <div className="pt">
                <div className="footerstyle">
                  <span
                    className="p-2 text-primary"
                    onClick={handlerCheckclose}
                  >
                    Don't save this field
                  </span>
                  <button
                    className="buttonStyle ml-8 mt-1"
                    onClick={handlerCheck}
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                  <Button label="Done" />
                </div>
              </div>
            </div>
          </Dialog>
          <section className="multipleSelectDialogOption_main mt-2">
            {arr.map((item, i: any) => {
              return (
                <section className="multipleSelectDialogOption">
                  <span>
                    {" "}
                    {colorchecked ? (
                      <ColorPicker
                        value={color2}
                        onChange={(e: any) => setColor2(e.value)}
                      ></ColorPicker>
                    ) : (
                      ""
                    )}
                  </span>
                  <InputText
                    onChange={handleChange}
                    value={item.value}
                    id={i}
                    placeholder={" Options" + " " + k++}
                    type={item.type}
                  />
                  <i className="pi pi-plus ml-2 " onClick={addInput}></i>
                  <i
                    className="pi pi-minus ml-2"
                    onClick={() => deleteinput(i)}
                  ></i>
                </section>
              );
            })}
          </section>
          <p className="text-sm">Select default value </p>
          <Dropdown
            value={selectedCity1}
            options={arr}
            optionLabel="value"
            onChange={defaultValue}
            placeholder="-None-"
            className="border-noround w-4"
          />
          <div className="field-checkbox mt-3">
            <Checkbox
              inputId="binary"
              checked={checked}
              onChange={handlerCheck}
            />
            <label htmlFor="binary" className="font-semibold">
              Enable history tracking for picklist values.
            </label>
          </div>

          <p className="font-semibold ml-2">Sort order preference</p>
          <p>
            <input
              type="radio"
              name="enter_order"
              id="12"
              value="Entered order"
              onChange={onValueChange}
            />
            <label>Entered order</label>
            <input
              type="radio"
              name="enter_order"
              id="12"
              value="Alphabetical order"
              onChange={onValueChange}
            />
            <label>Alphabetical order</label>
          </p>
          <p className=" bg-blue-100 p-2 border-round border-1 border-blue-500">
            {order == "Entered order"
              ? "Values will be sorted alphabetically in respective languages."
              : "The order customized here will be followed in List views, reports and dashboards where sorting is applied for the picklist field."}
          </p>
          <section>
            <p>
              <Checkbox
                inputId="binary"
                checked={colorchecked}
                onChange={handlerCheckcolor}
              />
              Enable color for picklist options
            </p>

            <p>
              <input
                type="checkbox"
                value="Required"
                name="Required"
                onChange={(event) => setCheckRequire(event.target.value)}
              ></input>
              Required
            </p>

            <p>
              {" "}
              <input
                type="checkbox"
                value="toolTip"
                name="toolTip"
                onChange={(event) => setCheckToolTip(event.target.value)}
              ></input>
              Show Tooltip{" "}
            </p>
          </section>
          <div className="currencyProperties_cancel">
            <p className="">Don't save this field.</p>
            <Button label="Done" onClick={() => setState(!state)} />
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Picklist;
