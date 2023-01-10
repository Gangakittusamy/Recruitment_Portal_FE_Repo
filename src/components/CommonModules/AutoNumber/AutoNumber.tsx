import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import './AutoNumber.css';

interface AutoNumberProps {
  AutoNumberDialogVisible: boolean;
}

const AutoNumber: React.FC<AutoNumberProps> = ({ AutoNumberDialogVisible }) => {
  const [state, setState] = useState(false);
  const [checkToolTip, setCheckToolTip] = useState('');

  useEffect(() => {
    setState(AutoNumberDialogVisible);
  }, [AutoNumberDialogVisible]);

  return (
    <div>
      <Dialog
        header="Pick List Properties"
        visible={state}
        style={{ width: '50vw' }}
        position="top"
        onHide={() => setState(false)}
      >
        <p>
          Field Label <br />
          <input type="text" />
        </p>
        <h5 className="">Auto-Number Format </h5>
        <p>
          Prefix <br />
          <input type="text" />
        </p>
        <p>
          Prefix Starting Number <br />
          <input type="text" />
        </p>
        <p>
          Suffix
          <br />
          <input type="text" />
        </p>
        <p>Preview: 1</p>
        <p>
          <input
            type="checkbox"
            value="toolTip"
            name="toolTip"
            onChange={(event) => setCheckToolTip(event.target.value)}
          ></input>
          Show Tooltip
        </p>
        {checkToolTip === 'toolTip' ? (
          <textarea id="w3review" rows={4} cols={70}>
            At w3schools.com you will learn how to make a website. They offer
            free tutorials in all web development technologies.
          </textarea>
        ) : (
          ''
        )}
        <div className="currencyProperties_cancel">
          <p className="">Don't save this field.</p>
          <Button label="Done" onClick={() => setState(!state)} />
        </div>
      </Dialog>
    </div>
  );
};

export default AutoNumber;
