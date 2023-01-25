import React, { useState, useEffect } from "react";
import { SIDEBARITEMS } from "../../Constant/const";
import Dashboard from "../../layouts/Dashboard-Main/dashboard";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
} from "react-beautiful-dnd";
import FormSideBar from "../formSidebar";
import FormDropArea from "../formDropArea";

const FormCreation = (props: any) => {
  return (
    <div className="flex">
      <FormSideBar />
      <FormDropArea />
    </div>
  );
};
export default React.memo(FormCreation);
