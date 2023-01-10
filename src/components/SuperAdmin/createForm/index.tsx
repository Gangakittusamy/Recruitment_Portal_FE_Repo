import SideBar from "./sideBar";
import DropArea from "./dropArea";
import TopBars from "./topBars";
import AddInputs from "./addInputs";
import QuickAction from "./quickAction";
import Arrow from "../../../assets/arrow.png";
import "./CreateForm.css";
import React, { useState } from "react";

const CreateForm = () => {
  
 
  const [page, setpage] = useState(<DropArea />);
  const items: any = [
    { label: "Back", icon: "pi pi-fw pi-arrow-circle-left" },
    { label: "Add Inputs", icon: "pi pi-fw pi-plus" },
    { label: "Edit", icon: "pi pi-fw pi-pencil" },
    { label: "Create", icon: "pi pi-fw pi-cog" },
    { label: "Quick Actions", icon: "pi pi-fw pi-cog" },
    { label: "Preview", icon: "pi pi-fw pi-cog" },
  ];

  const pageClick = (e:any) =>{
     let get:any;
      if(e.index == 0){
       
          get = <DropArea />
        
        
        }
        else if(e.index == 1){
          
            get = <AddInputs />
        
        }
        else if(e.index == 4){
          
          get = <QuickAction/>
      
      }
        else{
        get = <DropArea />
        }
        setpage(get)

    //  })
  };
  return (
    <div className="mx-3">
      <div className="flex align-items-center justify-content-start">
        <h2 className="create_form_main_head ml-2">Create Form</h2>
      </div>
      <div>
        <TopBars items={items} pageClick={pageClick} />
      </div>
      <div className="flex mt-3 create_form_main">
        <SideBar />
        <div className="create_form_main_division">{page}</div>
      </div>
    </div>
  );
};

export default React.memo(CreateForm);
