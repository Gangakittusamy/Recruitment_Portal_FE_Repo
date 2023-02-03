import "./index.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import SuperAdminSideBar from "./superAdminSideBar";
import CreateRecruiterForm from "./createRecruiterForm";
import CreateRecrutierTable from "./createRecruiterTable";
import CandidateTable from "./CandidateTable";
import StatusTable from "./StatusTable";
import Dashboard from "../layouts/Dashboard-Main/dashboard";
import FormCreation from "./formCreation";
import SideBar from "../layouts/Sidebar/sidebar";
import SettingsModules from "../SuperAdmin/Modules/index";
import LayoutPage from "../SuperAdmin/Layout/index";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import {
  ITEMS,
  QUICKITEMS,
  COMPLETE,
  QUICKCREATECOMPLETE,
} from "../Constant/const";

import {
  dragAndDropValue,
  quickDragAndDropValue,
  dragAndDropDialogOpenIndex,
  dragAndDropValueSuperAdmin,
  formEditIdDragAndDrop,
  dragAndDropDialogIndexSuperAdmin,
  selectStructuredData,
} from "../../features/counter/dragAndDrop";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./navBar";
import CreateForm from "./createForm";
import { useParams } from "react-router-dom";
import { pickListDragableIdStore } from "../../features/counter/dragAndDrop";
import { ModuleNameGetFormsaa } from "../../features/Modules/module";
import { newSectionIndexData } from "../../features/counter/dragAndDrop";
import { Button } from "primereact/button";
import { type } from "os";

// const reorder = (
//   list: Iterable<unknown> | ArrayLike<unknown>,
//   startIndex: number,
//   endIndex: number
// ) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   return result;
// };

const copy = (
  source: Iterable<unknown> | ArrayLike<unknown>,
  destination: Iterable<unknown> | ArrayLike<unknown>,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item: any = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4() });

  return destClone;
};

