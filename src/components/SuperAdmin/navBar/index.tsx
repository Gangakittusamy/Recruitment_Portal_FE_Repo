import { InputText } from "primereact/inputtext";
import Vector from "../../../assets/Vector.png";
import Bell from "../../../assets/Bell.svg";
import Email from "../../../assets/email.png";
import Profile from "../../../assets/profile.png";
import { FileUpload } from "primereact/fileupload";
import "./NavBar.css";
import { Toast } from "primereact/toast";
import CreateForm from "../createForm/index";
import Cookies from "js-cookie";
import { Button } from "primereact/button";
import { logOut } from "../../../features/Auth/logOut";
import SuperAdminSideBar from "../superAdminSideBar/index";
import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Dashboard from "../../../assets/dashboard.svg";
import CreateRecruiter from "../../../assets/createRecruiter.png";
import Recruiter from "../../../assets/recruiter.png";
import Logout from "../../../assets/logout.png";
import Settings from "../../../assets/settings.png";
import Contact from "../../../assets/contact.png";
import Create from "../../../assets/create.png";
import { OverlayPanel } from "primereact/overlaypanel";
import { useNavigate } from "react-router-dom";
import {
  ModuleNameGet,
  ModuleNameGetFormsaa,
} from "../../../features/Modules/module";
import {
  ProjectLogoName,
  LogoNameGet,
} from "../../../features/Modules/projectLogoName";

const NavBar = (props: any) => {
  const [text, setText] = useState("Req-Portal");
  const [value3, setValue3] = useState("");
  const [valuein, setvaluein] = useState("");
  const [file, setFile] = useState<any>();
  const [getData, setgetData] = useState<any>();
  const [state, setState] = useState<any>([]);
  const [displayNav, setdisplayNav] = useState();
  const dispatch = useAppDispatch();
  const [imgShow, setimgShow] = useState<any>(Vector);

  const navigate = useNavigate();
  const user: any = useAppSelector((state) => state);

  const toast: any = useRef(null);
  const op = useRef<OverlayPanel>(null);
  const title = useRef<OverlayPanel>(null);

  useEffect(() => {
    GetModuleName();
  }, []);
  useEffect(() => {
    GetHeadingName();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    NavbarEdit;
  }, []);

  const GetModuleName = async () => {
    let res = await dispatch(ModuleNameGet());
    setState(res.payload.data.user);
  };

  const GetHeadingName = async () => {
    let res = await dispatch(LogoNameGet());

    setText(res.payload.data.data[0].title || "Req-Portal");
    setimgShow(res.payload.data.data[0].profile || { imgShow });
    //setState(res.payload.data.user);
  };

  const ShowNav = async (items: any, id: string) => {
    setdisplayNav(items);
    let res = await dispatch(ModuleNameGetFormsaa(id));

    if (res.payload.status === 200) {
      // navigate(`/super-admin/edit/${id}`);
    }
  };
  const NextPage = () => {
    navigate("/super-admin/create-form");
  };
  function handleChange(event: any) {
    const upload = event.target.files[0];

    setFile(upload);
  }

  const ChangeSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", valuein);
    formData.append("profile", file);
    let value = await dispatch(ProjectLogoName(formData));
    GetHeadingName();
    setgetData(value.payload.data.data[0]);
    title.current?.hide();
  };
  const NavbarEdit = async (x: any) => {
     localStorage.setItem("moduleName", x.modulename);
    let res = await dispatch(ModuleNameGetFormsaa(x._id));
    if (res.payload.status === 200) {
      navigate(`/super-admin/Table-List/${x._id}`);
    }
  };

  return (
    <div className="p-2 flex justify-content-between align-items-center NavBar_Main">
      <Toast ref={toast} position="top-center"></Toast>
      <section className="flex NavBar_Division  align-items-center">
        <img src={imgShow} alt="Vector" width={30} height={30} />
        <div onClick={(e) => title.current?.toggle(e)}>
          <p className="font-bold text-2xl line-height-1 white-space-nowrap ml-1">
            {text}
          </p>
        </div>

        <OverlayPanel
          ref={title}
          showCloseIcon
          id="overlay_panel"
          style={{ width: "350px" }}
          className="overlaypanel-demo"
        >
          <div>
            <form>
              <InputText type="file" onChange={handleChange} />
              <InputText
                value={valuein}
                onChange={(e) => setvaluein(e.target.value)}
                placeholder="Enter Product Name"
                className="w-12 mt-2"
                style={{ width: "148px" }}
              />
              <div className="flex justify-content-end" style={{ gap: "17px" }}>
                <Button className="mt-2">Cancel</Button>
                <Button type="submit" className="mt-2 " onClick={ChangeSubmit}>
                  Change
                </Button>
              </div>
            </form>
          </div>
        </OverlayPanel>
        <section className="flex  ">
          <div className="flex align-items-center mt-2 super_Admin_Sidebar_Dashboard sideBarOnClick">
            <img src={Dashboard} width={16} height={16} className="mr-2 ml-4" />
            <p className=" font-bold">Dashboard</p>
          </div>
          {state
            ? state.map((x: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="flex align-items-center mt-2 white-space-nowrap "
                  >
                    <div>
                      {" "}
                      {index <= 5 ? (
                        <div>
                          <div
                            className="nav_text capitalize"
                            onClick={(e: any) => NavbarEdit(x)}
                          >
                            {x.modulename}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })
            : ""}
          <div className="flex " style={{ right: "86px" }}>
            <span className="nav_text  flex align-items-center mt-2 white-space-nowrap capitalize">
              <span className="text-yellow-600">{displayNav || localStorage.getItem("moduleName")}</span>
            </span>
            <div onClick={(e) => op.current?.toggle(e)}>
              <i className="pi pi-angle-double-right mr-6 mt-4"></i>
            </div>
          </div>
          <OverlayPanel
            ref={op}
            showCloseIcon
            id="overlay_panel"
            style={{ width: "275px" }}
            className="overlaypanel-demo"
          >
            <div>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  value={value3}
                  onChange={(e) => setValue3(e.target.value)}
                  placeholder="Search"
                  style={{ width: "148px" }}
                />
              </span>
              <div className="overflow_overlay">
                {state
                  ? state.map((x: any, index: any) => {
                      return (
                        <div key={index} className="">
                          <div className="">
                            {" "}
                            {index >= 6 ? (
                              <div>
                                <div
                                  className="nav_text_overlay capitalize"
                                  onClick={(e: any) => NavbarEdit(x)}
                                >
                                  {x.modulename}{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
              <div
                className="mt-5 cursor-pointer text-primary"
                onClick={NextPage}
              >
                {" "}
                + Create New Module{" "}
              </div>
            </div>
          </OverlayPanel>
        </section>
      </section>

      <section className="">
        <i
          className="pi pi-cog ml-3 mr-2 pog"
          onClick={(e: any) => {
            // props.handleClick(9);
            navigate("/super-admin/settings");
          }}
        ></i>
        <img src={Bell} width={26} height={26} alt="Bell" />

        <img
          src={Profile}
          width={26}
          height={26}
          alt="Profile"
          className="ml-4"
        />
      </section>
    </div>
  );
};
export default React.memo(NavBar);
