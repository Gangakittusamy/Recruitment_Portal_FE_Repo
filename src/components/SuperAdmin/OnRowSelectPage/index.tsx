import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
const OnRowSelect = (props: any) => {
  const [getDatas, setgetDatas] = useState(null);

  useEffect(() => {
    setgetDatas(props.datas.value);
  }, [props.datas.value]);

  return (
    <div>
      <span className="flex justify-content-between p-2">
        <span className="text-xl ml-3">Candidate list</span>{' '}
        <span className="mr-2">
          <Button
            label="Exit"
            style={{ background: '#3E7EFF' }}
            onClick={(e: any) => props.handleClick()}
          />
        </span>
      </span>
      {Object.keys(getDatas || []).map((list: any) => {
        return <div>{list}</div>;
      })}
    </div>
  );
};
export default OnRowSelect;
