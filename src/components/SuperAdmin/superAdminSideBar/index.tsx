import "./superAdminSideBar.css";
import { SUPERADMINSIDEBAR } from "../../Constant/const";
import { Button } from "primereact/button";
import Dashboard from "../../../assets/dashboard.svg";
import CreateRecruiter from "../../../assets/createRecruiter.png";
import Recruiter from "../../../assets/recruiter.png";
import Logout from "../../../assets/logout.png";
import Settings from "../../../assets/settings.png";
import Contact from "../../../assets/contact.png";
import Create from "../../../assets/create.png";
import { useAppDispatch } from "../../../app/hooks";
import { logOut } from "../../../features/Auth/logOut";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SuperAdminSideBar = (props: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="mx-auto mt-3 flex justify-content-center">
        <Button
          icon="pi pi-plus"
          label="  Connect New Account"
          className="p-button-warning text-xs "
        />
      </div>
      {/* <div>
        {SUPERADMINSIDEBAR.map((x: any, i: any) => (
          <span
            className="block p-2 text-xl surface-500 m-2 sideBarOnClick white-space-nowrap"
            onClick={(e: any) => props.handleClick(x.id)}
            key={i}
          >
            {x.names}
          </span>
        ))}
      </div> */}

      <section>
        <div className="block justify-content-between align-items-center ">
          <section className="flex  super_Admin_Sidebar_Dashboard">
            <img src={Dashboard} className="mr-2 ml-4" />
            <p>Dashboard</p>
          </section>
          <section className="ml-4 super_Admin_Sidebar_Recruiter">
            Recruiters
          </section>
          <section
            className="flex align-items-center mt-2 super_Admin_Sidebar_Dashboard sideBarOnClick"
            onClick={(e: any) => props.handleClick(1)}
          >
            <img src={Create} width={16} height={16} className="mr-2 ml-4" />
            <div> Create Recruiter</div>
          </section>
          <section
            className="flex align-items-center mt-2 super_Admin_Sidebar_Dashboard sideBarOnClick"
            onClick={(e: any) => props.handleClick(2)}
          >
            <img src={Recruiter} width={16} height={16} className="mr-2 ml-4" />
            <div>Recruiters</div>
          </section>
          <section className="ml-4 mt-3 super_Admin_Sidebar_Recruiter">
            Candidate
          </section>
          <section
            className="flex align-items-center mt-2 super_Admin_Sidebar_Dashboard sideBarOnClick"
            onClick={(e: any) => props.handleClick(3)}
          >
            <img src={Create} width={16} height={16} className="mr-2 ml-4" />
            <div> Create Candidate</div>
          </section>
          <section
            className="flex align-items-center mt-2 super_Admin_Sidebar_Dashboard sideBarOnClick"
            onClick={(e: any) => props.handleClick(4)}
          >
            <img src={Contact} width={16} height={16} className="mr-2 ml-4" />
            <div>Candidate</div>
          </section>
          <section className="ml-4 mt-3 super_Admin_Sidebar_Recruiter">
            Form
          </section>
          <section
            className="flex align-items-center mt-2 super_Admin_Sidebar_Dashboard sideBarOnClick"
            onClick={(e: any) => props.handleClick(5)}
          >
            <img src={Create} width={16} height={16} className="mr-2 ml-4" />
            <div>Create Form</div>
          </section>
          <section
            className="flex align-items-center mt-2 super_Admin_Sidebar_Dashboard sideBarOnClick"
            onClick={(e: any) => props.handleClick(6)}
          >
            <img src={Contact} width={16} height={16} className="mr-2 ml-4" />
            <div>Form Submission</div>
          </section>
          <section className="ml-4 mt-3 super_Admin_Sidebar_Recruiter">
            Schedules
          </section>
          <section
            className="flex align-items-center mt-2 super_Admin_Sidebar_Dashboard sideBarOnClick"
            onClick={(e: any) => props.handleClick(7)}
          >
            <img src={Create} width={16} height={16} className="mr-2 ml-4" />
            <div>Interviews</div>
          </section>
          <section
            className="flex align-items-center mt-2 super_Admin_Sidebar_Dashboard sideBarOnClick"
            onClick={(e: any) => props.handleClick(8)}
          >
            <img src={Contact} width={16} height={16} className="mr-2 ml-4" />
            <div>Status</div>
          </section>
        </div>
        <div className="mt-6">
          <section
            className="flex align-items-center mt-2 super_Admin_Sidebar_Dashboard sideBarOnClick"
            onClick={(e: any) => props.handleClick(2)}
          >
            <img src={Settings} width={16} height={16} className="mr-2 ml-4" />
            <div>Settings</div>
          </section>
          <section
            className="flex align-items-center mt-2 super_Admin_Sidebar_Dashboard sideBarOnClick"
            onClick={async (e: any) => {
              let res = await dispatch(logOut());
              if (res.payload.status === "success") {
                Cookies.remove("token");
                Cookies.remove("access_token");
                navigate("/");
              }
            }}
          >
            <img src={Logout} width={16} height={16} className="mr-2 ml-4" />
            <div>Logout</div>
          </section>
        </div>
      </section>
    </div>
  );
};
export default SuperAdminSideBar;
