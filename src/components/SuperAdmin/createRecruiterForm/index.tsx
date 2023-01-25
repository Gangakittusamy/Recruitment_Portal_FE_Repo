import "./createRecruiterForm.css";
import noavathar from "../../../images/Group.png";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { useState, useEffect, useRef } from "react";
import AddRecruiters from "./AddRecruiters";
import { useFormik } from "formik";
import { InputMask } from "primereact/inputmask";
import { RecruitersPostValue } from "../../../features/Recruiter/createRecruiter";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import * as Yup from "yup";
import { Calendar } from "primereact/calendar";
const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(4).required("Please enter your password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
const validate = (values: {
  Username: string | any[];
  Designation: string | any[];
  email: string;
  Gender: string | any[];
  Birth: string | any[] | null | Date | Date[] | undefined;
  Phone: Number | any[];
}) => {
  const errors: any = {};
  if (!values.Username) {
    errors.Username = "Please enter your username";
  } else if (values.Username.length > 15) {
    errors.Username = "Must be 15 characters or less";
  }

  if (!values.Designation) {
    errors.Designation = "Please enter your Designation";
  } else if (values.Designation.length > 20) {
    errors.Designation = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.Gender) {
    errors.Gender = " Gender is Required";
  } else if (values.Gender.length > 20) {
    errors.Gender = "Must be 20 characters or less";
  }
  if (!values.Birth) {
    errors.Birth = "please enter your D.O.B";
  }
  //  else if (values.Birth.length > 20) {
  //   errors.Birth = 'Must be 20 characters or less';
  // }
  if (!values.Phone) {
    errors.Phone = "Phone number is Required";
  }
  // else if (values.Phone.length > 20) {
  //   errors.Phone = 'Must be 20 characters or less';
  // }

  return errors;
};

const CreateRecruiterForm = () => {
  const [nextPage, setNaxtPage] = useState(false);

  const [Username, setUsername] = useState("");
  const [Designation, setDesignation] = useState("");
  const [Gender, setGender] = useState("");
  const [Birth, setBirth] = useState<Date | Date[] | undefined>(undefined);
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState(0);

  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state: any) => state);

  const formik = useFormik({
    initialValues: {
      Username: Username,
      Designation: Designation,
      email: Email,
      Gender: Gender,
      Birth: Birth,
      Phone: Phone,
    },
    validate,
    onSubmit: async (values) => {
      // setNaxtPage(!nextPage);
      setsubmitData(values);
      let val = {
        name: values.Username,
        Designation: values.Designation,
        Gender: values.Gender,
        DateofBirth: values.Birth,
        email: values.email,
        PhoneNumber: values.Phone,
      };
      let value = await dispatch(RecruitersPostValue(val));
      if ((await value.payload.staus) == 201) {
        toast.current.show({
          severity: "info",
          summary: "Success",
          detail: "File Uploaded with Basic Mode",
          life: 5000,
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Something Went Wrong",
          life: 5000,
        });
      }
    },
  });
  const submitDatass = {
    Username: Username,
    Designation: Designation,
    Gender: Gender,
    Birth: Birth,
    Email: Email,
    Phone: Phone,
  };
  const [submitData, setsubmitData] = useState<any>();

  const toast: any = useRef(null);
  const onBasicUpload = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded with Basic Mode",
    });
  };
  return (
    <div>
      <div>
        <Toast ref={toast} position="top-center"></Toast>
        <span className="flex m-2 ml-2">
          <span className="text-xl ml-2">Add Recruiters</span> {/*  */}
        </span>
        <div>
          <div className="flex align-items-center ml-8">
            <span className="ml-5 mt-3">
              {" "}
              <img src={noavathar} style={{ width: "110px" }}></img>
            </span>
            <span className="ml-3 mt-4">
              <FileUpload
                mode="basic"
                name="demo[]"
                url="https://primefaces.org/primereact/showcase/upload.php"
                accept="image/*"
                maxFileSize={1000000}
                onUpload={onBasicUpload}
                chooseLabel="Upload"
              />
            </span>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="ml-8 mt-3">
            <div className=" RequirtersGrid ml-5">
              <span className="p-float-label">
                <InputText
                  id="in"
                  style={{ width: "74%" }}
                  className="recrirtersForm mt-4"
                  name="Username"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.Username}
                />
                <label htmlFor="in" className="mr-3">
                  UserName
                </label>
                {formik.errors.Username ? (
                  <div className="text-red-600 text-sm  font-semibold">
                    {formik.errors.Username}
                  </div>
                ) : null}
              </span>
              <span className="p-float-label">
                <InputText
                  id="in"
                  style={{ width: "74%" }}
                  className="recrirtersForm mt-4"
                  name="Designation"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.Designation}
                />
                <label htmlFor="in">Designation</label>
                {formik.errors.Designation ? (
                  <div className="text-red-600 text-sm  font-semibold">
                    {formik.errors.Designation}
                  </div>
                ) : null}
              </span>
              <span className="p-float-label">
                <InputText
                  id="in"
                  style={{ width: "74%" }}
                  className="recrirtersForm mt-4"
                  name="Gender"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.Gender}
                />
                <label htmlFor="in">Gender</label>
                {formik.errors.Gender ? (
                  <div className="text-red-600 text-sm  font-semibold">
                    {formik.errors.Gender}
                  </div>
                ) : null}
              </span>
              <span className="p-float-label">
                <Calendar
                  id="in"
                  style={{ width: "74%" }}
                  className="recrirtersForm mt-4"
                  name="Birth"
                  onChange={formik.handleChange}
                  value={formik.values.Birth}
                  placeholder=" "
                />
                <label htmlFor="in">Date of Birth</label>
                {formik.errors.Birth ? (
                  <div className="text-red-600 text-sm  font-semibold">
                    {formik.errors.Birth}
                  </div>
                ) : null}
              </span>
              {/* <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                            <Calendar id="calendar"  name="Birth" value={formik.values.Birth} onChange={formik.handleChange} />
                            <label htmlFor="calendar">Calendar</label>
                        </span>
                    </div> */}
              <span className="p-float-label">
                <InputText
                  id="in"
                  style={{ width: "74%" }}
                  className="recrirtersForm mt-4"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <label htmlFor="in">Email Address</label>
                {formik.errors.email ? (
                  <div className="text-red-600 text-sm  font-semibold">
                    {formik.errors.email}
                  </div>
                ) : null}
              </span>
              <span className="p-float-label">
                <InputMask
                  mask="99-99-99-99-99"
                  id="in"
                  style={{ width: "74%" }}
                  className="recrirtersForm mt-4"
                  name="Phone"
                  placeholder="99-99-99-99-99"
                  onChange={formik.handleChange}
                  value={formik.values.Phone}
                />
                <label htmlFor="in">Phone Number</label>
                {formik.errors.Phone ? (
                  <div className="text-red-600 text-sm  font-semibold">
                    {formik.errors.Phone}
                  </div>
                ) : null}
              </span>
            </div>{" "}
          </div>
          <div className="ButtonsEnd mt-3">
            <button className="buttonStyle ml-8 " style={{ height: "41px" }}>
              {" "}
              Cancel{" "}
            </button>

            <Button label="Save" type="submit" />
          </div>{" "}
        </form>
      </div>
      {/* )} */}
    </div>
  );
};

export default CreateRecruiterForm;
