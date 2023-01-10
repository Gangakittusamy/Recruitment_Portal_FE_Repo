import { Button } from "primereact/button";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import React from "react";
const AddInputs = () => {
  const [click, setclick] = useState(false);
  const clickButton = () => {
    setclick(!click);
  };
  return (
    <>
      {click ? (
        <div className="h-full">
          <div className="p-4 ml-8">
            <span>Add Title</span>
            <br />
            <div>
              <InputText
                className="w-11 mt-3"
                style={{ height: "40px" }}
                placeholder="Enter Title here"
              />
            </div>
            <div className="mt-2">
              <Dropdown
                className="w-11 mt-3"
                style={{ height: "40px" }}
                placeholder="None"
              />
            </div>
            <br />
            <span className="flex justify-content-end mr-6 text-primary">
              +Add Fields
            </span>
          </div>
          <div className="p-4 ml-8">
            <span>Add Title</span>
            <br />
            <div>
              <InputText
                className="w-11 mt-3"
                style={{ height: "40px" }}
                placeholder="Enter Title here"
              />
            </div>
            <div className="mt-2">
              <Dropdown
                className="w-11 mt-3"
                style={{ height: "40px" }}
                placeholder="None"
              />
            </div>
            <br />
            <span className="flex justify-content-end mr-6 text-primary">
              +Add Fields
            </span>
          </div>
          <div className="flex  justify-content-end mt-2 mb-3 mr-7">
            <Button
              label="Cancel"
              className="surface-300 border-300 text-color mr-5"
              onClick={clickButton}
            />
            <Button label="Save" className="bg-primary" />
          </div>
        </div>
      ) : (
        <div className="h-full flex justify-content-center align-items-center ">
          <div className="Add_input_page">
            <Button label="+ Add New Fields" onClick={clickButton} />
            <p>or drag fields from the lists</p>
          </div>
          {/* <div className="Add_input_page"> */}
        </div>
      )}
    </>
  );
};

export default React.memo(AddInputs);
