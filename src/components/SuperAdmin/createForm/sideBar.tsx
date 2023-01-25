import { SIDEBARITEMS } from "../../Constant/const";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
} from "react-beautiful-dnd";
import "./CreateForm.css";
import React from "react";

const SideBar = () => {
  return (
    <div className="surface-500 overflow-y-auto  mt-2 border-round-xl  border-round-right-lg sideBar_main">
      <Droppable droppableId="CHECKSUPERDRAGITEMS" isDropDisabled={true}>
        {(provided, snapshot) => (
          <div ref={provided?.innerRef} className="text-blue-500 ">
            {SIDEBARITEMS.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <>
                    <div
                      ref={provided?.innerRef}
                      {...provided?.draggableProps}
                      {...provided?.dragHandleProps}
                      style={provided?.draggableProps.style}
                      className="rectanglebox2 "
                    >
                      <img src={item.icon} width={20} height={20} />
                      <div className="ml-3">{item?.names}</div>
                    </div>
                    <div className="sideBar_bottom_line"></div>

                    {snapshot?.isDragging && (
                      <span className="rectanglebox2 white-space-nowrap">
                        <img src={item?.icon} />
                        <p className="m-auto">{item?.names}</p>
                      </span>
                    )}
                  </>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default SideBar;
