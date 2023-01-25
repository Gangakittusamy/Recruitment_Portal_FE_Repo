import './quickCreate.css';
import { useState, useRef, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
const QuickCreate = () => {
  const [sidebar, setSidebar] = useState(false);
  const [selectedCity1, setSelectedCity1] = useState(null);
  const count: any = useSelector((state) => state);

  const onCityChange = (e: any) => {
    setSelectedCity1(e.value);
  };
  const cities = [{ name: 'Admistrator', code: 'NY' }];
  const cards = [
    {
      names: 'Untitled Name',
      subName: 'single Line',
      id: 1,
    },
    {
      names: 'Email',
      subName: 'Email',
      id: 2,
    },
  ];
  function handlerClick() {
    setSidebar(!sidebar);
  }
  const [uidv4, setUidv4] = useState<any>();

  useEffect(() => {
    setUidv4(count.dragAndDrop.initialStateQuickDrag);
  }, [count.dragAndDrop.initialStateQuickDrag]);

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

    setUidv4({ [index]: inputName });
  };

  return (
    <div>
      <h5 className="previewQuick" onClick={handlerClick}>
        Preview
      </h5>
      <div className="boder-StyleQuick">
        <div className="">
          {Object.keys(uidv4 || {}).map((list: any, i: number) => {
            return (
              <Droppable key={list} droppableId={list}>
                {(provided, snapshot) => (
                  <div className="App" ref={provided.innerRef}>
                    {uidv4[list].length
                      ? uidv4[list].map((item: any, index: number) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className="cardQuickPreview px-2"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={provided.draggableProps.style}
                              >
                                <div
                                  className="names"
                                  {...provided.dragHandleProps}
                                >
                                  <input
                                    type="text"
                                    name="names"
                                    value={item.names}
                                    onChange={(e) => {
                                      handleChange(e, index);
                                    }}
                                    className="h-2rem my-auto border-none text-yellow-800"
                                  />
                                  <p className="grey">{item.subName}</p>
                                  <p
                                    className="delete"
                                    onClick={(e) => {
                                      const objWithIdIndex = uidv4[
                                        list
                                      ].findIndex(
                                        (obj: any) => obj.id === item.id
                                      );
                                      uidv4[list].splice(objWithIdIndex, 1);
                                    }}
                                  >
                                    <i className="pi pi-ellipsis-v"></i>
                                  </p>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      : !provided.placeholder && (
                          <span className="Appp ">Drop items here</span>
                        )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
      <Sidebar
        visible={sidebar}
        position="top"
        style={{ width: '45vw', height: '27vw' }}
        onHide={() => setSidebar(!sidebar)}
      >
        <div>
          <div className="flex  justify-content-center">
            <div className="dropdownBorderStyle">
              <span className="flex ">
                <span className="mt-2">Preview layout as</span>
                <Dropdown
                  className="ml-2 border-noround"
                  value={selectedCity1}
                  options={cities}
                  onChange={onCityChange}
                  optionLabel="name"
                  placeholder="Administrator"
                />
              </span>
            </div>
          </div>
          <div className="border-black-alpha-30 border-1 pb-7">
            <span className="sidebarheader font-medium">Quick Create</span>
            <div>
              {Object.keys(uidv4 || []).map((list: any, i: number) => {
                return (
                  <div key={i} className="previewCardAligment">
                    {uidv4[list]?.map((item: any, index: number) => {
                      return (
                        <div key={index}>
                          <div className="card border-0 mt-3 ml-7">
                            <span className="names">
                              {item.names == ''}
                              {item.names}
                              <InputText className="w-8" />{' '}
                            </span>{' '}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default QuickCreate;
