import "./createRecruiterTable.css";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import Profile from "../../../assets/profile.png";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { CREATERECRUITERTABLE } from "../../Constant/const";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  RecruitersGetValue,
  RecruiterTableDelete,
  RecruiterTableEdit,
} from "../../../features/Recruiter/recruiter";
import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const CreateRecrutierTable = () => {
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [products, setProducts] = useState();
  const [state, setState] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();

  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state: any) => state);

  const toast = useRef<any>(null);

  useLayoutEffect(() => {
    dispatch(RecruitersGetValue());
  }, []);

  useEffect(() => {
    if (user.Recruiter.roles != null) {
      setProducts(user.Recruiter.roles);
    }
  }, [user.Recruiter.roles]);

  const onCityChange = (e: any) => {
    setSelectedCity1(e.value);
  };

  const items = [
    {
      label: "Update",
      icon: "pi pi-pencil",
      command: (y: any) => {
        setOpen(!open);
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: (y: any) => {
        confirmDialog({
          message: "Are you sure you want to delete",
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: async () => {
            let res: any = await dispatch(RecruiterTableDelete(state));
            if (res.payload.status) {
              dispatch(RecruitersGetValue());
            }
          },
          reject: () => {},
        });
      },
    },
  ];
  const countryBodyTemplate = (rowData: any) => {
    return (
      <div className="flex align-items-center">
        <img alt="flag" src={Profile} width={30} height={30} />
        <span className="ml-1">{rowData.name}</span>
      </div>
    );
  };

  const editPolicy = (data: any) => {
    return (
      <div className="speeddial-linear-demo ">
        <SpeedDial
          model={items}
          onClick={(x: any) => {
            setState(data.id);
          }}
          direction="right"
        />
      </div>
    );
  };

  const onHide = () => {
    setOpen(!open);
  };

  return (
    <div className="mx-5 my-3">
      <Toast ref={toast} />
      <div className="flex justify-content-between align-items-center">
        <h2 className=" "> Recrutier</h2>
        <Button label="Add New Recruiter" />
      </div>
      <ConfirmDialog />
      <DataTable
        value={products}
        paginator
        responsiveLayout="scroll"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={5}
        rowsPerPageOptions={[5, 10, 15]}
      >
        <Column field="sno" header="S.No"></Column>
        <Column field="name" body={countryBodyTemplate} header="Name"></Column>
        <Column field="Designation" header="Designation"></Column>
        <Column field="Gender" header="Gender"></Column>
        <Column field="DateofBirth" header="Date of Birth"></Column>
        <Column field="email" header="Email Address"></Column>
        <Column field="PhoneNumber" header="Phone Number"></Column>
        <Column body={editPolicy} header="Actions"></Column>
      </DataTable>

      <Dialog
        header="Edit"
        visible={open}
        style={{ width: "40vw" }}
        onHide={() => onHide}
      >
        <div className="flex justify-content-between">
          <p>
            Name: <br />
            <InputText
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </p>
          <p>
            Designation:
            <br />
            <InputText value={"Designation"} />
          </p>
        </div>
        <div className="flex justify-content-between">
          <p>
            Gender :<br />
            <InputText id="in" value={"Gender"} />
          </p>
          <p>
            Email :<br />
            <InputText id="in" value={"email"} />
          </p>
        </div>
        <p>
          Phone : <br />
          <InputText id="in" value={"phone"} />
        </p>
        <div className="flex justify-content-between">
          <Button label="Save" />
          <Button label="Cancel" onClick={() => setOpen(!open)} />
        </div>
      </Dialog>
    </div>
  );
};
export default React.memo(CreateRecrutierTable);
