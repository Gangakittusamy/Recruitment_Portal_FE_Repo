import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
interface MultipleSelectLookUpProps {
  MultipleSelectLookUpDialogVisible: boolean;
}

const MultipleSelectLookUp: React.FC<MultipleSelectLookUpProps> = ({
  MultipleSelectLookUpDialogVisible,
}) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(MultipleSelectLookUpDialogVisible);
  }, [MultipleSelectLookUpDialogVisible]);

  return (
    <div>
      <Dialog
        header="Multi Select Lookup Properties"
        visible={state}
        style={{ width: '40vw' }}
        position="top"
        onHide={() => setState(false)}
      >
        <p className="bg-pink-50 border-round p-2">
          Create relationship between B and C modules such that module B can
          have many records in module C and vice versa.
        </p>
        <p>
          Field Label <br />
          <InputText type="text" />
        </p>
        <p>
          Select Related Module
          <br />
          <InputText type="number" placeholder="Select Module" />
        </p>
        <div className="currencyProperties_cancel">
          <p className="">Don't save this field.</p>
          <Button label="Done" onClick={() => setState(!state)} />
        </div>
      </Dialog>
    </div>
  );
};

export default MultipleSelectLookUp;
