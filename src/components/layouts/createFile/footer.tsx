import './create.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UntitleImage from '../createFile/create';
import { useSelector, useDispatch } from 'react-redux';
import MultipleSelect from '../../CommonModules/MultipleSelect/MultipleSelect';
import Picklist from '../../CommonModules/PickList/PickList';
import CurrencyProperties from '../../CommonModules/CurrencyProperties/CurrencyProperties';
import LookUp from '../../CommonModules/LookUp/LookUp';
import AutoNumber from '../../CommonModules/AutoNumber/AutoNumber';
import Formula from '../../CommonModules/Formula/Formula';
import User from '../../CommonModules/User/User';
import MultipleSelectLookUp from '../../CommonModules/MultipleSelectLookUp/MultipleSelectLookUp';
import { ITEMS } from '../../Constant/const';
import { dragAndDropDialogOpenIndex } from '../../../features/counter/dragAndDrop';
import FileUploadDemo from '../../CommonModules/FileUpload/FileUpload';

const Footer = ({ cards }: any, items: any) => {
  const dispatch = useDispatch();

  const count: any = useSelector((state) => state);
  const [name, setName] = useState('');
  const [uidv4, setUidv4] = useState<any>();
  const [listId, setListId] = useState<any>();

  useEffect(() => {
    setUidv4(count.dragAndDrop.initialStateDrag);

    let index: any;
    let inputName: any;
    Object.keys(count.dragAndDrop.initialStateDrag || {}).map((x: any) => {
      index = x;
    });
    if (index != null) {
      [count.dragAndDrop.initialStateDrag].map((x: any) => {
        inputName = x[index];
      });
    }
  }, [count.dragAndDrop.initialStateDrag]);

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

  const openDialog = () => {
    let value = ITEMS[count.dragAndDrop.DialogOpenIndex];
    if (value) {
      if (value.names === 'Currency') {
        return <CurrencyProperties currencyDialogVisible={true} />;
      } else if (value.names === 'Lookup') {
        return <LookUp lookUpDialogVisible={true} />;
      } else if (value.names === 'Auto-Number') {
        return <AutoNumber AutoNumberDialogVisible={true} />;
      } else if (value.names === 'User') {
        return <User UserDialogVisible={true} />;
      } else if (value.names === 'Multi-Select Lookup') {
        return (
          <MultipleSelectLookUp MultipleSelectLookUpDialogVisible={true} />
        );
      } else if (value.names === 'Pick List') {
        return <Picklist pickListDialogVisible={true} />;
      } else if (value.names === 'Multi-Select') {
        return <MultipleSelect dialogVisible={true} />;
      } else if (value.names === 'Formula') {
        return <Formula FormulaDialogVisible={true} />;
      } else if (value.names === 'File Upload') {
        return <FileUploadDemo FileUploadVisible={true} />;
      }
    }
    dispatch(dragAndDropDialogOpenIndex(-1));
  };

  return (
    <div>
      <section>
        <div className="boder-Style">
          <h5 className="informationName">Untitled Information</h5>

          <div className="dragCard">
            {Object.keys(uidv4 || []).map((list: any, i: number) => {
              return (
                <Droppable key={list} droppableId={list}>
                  {(provided, snapshot) => (
                    <div className="dragCard" ref={provided.innerRef}>
                      {uidv4[list].length
                        ? uidv4[list].map((item: any, index: number) => {
                            return (
                              <>
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      className="card px-2"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      style={provided.draggableProps.style}
                                    >
                                      <div
                                        className="names"
                                        {...provided.dragHandleProps}
                                      >
                                        {item.names === 'Untitled Owner' ? (
                                          <p>{item.subName}</p>
                                        ) : item.names === 'Untitled Name' ? (
                                          <p>{item.subName}</p>
                                        ) : item.names === 'Created By' ? (
                                          <p>{item.subName}</p>
                                        ) : item.names === 'Secondary Email' ? (
                                          <p>{item.subName}</p>
                                        ) : item.names === 'Email' ? (
                                          <p>{item.subName}</p>
                                        ) : item.names === 'Email Opt Out' ? (
                                          <p>{item.subName}</p>
                                        ) : item.names === 'Modified By' ? (
                                          <p>{item.subName}</p>
                                        ) : (
                                          <input
                                            type="text"
                                            name="names"
                                            value={item.names}
                                            onChange={(e) => {
                                              handleChange(e, index);
                                            }}
                                            className="h-2rem my-auto border-none text-yellow-800"
                                          />
                                        )}
                                        <p className="grey">{item.subName}</p>
                                        <p
                                          className="delete"
                                          onClick={(e) => {
                                            const objWithIdIndex = uidv4[
                                              list
                                            ].findIndex(
                                              (obj: any) => obj.id === item.id
                                            );
                                            uidv4[list].splice(
                                              objWithIdIndex,
                                              1
                                            );
                                          }}
                                        >
                                          <i className="pi pi-ellipsis-v"></i>
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>

                                {count.dragAndDrop.DialogOpenIndex === 10 &&
                                item.names.toString() === 'Currency'
                                  ? openDialog()
                                  : count.dragAndDrop.DialogOpenIndex === 16 &&
                                    item.names.toString() === 'Lookup'
                                  ? openDialog()
                                  : count.dragAndDrop.DialogOpenIndex === 9 &&
                                    item.names.toString() === 'Auto-Number'
                                  ? openDialog()
                                  : count.dragAndDrop.DialogOpenIndex === 18 &&
                                    item.names.toString() === 'User'
                                  ? openDialog()
                                  : count.dragAndDrop.DialogOpenIndex === 21 &&
                                    item.names.toString() ===
                                      'Multi-Select Lookup'
                                  ? openDialog()
                                  : item.names == 'Pick List' &&
                                    count.dragAndDrop.DialogOpenIndex == 4
                                  ? openDialog()
                                  : item.names == 'Multi-Select' &&
                                    count.dragAndDrop.DialogOpenIndex == 5
                                  ? openDialog()
                                  : item.names == 'Formula' &&
                                    count.dragAndDrop.DialogOpenIndex == 17
                                  ? openDialog()
                                  : item.names == 'File Upload' &&
                                    count.dragAndDrop.DialogOpenIndex == 19
                                  ? openDialog()
                                  : ''}
                              </>
                            );
                          })
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
      </section>
    </div>
  );
};

export default Footer;
