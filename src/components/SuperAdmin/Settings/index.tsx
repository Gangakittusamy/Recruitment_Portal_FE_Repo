import "./settings.css";
import { Route, useNavigate } from "react-router-dom";
import SettingsModules from "../Modules";
import NavBar from "../navBar";

const Settings = () => {
  const navigate = useNavigate();
  const cards = [
    {
      names: "Modules and Fields",

      id: 1,
    },
    {
      names: "Wizards",

      id: 2,
    },
    {
      names: "Pipelines",

      id: 3,
    },
    {
      names: "Templates",

      id: 4,
    },
    {
      names: "Customize Home page",

      id: 5,
    },
  ];
  const NextPage = (data: any) => {
    if (data == "Modules and Fields") {
      navigate("/super-admin/Settings/Modules");
    }
  };
  return (
    <div>
      {/* <Route path="/Settings/Modules" element={<SettingsModules handleClick="handleclick" />} /> */}
      <NavBar />
      <div className="settingscard">
        <div className="Settings_Background">
          <h3>CUSTOMIZATION </h3>
          {cards.map((button) => (
            <div className="">
              <div
                className=" text-lg text-900 cursor-pointer text_hover"
                onClick={() => NextPage(button.names)}
              >
                {button.names}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Settings;
