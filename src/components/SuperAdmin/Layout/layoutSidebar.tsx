import { Tree } from "primereact/tree";

import { useAppDispatch } from "../../../app/hooks";
import { logOut } from "../../../features/Auth/logOut";
import Cookies from "js-cookie";
import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { ModuleNameGet } from "../../../features/Modules/module";

const LayoutSideBar = (props: any) => {
  const [value3, setValue3] = useState("");
  const [state, setState] = useState<any>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    GetModuleName();
  }, []);

  const GetModuleName = async () => {
    let res = await dispatch(ModuleNameGet());
    setState(res.payload.data.user);
  };

  const nodeTemplate = (node: any, options: any) => {
    let label = <b>{node.label}</b>;

    if (node.url) {
      label = <a href={node.url}>{node.label}</a>;
    }

    return <span className={options.className}>{label}</span>;
  };
  return (
    <div className="">
      <section>
        <div>
          <div
            className="flex m-2"
            onClick={() => navigate("/super-admin/Settings/Modules")}
          >
            <i className="pi pi-arrow-left m-2 cursor-pointer"></i>
            <div className="ml-3 text-xl font-semibold">Modules</div>
          </div>
          {/* <span className="p-input-icon-left ml-3 m-3">
                    <i className="pi pi-search" />
                    <InputText value={value3} onChange={(e) => setValue3(e.target.value)} placeholder="Search" />
                </span> */}
          <div style={{ overflow: "auto", height: "78vh" }}>
            {state.map((list: any) => {
              return (
                <div>
                  <div className="layout_module_name capitalize">
                    {" "}
                    {list.modulename}{" "}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export default LayoutSideBar;
