import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { dragAndDropDialogIndexSuperAdmin } from "../../../features/counter/dragAndDrop";
import { ITEMS } from "../../Constant/const";
import Picklist from "../../CommonModules/PickList/PickList";

const DropArea = () => {
  const [uidv4, setuidv4] = useState<any>();
  const count: any = useSelector((state) => state);
  const [sidebar, setSidebar] = useState(false);
  const [date, setDate] = useState<Date | Date[] | undefined>(new Date());
  const [selectedCity1, setSelectedCity1] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setuidv4(count.dragAndDrop.initialStartDragSuperAdmin);

    let index: any;
    let inputName: any;
    Object.keys(count.dragAndDrop.initialStartDragSuperAdmin || {}).map(
      (x: any) => {
        index = x;
      }
    );
    if (index != null) {
      [count.dragAndDrop.initialStartDragSuperAdmin].map((x: any) => {
        inputName = x[index];
      });
    }
  }, [count.dragAndDrop.initialStartDragSuperAdmin]);

  const handleChange = (e: any, i: number) => {
    let index: any;
    let inputName: any[] = [];
    Object.keys(uidv4 || {}).map((x: any) => {
      index = x;
    });
    if (index != null) {
      [uidv4].map((x: any) => {
        inputName = x[index];
      });
    }
    inputName = inputName.map((x: any, idx: any) => {
      if (idx === i) {
        return { ...x, names: e.target.value };
      }
      return x;
    });

    setuidv4({ [index]: inputName });
  };

  const onCityChange = (e: any) => {
    setSelectedCity1(e.value);
  };

  const openDialog = () => {
    let value = ITEMS[count.dragAndDrop.DialogIndex];

    if (value) {
      if (value.names === "Pick List") {
        return <Picklist pickListDialogVisible={true} />;
      }
    }
  };

  return (
    <div className="">
      <div className="ml-8 pl-2">
        <div className="grey py-2 font-semibold" style={{ color: "#333333" }}>
          Form Name
        </div>
        <input
          placeholder="Untiled form"
          className=" w-30rem my-auto border-round-md text-sm uppercase text-900"
          p-3
          style={{
            height: "52px",
            border: "1px solid lightgrey",
            color: "#333333",
            background: "#CCCCCC",
          }}
        />
      </div>
      <div className="ml-8 pl-2">
        <div className="grey py-2 font-semibold" style={{ color: "#333333" }}>
          Submit Form Date
        </div>
        <Calendar
          placeholder="Untiled form"
          className=" w-30rem my-auto border-round-md text-sm"
          value={date}
          onChange={(e) => setDate(e.value)}
          dateFormat="dd-mm-yy"
          p-3
          disabled
          style={{
            height: "52px",
            border: "1px solid lightgrey",
            color: "#333333",
            background: "#CCCCCC",
          }}
        />
      </div>
      <div className="FormDiv1">
        {Object.keys(uidv4 || {}).map((list: any, i: number) => {
          return (
            <div>
              <Droppable key={list} droppableId={list}>
                {(provided, snapshot) => (
                  <div className="" ref={provided.innerRef}>
                    {uidv4[list].length
                      ? uidv4[list].map((item: any, index: number) => (
                          <>
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  className=" px-2 mt-3 ml-8 mr-8"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  style={provided.draggableProps.style}
                                  {...provided.dragHandleProps}
                                >
                                  <div className=" py-1">
                                    <input
                                      type="text"
                                      name="names"
                                      style={{
                                        height: "44px",
                                        border: "1px solid lightgrey",
                                        color: "#8083A3",
                                      }}
                                      value={item.names}
                                      onChange={(e) => {
                                        handleChange(e, index);
                                      }}
                                      className=" w-30rem my-auto border-round-md  p-3"
                                    />
                                    <section
                                      className="grey py-2 font-semibold"
                                      style={{ color: "#333333" }}
                                    >
                                      {item.subName}
                                    </section>
                                  </div>
                                </div>
                              )}
                            </Draggable>

                            {count.dragAndDrop.DialogIndex == 4 &&
                            item.names == "Pick List"
                              ? openDialog()
                              : ""}
                          </>
                        ))
                      : !provided.placeholder && (
                          <span className="Appp">Drop items here</span>
                        )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>

      <div className="flex  justify-content-end mt-2 mb-3 mr-5">
        <Button
          label="Cancel"
          className="surface-300 border-300 text-color mr-5"
        />
        <Button label="Save" className="bg-primary" />
      </div>
    </div>
  );
};

export default React.memo(DropArea);
