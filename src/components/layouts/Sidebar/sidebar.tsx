import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "./sidebar.css";
import ButtonOptions from "../../CommonModules/ButtonOptions/buttons";
import singleline from "../../../assets/singleline.svg";
import onetwothree from "../../../assets/123.svg";
import autonum from "../../../assets/autonum.svg";
import check from "../../../assets/check.svg";
import currency from "../../../assets/currency.svg";
import date from "../../../assets/date.svg";
import dateandtime from "../../../assets/dateandtime.svg";
import decimal from "../../../assets/decimal.svg";
import fileupload from "../../../assets/fileupload.svg";
import fx from "../../../assets/fx.svg";
import imageupload from "../../../assets/imageupload.svg";
import longint from "../../../assets/longint.svg";
import lookup from "../../../assets/lookup.svg";
import mail from "../../../assets/mail.svg";
import multiline from "../../../assets/multiline.svg";
import multiselect from "../../../assets/multiselect.svg";
import multilookup from "../../../assets/multi-lookup.svg";
import percent from "../../../assets/percent.svg";
import phone from "../../../assets/phone.svg";
import picklist from "../../../assets/picklist.svg";
import user from "../../../assets/user.svg";
import subform from "../../../assets/subform.svg";
import url from "../../../assets/url.svg";
import rect from "../../../assets/rect.svg";
import { InputText } from "primereact/inputtext";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
} from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { dragAndDropValue } from "../../../features/counter/dragAndDrop";
import { SIDEBARITEMS, ITEMS } from "../../Constant/const";

const SideBar = () => {
  const [search, setsearch] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const count: any = useSelector((state) => state);

  const [uidv4, setUidv4] = useState<any>();

  const [name, setName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dragAndDropValue(uidv4));
  }, [uidv4]);

  useEffect(() => {
    setActiveIndex(count.user.indexValue);
  }, [count.user.indexValue]);

  useEffect(() => {
    setUidv4(count.dragAndDrop.initialStateDrag);
  }, [count.dragAndDrop.initialStateDrag]);

  const addList = (e: any) => {
    setUidv4({ [uuidv4()]: [] });
  };
  const handleSearch = (e: any) => {
    setsearch(!search);
  };

  const QUICKCREATEITEMS = [
    {
      names: "Single Line",
      icon: singleline,
      id: uuidv4(),
    },
    {
      names: "Multi-Line",
      icon: multiline,
      id: uuidv4(),
    },
    {
      names: "Email",
      icon: mail,
      id: uuidv4(),
    },
  ];

  return (
    <div>
      {activeIndex === 0 ? (
        <Accordion>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>New Fields</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Droppable droppableId="CHECKITEMS" isDropDisabled={true}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className="text-blue-500 alignTwo"
                  >
                    {SIDEBARITEMS.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={provided.draggableProps.style}
                              className="rectanglebox white-space-nowrap"
                            >
                              <img
                                className="imagedesign height"
                                src={item.icon}
                              ></img>
                              {item.names}
                            </div>
                            {snapshot.isDragging && (
                              <span className="rectanglebox white-space-nowrap">
                                <img
                                  className="imagedesign height"
                                  src={item.icon}
                                ></img>
                                {item.names}
                              </span>
                            )}
                          </>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Unused Fields</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p className="text-gray-50">
                In ad velit in ex nostrud dolore cupidatat consectetur ea in ut
                nostrud velit in irure cillum tempor laboris sed adipisicing eu
                esse duis nulla non.
              </p>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      ) : activeIndex === 1 ? (
        <div>
          {search ? (
            <div className="nameOne margin-10 mt-3 justify-content-between flex">
              Available Fields
              <span onClick={handleSearch}>
                <i className="pi pi-search mr-2"></i>
              </span>
            </div>
          ) : (
            <div className="justify-content-between flex mt-3">
              <InputText
                type="text"
                className=" mb-2 w-10 "
                style={{ background: "#3b3f42" }}
                placeholder="search"
              />
              <span onClick={handleSearch}>
                <i className="pi pi-times mr-2 text-50 mt-2"></i>
              </span>
            </div>
          )}

          <div className="name  margin-10 ">Untitled Information</div>
          <br />

          <div>
            <Droppable droppableId="QUICKCREATEITEMS" isDropDisabled={true}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className="text-blue-500 alignTwo">
                  {QUICKCREATEITEMS.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <>
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                            className="rectanglebox white-space-nowrap"
                          >
                            <img
                              className="imagedesign height"
                              src={item.icon}
                            ></img>
                            {item.names}
                          </div>
                          {snapshot.isDragging && (
                            <span className="rectanglebox white-space-nowrap">
                              <img
                                className="imagedesign height"
                                src={item.icon}
                              ></img>
                              {item.names}
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
        </div>
      ) : (
        <div>
          <span className="nameOne margin-10">Related List</span>
          <span className="detail margin-10">
            All available related lists have been selected.{" "}
          </span>
        </div>
      )}
    </div>
  );
};

export default SideBar;
