import { SIDEBARITEMS } from "../../Constant/const";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
} from "react-beautiful-dnd";
import "./FormSideBar.css";
import React from "react";

const FormSideBar = (props: any) => {
  return (
    <div className="surface-300 min-h-screen ">
      <Droppable droppableId="CHECKSUPERDRAGITEMS" isDropDisabled={true}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className="text-blue-500 alignTwo gap-1 m-1"
          >
            {SIDEBARITEMS.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                      className="rectanglebox1 white-space-nowrap"
                    >
                      <p className="m-auto">{item.names}</p>
                    </div>
                    {snapshot.isDragging && (
                      <span className="rectanglebox1 white-space-nowrap">
                        <p className="m-auto">{item.names}</p>
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
export default React.memo(FormSideBar);
