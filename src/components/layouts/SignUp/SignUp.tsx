import "./SignUp.css";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../../app/hooks";
import { signUp } from "../../../features/Auth/signIn";
import { mailVerification } from "../../../features/Auth/mailVerify";

const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(4).required("Please enter your password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useRef<any>(null);
  const [city, setCity] = useState(null);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        let val: object = {
          name: values.name,
          email: values.email,
          password: values.password,
          photo: "",
          passwordConfirm: values.confirmPassword,
        };

        let res = await dispatch(signUp(val));

        if (res.payload.token) {
          Cookies.set("token", res.payload.token);
          await dispatch(mailVerification(res.payload.token));
          Cookies.remove("token");
        }
        navigate("/login");
        if (!res.payload.token) {
          await toast.current.show({
            severity: "info",
            summary: "Sticky Message",
            detail: "err",
            sticky: false,
          });
        }
      },
    });

  return (
    <div>
      <Toast ref={toast} position="top-center" />
      <div className="split left">
        <div className="centered">
          <div style={{ padding: "100px" }} className="mt-8">
            <div className="HeadingStyle">
              Recruiteas
              <br />
            </div>
            <span className="text-50 flex mt-1">
              Lorem ipsum is a pseudo-Latin text used in web design
            </span>

            <p className="text-2xl text-50">Who is Using?</p>
            <div className="flexD gap ">
              <div className="field-radiobutton radioButtonorder">
                <RadioButton
                  inputId="Human Resources"
                  name="city"
                  value="Human Resources"
                  onChange={(e) => setCity(e.value)}
                  checked={city === "Human Resources"}
                />
                <label htmlFor="Human Resources" className="text-50">
                  Human Resources
                </label>
              </div>
              <div className="field-radiobutton  radioButtonorder">
                <RadioButton
                  inputId="Assistance"
                  name="city"
                  value="Assistance"
                  onChange={(e) => setCity(e.value)}
                  checked={city === "Assistance"}
                />
                <label htmlFor="Assistance" className="text-50">
                  Assistance
                </label>
              </div>

              <div className="field-radiobutton  radioButtonorder">
                <RadioButton
                  inputId="Management"
                  name="city"
                  value="Management"
                  onChange={(e) => setCity(e.value)}
                  checked={city === "Management"}
                />
                <label htmlFor="Management" className="text-50">
                  Management
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="splittwo right">
        <div className="centered">
          <div className="loginRightHeading">
            <span className="text-2xl font-bold flex  justify-content-left">
              Hello !
            </span>
            <br />
            <span className="flex mt-1 flex  justify-content-left">
              Sign Up to Get Started
            </span>
            <form onSubmit={handleSubmit} className="p-fluid">
              <div className=" flex  justify-content-left align-items-start flex-column mt-4">
                <span className="p-input-icon-left">
                  <i className="pi pi-user" />
                  <InputText
                    placeholder="Full Name "
                    className="borderRadius"
                    style={{ width: "200px" }}
                    type="name"
                    autoComplete="off"
                    name="name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </span>
                {errors.name && touched.name ? (
                  <span className="form-error">{errors.name}</span>
                ) : null}
                <span className="p-input-icon-left mt-4">
                  <i className="pi pi-envelope" />
                  <InputText
                    placeholder="Email Address"
                    className="borderRadius"
                    style={{ width: "200px" }}
                    type="email"
                    autoComplete="off"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </span>
                {errors.email && touched.email ? (
                  <span className="form-error">{errors.email}</span>
                ) : null}
                <span className="p-input-icon-left mt-4">
                  <i className="pi pi-lock" />
                  <InputText
                    type="password"
                    placeholder="Password"
                    style={{ width: "200px" }}
                    className="borderRadius "
                    autoComplete="off"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </span>
                {errors.password && touched.password ? (
                  <span className="form-error">{errors.password}</span>
                ) : null}

                <span className="p-input-icon-left mt-4">
                  <i className="pi pi-lock" />
                  <InputText
                    type="password"
                    placeholder="Confirm Password"
                    style={{ width: "200px" }}
                    className="borderRadius "
                    autoComplete="off"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                </span>
                {errors.confirmPassword && touched.confirmPassword ? (
                  <span className="form-error">{errors.confirmPassword}</span>
                ) : null}
              </div>
              <span className="flex  justify-content-start">
                <Button
                  label="Register"
                  aria-label="Submit"
                  style={{ width: "200px" }}
                  className="mt-3 p-button-rounded"
                />
              </span>
            </form>
            <div
              className="text-center mt-2"
              style={{ width: "200px" }}
              onClick={() => navigate("/login")}
            >
              LOG IN
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
