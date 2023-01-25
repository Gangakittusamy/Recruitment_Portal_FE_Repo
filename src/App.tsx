import React, { useEffect, useState } from "react";
import "./App.css";
import "primeicons/primeicons.css";
import Dashboard from "./components/layouts/Dashboard-Main/dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/layouts/LoginPage/Login";
import Selection from "./components/layouts/SelectionPage/Selection";
import SignUp from "./components/layouts/SignUp/SignUp";
import { AuthRoute } from "../src/components/AuthRoute/AuthRoute";
import SuperAdmin from "./components/SuperAdmin";
import CreateRecruiterForm from "./components/SuperAdmin/createRecruiterForm/index";
import Settings from "./components/SuperAdmin/Settings/index";
import SettingsModules from "./components/SuperAdmin/Modules/index";
import CreateForm from "./components/SuperAdmin/createForm/index";
import NavigateFile from "./components/SuperAdmin/createForm/navigateFile";
import LayoutPage from "./components/SuperAdmin/Layout/index";
import FieldListTablePage from "./components/SuperAdmin/inputListTablePage/index";
import CustomModule from "./components/SuperAdmin/CustomModule/index";

// import axios from "./components/Constant/Api";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import NavBar from "./components/SuperAdmin/navBar";
import createForm from "./components/SuperAdmin/createForm/index";

function App() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(true);

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        setShow(true);
        return config;
      },
      function (error) {
        setShow(false);
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (response) {
        setShow(false);
        return response;
      },
      function (error) {
        setShow(false);
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <>
      {count ? (
        <>
          <div className={"loaderTrue " + (show ? "flex" : "hidden")}>
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="8"
              className=""
            />
          </div>
          <section className={"" + (show ? "hidden" : "block")}>
            <Routes>
              <Route element={<AuthRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/selection" element={<Selection />} />
                <Route path="/super-admin">
                  <Route index={true} element={<SuperAdmin />} />
                  <Route path="edit/:editId" element={<SuperAdmin />} />
                  <Route index={false} path="Settings" element={<Settings />} />
                  <Route
                    path="Settings/Modules"
                    element={<SettingsModules />}
                  />
                  <Route
                    path="Settings/Modules/layoutpage"
                    element={<LayoutPage />}
                  />
                  <Route
                    path="Table-List/:editTableId"
                    element={<FieldListTablePage />}
                  />
                  <Route path="CustomModule/being" element={<CustomModule />} />
                  <Route path="create-form" element={<SuperAdmin />} />
                </Route>
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<SignUp />} />
            </Routes>
          </section>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