const move = (
  source: Iterable<unknown> | ArrayLike<unknown>,
  destination: Iterable<unknown> | ArrayLike<unknown>,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const SuperAdmin = () => {
  const { editId } = useParams();
  const [id, setId] = useState();

  const [complete, setCompleted] = useState<any>({
    [uuidv4()]: [],
  });
  const structureData = useSelector(selectStructuredData);

  const [indexId, setIndexId] = useState<any>();
  const count: any = useSelector((state) => state);
  const [sample, setSample] = useState<any>({});

  const reorder = (
    list: Iterable<unknown> | ArrayLike<unknown>,
    startIndex: number,
    endIndex: number,
    res: any
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    let app = Object.assign({}, complete);
    app[res] = result;
    setCompleted(app);
    return result;
  };

  const addList = () => {
    setCompleted({ ...complete, [uuidv4()]: [] });

    let lent = Object.keys(complete).length;

    dispatch(newSectionIndexData(lent));
  };

  // let prevCount = usePrevious(complete);
  // function usePrevious(value: any) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   }, [value]);
  //   return ref.current;
  // }

  let prevCountRef = useRef(complete);

  useEffect(() => {
    if (window.location.pathname !== `/super-admin/edit/${editId}`) {
      if (Object.keys(structureData).length > 0) {
        let currentFormElements = complete
        for(const key in currentFormElements){
          const currentFormId = key
          const alteredFields = structureData[currentFormId]
          let currentFields = currentFormElements[currentFormId]

          if(alteredFields){
            const result : any = currentFields.map((o1:any,i:any) => {
              if(alteredFields.some((o2:any) => o1.id === o2.inputIdValue)){
                let alteredValue = alteredFields.find((f:any)=>{
                  return f.inputIdValue == currentFields[i].id
                })
                return {
                  names:alteredValue.names,
                  id:currentFields[i].id,
                  subName:currentFields[i].subName
                }
              } else {
                return {
                  names:currentFields[i].names,
                  id:currentFields[i].id,
                  subName:currentFields[i].subName
                }
              }
            });
            currentFormElements[key] = result
          }
        }
      }
      dispatch(dragAndDropValueSuperAdmin(complete));
    }

    if (window.location.pathname === `/super-admin/edit/${editId}`) {
      let totalValue = count.module?.rolesGetForms;

      let value = Object.assign({}, totalValue[0]?.moduleelements);
      const value1 = Object.assign({}, complete);

      let res1 = Object.keys(value);
      let res2 = Object.keys(value1);

      res1.map((x, i) => {
        if (i + 1 < res1.length && res2.length < res1.length) {
          let ab: any = [uuidv4()];
          complete[ab] = [];
        }
      });

      dispatch(formEditIdDragAndDrop(res2));

      for (let key in value) {
        value[uuidv4()] = value[key];
        delete value[key];
      }

      let keyss = Object.keys(complete);

      let valuess = Object.values(value);

      let app: any = [];

      valuess.map((x: any, i) => {
        x = x.map((y: any, o: number) => {
          return {
            names: y.type,
            subName: y.fieldname,
            id: uuidv4(),
          };
        });

        app.push([x]);
      });

      let resObj: any = {};
      keyss.map((ke: any, idx: any) => {
        if (app[idx] === undefined) {
          resObj[ke] = [];
        } else {
          resObj[ke] = app[idx][0];
        }
      });

      let resObj1: any = [];
      Object.keys(resObj || {}).map((list: any, i: number) => {
        resObj[list].map((x: any) => {
          resObj1.push({
            names: x.names,
            subName: x.subName,
          });
        });
      });

      let complete1: any = [];
      Object.keys(complete || {}).map((list: any, i: number) => {
        complete[list].map((x: any) => {
          complete1.push({
            names: x.names,
            subName: x.subName,
          });
        });
      });

      let c1 = JSON.stringify(resObj1);
      let c2 = JSON.stringify(complete1);

      let a1 = JSON.stringify(resObj);
      let a2 = JSON.stringify(complete);

      if (a1 !== a2) {
        if (a1.length > a2.length) {
          setCompleted(resObj);
          dispatch(dragAndDropValueSuperAdmin(resObj));
        }
        if (a2.length > a1.length) {
          setCompleted(complete);
          dispatch(dragAndDropValueSuperAdmin(complete));
        }
      }
      if (a1 === a2) {
        setCompleted(complete);

        // dispatch(dragAndDropValueSuperAdmin(complete));
      }
      // dispatch(dragAndDropValueSuperAdmin(complete));

      let ab = JSON.stringify(complete);
      let bc = JSON.stringify(prevCountRef.current);

      if (Object.keys(complete).length) {
        dispatch(dragAndDropValueSuperAdmin(complete));
      }

      // if (Object.keys(complete).length > 1) {
      //   if (ab !== bc) {
      //     dispatch(dragAndDropValueSuperAdmin(complete));
      //   } else {
      //     dispatch(dragAndDropValueSuperAdmin(prevCountRef.current));
      //   }
      // }
    }
  }, [complete]);

  function toAddData() {}

  const handleClick = (e: any) => {
    setId(e);
  };

  const dispatch = useDispatch();

  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }

          switch (source.droppableId) {
            case destination.droppableId:
              let app = complete;

              let resp = destination.droppableId;

              reorder(
                complete[source.droppableId],
                source.index,
                destination.index,
                destination.droppableId
              );

              // setCompleted({
              //   [resp]: reorder(
              //     complete[source.droppableId],
              //     source.index,
              //     destination.index
              //   ),
              // });

              break;
            case "CHECKSUPERDRAGITEMS":
              setCompleted({
                ...complete,
                [destination.droppableId]: copy(
                  ITEMS,
                  complete[destination.droppableId],
                  source,
                  destination
                ),
              });

              let indexOfDragable = result ? result.source.index : "";
              dispatch(dragAndDropDialogIndexSuperAdmin(indexOfDragable));
              setIndexId(indexOfDragable);

              break;

            default:
              // if (counter == 0) {
              setCompleted(
                move(
                  complete[source.droppableId],
                  complete[destination.droppableId],
                  source,
                  destination
                )
              );

              break;
          }
        }}
      >
        {/* <NavBar handleClick={handleClick} /> */}
        {window.location.pathname == "/super-admin/LayoutPage" ? (
          ""
        ) : (
          <NavBar handleClick={handleClick} />
        )}
        {/* <SettingsModules handleClick={handleClick} someProps="hssjs" /> */}
        <div className="layout h-full">
          <div className="sideContent">
            {/* <SuperAdminSideBar handleClick={handleClick} /> */}
          </div>
          <div style={{ background: "#FAFAFB", height: "100vh" }}>
            <div className="mainContent">
              {window.location.pathname ==
              "/super-admin/Settings/Modules/layoutpage" ? (
                <CreateForm />
              ) : (
                ""
              )}

              {window.location.pathname == "/super-admin" ? (
                <h2 className=" flex align-items-center justify-content-center">
                  Dashboard
                </h2>
              ) : (
                ""
              )}
              {window.location.pathname == "/super-admin/create-form" ? (
                <>
                  <CreateForm />
                  <div className="w-4 -mt-8  flex justify-content-center">
                    <Button
                      label="+ Add New Section"
                      onClick={() => addList()}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
              {window.location.pathname == `/super-admin/edit/${editId}` ? (
                <>
                  <CreateForm />
                  <div className="w-4 -mt-8  flex justify-content-center">
                    <Button
                      label="+ Add New Section"
                      onClick={() => addList()}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};
export default React.memo(SuperAdmin);
