import { useState, useEffect } from 'react';
import './buttons.css';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Draggable from 'react-draggable';
import ReplicateButton from '../ReplicateButton/ReplicateButton';
import { useSelector, useDispatch } from 'react-redux';

interface ButtonOptionsProps {
  name: string;
  icon: string;
  id: any;
}

const ButtonOptions: React.FC<ButtonOptionsProps> = ({ name, icon }) => {
  const [isDragged, setIsDragged] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = useSelector((state: any) => state);
  useEffect(() => {
    setActiveIndex(count.user.indexValue);
  }, [count.user.indexValue]);

  const onStart = (event: any, data: any) => {
    setIsDragged(true);
  };

  return (
    <div className={isDragged ? 'rectangleMainBox' : ''}>
      {isDragged && (
        <div
          className={activeIndex == 1 ? 'rectangleboxQuick' : 'rectanglebox'}
        >
          <img className="imagedesign height" src={icon}></img>
          <div>1{name}</div>
        </div>
      )}
      <Draggable
        onStart={(event, data) => {
          onStart(event, data);
        }}
        onStop={(event, data) => {
          setIsDragged(true);
        }}
      >
        <div>
          {isDragged && <ReplicateButton buttonName={name} icon={icon} />}
          {!isDragged && (
            <div
              className={
                activeIndex == 1 ? 'rectangleboxQuick' : 'rectanglebox'
              }
            >
              <img className="imagedesign height" src={icon}></img>
              <div>2{name}</div>
            </div>
          )}
        </div>
      </Draggable>
    </div>
  );
};

export default ButtonOptions;
