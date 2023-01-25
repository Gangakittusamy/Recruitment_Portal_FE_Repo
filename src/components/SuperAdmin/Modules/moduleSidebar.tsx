
import { Tree } from 'primereact/tree';
import "./module.css"
import { useAppDispatch } from "../../../app/hooks";
import { logOut } from "../../../features/Auth/logOut";
import Cookies from "js-cookie";
import React, { useEffect, useState,useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from "react-router-dom";

const ModuleSideBar = (props: any) => {
     const [value3, setValue3] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const nodes = [
     {
         key: "0",
         label: 'General',
         children: [
             { key: "0-0", label: 'Personal Settings', url: 'https://reactjs.org/docs/getting-started.html' },
             { key: "0-1", label: 'Company Details', url: 'https://reactjs.org/docs/add-react-to-a-website.html' },
             { key: "0-2", label: 'Calendar booking', url: 'https://reactjs.org/docs/create-a-new-react-app.html' },
             { key: "0-3", label: 'Motivator', url: 'https://reactjs.org/docs/cdn-links.html' }
         ]
     },
     {
         key: "1",
         label: 'Users and Control',
         children: [
             { key: "1-0", label: 'Users', url: 'https://reactjs.org/docs/hello-world.html' },
             { key: "1-1", label: 'Security Control', url: 'https://reactjs.org/docs/introducing-jsx.html' },
             { key: "1-2", label: 'Compliance Settings', url: 'https://reactjs.org/docs/rendering-elements.html' },
             { key: "1-3", label: 'Territory Management', url: 'https://reactjs.org/docs/components-and-props.html' },
             { key: "1-4", label: 'Trusted Domain', url: 'https://reactjs.org/docs/state-and-lifecycle.html' },
          //    { key: "1-5", label: 'Handling Events', url: 'https://reactjs.org/docs/handling-events.html' }
         ]
     },
     {
          key: "2",
          label: 'Zoho Directory',
          children: [
              { key: "2-0", label: 'Single Sign-On(SAML)', url: 'https://reactjs.org/docs/hello-world.html' },
              { key: "2-1", label: 'Security Policies', url: 'https://reactjs.org/docs/introducing-jsx.html' },
              { key: "2-2", label: 'Active Directory Sync', url: 'https://reactjs.org/docs/rendering-elements.html' },
             
          ]
      },
      {
          key: "3",
          label: 'Users and Control',
          children: [
              { key: "3-0", label: 'Email', url: 'https://reactjs.org/docs/hello-world.html' },
              { key: "3-1", label: 'Telephony', url: 'https://reactjs.org/docs/introducing-jsx.html' },
              { key: "3-2", label: 'Business Messaging', url: 'https://reactjs.org/docs/rendering-elements.html' },
              { key: "3-3", label: 'Social', url: 'https://reactjs.org/docs/components-and-props.html' },
              { key: "3-4", label: 'Chat', url: 'https://reactjs.org/docs/state-and-lifecycle.html' },
              { key: "3-5", label: 'Signals', url: 'https://reactjs.org/docs/handling-events.html' },
              { key: "3-6", label: 'Portals', url: 'https://reactjs.org/docs/handling-events.html' }
          ]
      },
      {
          key: "4",
          label: 'Customization',
          children: [
              { key: "4-0", label: 'Modules and Fields', url: 'https://reactjs.org/docs/hello-world.html' },
              { key: "4-1", label: 'Wizards', url: 'https://reactjs.org/docs/introducing-jsx.html' },
              { key: "4-2", label: 'Pipelines', url: 'https://reactjs.org/docs/rendering-elements.html' },
              { key: "4-3", label: 'Templates', url: 'https://reactjs.org/docs/components-and-props.html' },
              { key: "4-4", label: 'Canvas', url: 'https://reactjs.org/docs/state-and-lifecycle.html' },
              { key: "4-5", label: 'Customize Home page', url: 'https://reactjs.org/docs/handling-events.html' },
              //{ key: "4-6", label: 'Portals', url: 'https://reactjs.org/docs/handling-events.html' }
          ]
      },
      {
          key: "5",
          label: 'Automation',
          children: [
              { key: "5-0", label: 'Workflow Rules', url: 'https://reactjs.org/docs/hello-world.html' },
              { key: "5-1", label: 'Schedules', url: 'https://reactjs.org/docs/introducing-jsx.html' },
              { key: "5-2", label: 'Actions', url: 'https://reactjs.org/docs/rendering-elements.html' },
              { key: "5-3", label: 'Assignment Rules', url: 'https://reactjs.org/docs/components-and-props.html' },
              { key: "5-4", label: 'Scoring Rules', url: 'https://reactjs.org/docs/state-and-lifecycle.html' },
              { key: "5-5", label: 'Segmentation', url: 'https://reactjs.org/docs/handling-events.html' },
              //{ key: "4-6", label: 'Portals', url: 'https://reactjs.org/docs/handling-events.html' }
          ]
      },
      {
          key: "6",
          label: 'Process Management',
          children: [
              { key: "6-0", label: 'Blueprint', url: 'https://reactjs.org/docs/hello-world.html' },
              { key: "6-1", label: 'Approval Processes', url: 'https://reactjs.org/docs/introducing-jsx.html' },
              { key: "6-2", label: 'Review Processes', url: 'https://reactjs.org/docs/rendering-elements.html' },
              { key: "6-3", label: 'CommandCenter', url: 'https://reactjs.org/docs/components-and-props.html' },
             
          ]
      },
      {
          key: "7",
          label: 'Data Administration',
          children: [
              { key: "7-0", label: 'Import', url: 'https://reactjs.org/docs/hello-world.html' },
              { key: "7-1", label: 'Export', url: 'https://reactjs.org/docs/introducing-jsx.html' },
              { key: "7-2", label: 'Data Backup', url: 'https://reactjs.org/docs/rendering-elements.html' },
              { key: "7-3", label: 'Remove sample data', url: 'https://reactjs.org/docs/components-and-props.html' },
              { key: "7-4", label: 'Storage', url: 'https://reactjs.org/docs/state-and-lifecycle.html' },
              { key: "7-5", label: 'Recycle Bin', url: 'https://reactjs.org/docs/handling-events.html' },
              { key: "7-6", label: 'Audit Log', url: 'https://reactjs.org/docs/handling-events.html' }
          ]
      },
      {
          key: "8",
          label: 'Marketplace',
          children: [
              { key: "8-0", label: 'All', url: 'https://reactjs.org/docs/hello-world.html' },
              { key: "8-1", label: 'Zoho', url: 'https://reactjs.org/docs/introducing-jsx.html' },
              { key: "8-2", label: 'Google', url: 'https://reactjs.org/docs/rendering-elements.html' },
              { key: "8-3", label: 'Microsoft', url: 'https://reactjs.org/docs/components-and-props.html' },
              
          ]
      },
 ];
 const nodeTemplate = (node:any, options:any) => {
     let label = <b>{node.label}</b>;

     if (node.url) {
         label = <a href={node.url}>{node.label}</a>;
     }

     return (
         <span className={options.className}>
             {label}
         </span>
     )
 }
  return (
    <div className="">
      {/* <div className="mx-auto mt-3 flex justify-content-center">
        <Button
          icon="pi pi-plus"
          label="  Connect New Account"
          className="p-button-warning text-xs "
        />
      </div> */}
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
          <div>
               <div className="ml-3 text-2xl font-semibold">Setup</div>
               <span className="p-input-icon-left ml-3 m-3">
                    <i className="pi pi-search" />
                    <InputText value={value3} onChange={(e) => setValue3(e.target.value)} placeholder="Search" />
                </span>
                <div>
            <div className="card text-white-alpha-70">
                <Tree value={nodes} nodeTemplate={nodeTemplate} />
            </div>
        </div>
          </div>
        {/* <div className="block justify-content-between align-items-center ">
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
        </div> */}
      </section>
    </div>
  );
};
export default ModuleSideBar;
