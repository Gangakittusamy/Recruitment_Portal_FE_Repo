import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { COMPLETE } from "../../Constant/const";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./FormSubmission.css";

const FormSubmission = () => {
  const [uidv4, setuidv4] = useState<any>();

  const [complete, setCompleted] = useState<any>({
    [uuidv4()]: COMPLETE,
  });

  useEffect(() => {
    setuidv4(COMPLETE);
  }, [COMPLETE]);
  return (
    <div className="mx-5">
      <h2>FormSubmission </h2>

      {Object.keys(complete).map((employee, index) => {
        return (
          <div key={index} className="formSubmission_main ">
            {complete[employee].map((employe: any, index: any) => {
              return (
                <div key={index} className="formSubmission">
                  <h3> {employe.names}</h3>
                  <p>{employe.subName}</p>
                </div>
              );
            })}

            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(FormSubmission);
