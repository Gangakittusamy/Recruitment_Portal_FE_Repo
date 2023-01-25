import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';

interface PickListProps {
  lookUpDialogVisible: boolean;
}

const LookUp: React.FC<PickListProps> = ({ lookUpDialogVisible }) => {
  const [state, setState] = useState(false);
  const [checkRequire, setCheckRequire] = useState('');
  const [checkToolTip, setCheckToolTip] = useState('');

  useEffect(() => {
    setState(lookUpDialogVisible);
  }, [lookUpDialogVisible]);

  return (
    <div>
      <Dialog
        header="Lookup Properties"
        visible={state}
        style={{ width: '35vw' }}
        position="top"
        onHide={() => setState(false)}
      >
        <p>
          Field Label <br />
          <input type="text" />
        </p>
        <p>
          Lookup Module
          <br />
          <input type="number" />
        </p>
        <p>
          <label> Related List Title</label>
          <br />
          <input type="text" />
        </p>

        <section>
          <p>
            <input
              type="checkbox"
              value="Required"
              name="Required"
              onChange={(event) => setCheckRequire(event.target.value)}
            ></input>
            Required
          </p>

          <p>
            {' '}
            <input
              type="checkbox"
              value="toolTip"
              name="toolTip"
              onChange={(event) => setCheckToolTip(event.target.value)}
            ></input>
            Show Tooltip{' '}
          </p>
        </section>
        <div className="currencyProperties_cancel">
          <p className="">Don't save this field.</p>
          <Button label="Done" onClick={() => setState(!state)} />
        </div>
      </Dialog>
    </div>
  );
};
export default LookUp;
