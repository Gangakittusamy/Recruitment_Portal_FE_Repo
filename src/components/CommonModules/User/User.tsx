import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';

interface UserProps {
  UserDialogVisible: boolean;
}

const User: React.FC<UserProps> = ({ UserDialogVisible }) => {
  const [state, setState] = useState(false);
  const [order, setOrder] = useState('');
  const [checkAlpha, setCheckAlpha] = useState('');
  const [checkRequire, setCheckRequire] = useState('');
  const [checkToolTip, setCheckToolTip] = useState('');

  const onValueChange = (e: any) => {
    setOrder(e.target.value);
  };

  useEffect(() => {
    setState(UserDialogVisible);
  }, [UserDialogVisible]);

  return (
    <div>
      <Dialog
        header="User Field Properties"
        visible={state}
        style={{ width: '40vw' }}
        position="top"
        onHide={() => setState(false)}
      >
        <p>
          Field Label <br />
          <input type="text" />
        </p>
        <p>Type{order}</p>
        <p>
          <input
            type="radio"
            name="enter_order"
            id="12"
            value="single_user"
            onChange={onValueChange}
          />
          <label>Single User </label>
          <input
            type="radio"
            name="enter_order"
            id="12"
            value="multiple_user"
            onChange={onValueChange}
          />
          <label>Multiple Users</label>
        </p>

        <section>
          <p>
            <input
              type="checkbox"
              value="alphabetically"
              name="alphabetically"
              onChange={(event) => setCheckAlpha(event.target.value)}
            ></input>
            Allow Record Accessibility
          </p>

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
export default User;
