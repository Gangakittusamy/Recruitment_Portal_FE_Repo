import { InputText } from "primereact/inputtext";
import Vector from "../../../assets/Vector.png";
import Bell from "../../../assets/Bell.svg";
import Email from "../../../assets/email.png";
import Profile from "../../../assets/profile.png";
import "./NavBar.css";
import React from "react";

const NavBar = () => {
  return (
    <div className="p-2 flex justify-content-between align-items-center NavBar_Main">
      <section className="flex NavBar_Division  align-items-center">
        <img src={Vector} alt="Vector" width={30} height={30} />
        <p className="font-bold text-2xl line-height-1 white-space-nowrap ml-1">
          Req-Portal
        </p>
      </section>

      <section className="NavBar_Search ">
        <span className="p-input-icon-left block">
          <i className="pi pi-search" />
          <InputText
            // value={value3}
            // onChange={(e) => setValue3(e.target.value)}
            placeholder="Search"
            className="w-11"
          />
        </span>
      </section>
      <section className="flex NavBar_Division justify-content-end align-items-center">
        <img src={Bell} alt="Bell" />
        <img src={Email} alt="Email" className="ml-4" />
        <img src={Profile} alt="Profile" className="ml-4" />
      </section>
    </div>
  );
};

export default React.memo(NavBar);
