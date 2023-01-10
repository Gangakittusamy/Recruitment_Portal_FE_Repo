import "./index.css";
import React, { useState, useEffect } from "react";
import SuperAdminSideBar from "./superAdminSideBar";
import CreateRecruiterForm from "./createRecruiterForm";
import CreateRecrutierTable from "./createRecruiterTable";
import CandidateTable from "./CandidateTable";
import StatusTable from "./StatusTable";
import Dashboard from "../layouts/Dashboard-Main/dashboard";
import FormCreation from "./formCreation";
import SideBar from "../layouts/Sidebar/sidebar";
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
  dragAndDropDialogIndexSuperAdmin,
} from "../../features/counter/dragAndDrop";
import { useSelector, useDispatch } from "react-redux";
// import NavBar from "../layouts/Navbar/navbar";
import FormSubmission from "./formSubmission";
import CandidateList from "./candidateList";
import NavBar from "./navBar";
import CreateForm from "./createForm";

const reorder = (
  list: Iterable<unknown> | ArrayLike<unknown>,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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
  const [id, setId] = useState();

  const [complete, setCompleted] = useState<any>({
    [uuidv4()]: COMPLETE,
  });

  useEffect(() => {
    dispatch(dragAndDropValueSuperAdmin(complete));
  }, [complete]);

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
              // if (counter == 0) {
              setCompleted({
                [destination.droppableId]: reorder(
                  complete[source.droppableId],
                  source.index,
                  destination.index
                ),
              });

              break;
            case "CHECKSUPERDRAGITEMS":
              setCompleted({
                [destination.droppableId]: copy(
                  ITEMS,
                  complete[destination.droppableId],
                  source,
                  destination
                ),
              });

              let indexOfDragable = result ? result.source.index : "";
              dispatch(dragAndDropDialogIndexSuperAdmin(indexOfDragable));

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
        <NavBar />
        <div className="layout h-full">
          <div className="sideContent">
            <SuperAdminSideBar handleClick={handleClick} />
          </div>
          <div style={{ background: "#FAFAFB", height: "100vh" }}>
            <div className="mainContent">
              {id === 1 ? (
                <CreateRecruiterForm />
              ) : id === 2 ? (
                <CreateRecrutierTable />
              ) : id === 4 ? (
                <CandidateTable />
              ) : id === 5 ? (
                <CreateForm />
              ) : id === 7 ? (
                <CandidateList />
              ) : id === 8 ? (
                <StatusTable />
              ) : (
                <CreateRecruiterForm />
              )}
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};
export default React.memo(SuperAdmin);
