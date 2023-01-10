import { TabView, TabPanel } from 'primereact/tabview';
import './dashboard.css';
import UntitleImage from '../createFile/create';
import QuickCreate from '../QuickCreateFile/quickCreate';
import DetailView from '../DetailView/detailView';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dashboardIndexValue } from '../../../../src/features/counter/counterSlice';
import NavBar from '../Navbar/navbar';
import SideBar from '../Sidebar/sidebar';
// import "../../../../src/App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
} from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import {
  ITEMS,
  QUICKITEMS,
  COMPLETE,
  QUICKCREATECOMPLETE,
} from '../../Constant/const';
import {
  dragAndDropValue,
  quickDragAndDropValue,
  dragAndDropDialogOpenIndex,
} from '../../../features/counter/dragAndDrop';

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

const Dashboard = (props: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const [complete, setCompleted] = useState<any>({
    [uuidv4()]: COMPLETE,
  });
  const [counter, setCounter] = useState<any>();

  const [quickCreateComplete, setQuickCreateComplete] = useState<any>({
    [uuidv4()]: QUICKCREATECOMPLETE,
  });

  const count = useSelector((state: any) => state);
  // const dispatch = useDispatch();
  const indexValue = (e: any) => {
    setActiveIndex(e.index);
  };

  useEffect(() => {
    dispatch(dashboardIndexValue(activeIndex));
  }, [activeIndex]);

  useEffect(() => {
    dispatch(dragAndDropValue(complete));
  }, [complete]);
  useEffect(() => {
    setCounter(count.user.indexValue);
  }, [count.user.indexValue]);
  useEffect(() => {
    dispatch(quickDragAndDropValue(quickCreateComplete));
  }, [quickCreateComplete]);

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }

          switch (source.droppableId) {
            case destination.droppableId:
              if (counter == 0) {
                setCompleted({
                  [destination.droppableId]: reorder(
                    complete[source.droppableId],
                    source.index,
                    destination.index
                  ),
                });
              } else {
                setQuickCreateComplete({
                  [destination.droppableId]: reorder(
                    quickCreateComplete[source.droppableId],
                    source.index,
                    destination.index
                  ),
                });
              }

              break;
            case 'CHECKITEMS':
              setCompleted({
                [destination.droppableId]: copy(
                  ITEMS,
                  complete[destination.droppableId],
                  source,
                  destination
                ),
              });
              let indexOfDragable = result ? result.source.index : '';
              dispatch(dragAndDropDialogOpenIndex(indexOfDragable));

              break;
            case 'QUICKCREATEITEMS':
              setQuickCreateComplete({
                [destination.droppableId]: copy(
                  QUICKITEMS,
                  quickCreateComplete[destination.droppableId],
                  source,
                  destination
                ),
              });
              break;
            default:
              if (counter == 0) {
                setCompleted(
                  move(
                    complete[source.droppableId],
                    complete[destination.droppableId],
                    source,
                    destination
                  )
                );
              } else {
                setQuickCreateComplete(
                  move(
                    quickCreateComplete[source.droppableId],
                    quickCreateComplete[destination.droppableId],
                    source,
                    destination
                  )
                );
              }

              break;
          }
        }}
      >
        <div className="App">
          <div className="container">
            {props.idValue !== 4 ? (
              <nav>
                <NavBar />
              </nav>
            ) : (
              ''
            )}
            {props.idValue !== 4 ? (
              <main>
                <div>
                  <i className="pi pi-clone flex justify-content-end mr-2"></i>

                  <TabView
                    className="tabview"
                    activeIndex={activeIndex}
                    onTabChange={(e) => indexValue(e)}
                  >
                    <TabPanel header="CREATE">
                      <UntitleImage />
                    </TabPanel>
                    <TabPanel header="QUICK CREATE">
                      <QuickCreate />
                    </TabPanel>
                    <TabPanel header="DETAIL VIEW">
                      <DetailView />
                    </TabPanel>
                  </TabView>
                </div>
              </main>
            ) : (
              ''
            )}

            <div id="sidebar">
              <SideBar />
            </div>
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default Dashboard;
