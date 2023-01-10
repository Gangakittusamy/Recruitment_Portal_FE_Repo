import "./Login.css";
import { RadioButton } from "primereact/radiobutton";
import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useRef } from "react";
import Cookies from "js-cookie";
import { logInVerification } from "../../../features/Auth/logIn";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { LoginUserDetails } from "../../../features/Auth/userDetails";

const signUpSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const toast = useRef<any>(null);
  const [city, setCity] = useState(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.logIn);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        let val = {
          email: values.email,
          password: values.password,
        };

        let res = await dispatch(logInVerification(val));
        Cookies.set("access_token", res.payload.access_token, {
          expires: 1 / 24,
          // path: "/",
          // httpOnly: true,
        });
        let Ans: any = true;
        Cookies.set("logged_in", Ans, {
          // path: "/",
          // expires: 1 / 24,
        });
        Cookies.set("refresh_token", res.payload.access_token, {
          expires: 1 / 24,
          // path: "/",
          // httpOnly: true,
        });

        if (res.payload.access_token) {
          let app = res.payload.access_token;
          await dispatch(LoginUserDetails(app));
        }

        if (res.payload.access_token) {
          navigate("/super-admin");
        }
        if (!res.payload.access_token) {
          await toast.current.show({
            severity: "error",
            summary: res.payload.message,
            detail: "",
            life: 3000,
          });
        }

        // action.resetForm();
      },
    });

  return (
    <div>
      <div>
        <Toast ref={toast} position="top-center" />
        <div className="containerLogin">
          <div className="lefts">
            <div className="centered">
              <div style={{ padding: "100px" }} className="mt-8">
                <div className="HeadingStyle">
                  Recruiteas
                  <br />
                </div>
                <span className="text-50 flex mt-1">
                  Lorem ipsum is a pseudo-Latin text used in web design
                </span>

                <p className="text-2xl text-50 flexD">Who is Using?</p>
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
          <div className="rights">
            <div className="loginRightHeading">
              <span className="text-2xl font-bold flex">Hello Again</span>
              <br />
              <span className="flex mt-1">Welcome Back</span>
              <form onSubmit={handleSubmit} className="p-fluid">
                <div className="mt-4">
                  <span className="p-input-icon-left">
                    <i className="pi pi-envelope" />
                    <InputText
                      placeholder="Email Address"
                      className="borderRadius"
                      name="email"
                      id="email"
                      type="email"
                      autoComplete="off"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ width: "230px" }}
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
                      className="borderRadius"
                      autoComplete="off"
                      name="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ width: "230px" }}
                    />
                  </span>
                  {errors.password && touched.password ? (
                    <span className="form-error">{errors.password}</span>
                  ) : null}
                </div>
                <span>
                  <Button
                    label="login"
                    aria-label="Submit"
                    style={{ width: "230px" }}
                    className="mt-3 p-button-rounded"
                  />
                </span>
              </form>
              <br />
              <div
                className="text-center mt-2 pointer"
                style={{ width: "239px" }}
                onClick={() => navigate("/")}
              >
                Sign up
              </div>{" "}
              <br />
              <div className="text-center  pointer" style={{ width: "239px" }}>
                Forget Password
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
