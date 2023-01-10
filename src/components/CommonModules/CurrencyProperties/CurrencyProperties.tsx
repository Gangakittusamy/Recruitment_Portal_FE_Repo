import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import './CurrencyProperties.css';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';

interface CurrencyPropertiesProps {
  currencyDialogVisible: boolean;
}

const CurrencyProperties: React.FC<CurrencyPropertiesProps> = ({
  currencyDialogVisible,
}) => {
  const [value1, setValue1] = useState('');
  const [Number1, setNumber1] = useState(0);
  const [Number2, setNumber2] = useState(0);
  const [Number3, setNumber3] = useState(0);
  const [state, setState] = useState(false);
  const [selectedCity1, setSelectedCity1] = useState<any>([
    { name: 'Normal', code: 'NY' },
  ]);
  const [checked, setChecked] = useState<boolean>(false);
  const [checked1, setChecked1] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);
  const submitDatass = {
    field_label: value1,
    Maximum_digits_allowed: Number1,
    Number_of_decimal_places: Number2,
    Rounding_Option: selectedCity1,
    Precision: Number3,
    Required: checked,
    Encrypt_field: checked1,
    Show_Tooltip: checked2,
  };
  const [submitData, setsubmitData] = useState<any>(submitDatass);

  const submitHandler = async () => {
    setsubmitData(await submitDatass);
  };

  const onCityChange = (e: { value: any }) => {
    setSelectedCity1(e.value);
  };
  const cities = [
    { name: 'Normal', code: 'NY' },
    { name: 'Roundoff', code: 'RM' },
    { name: 'RoundDown', code: 'LDN' },
    { name: 'RoundUp', code: 'IST' },
    // { name: 'Paris', code: 'PRS' }
  ];

  useEffect(() => {
    setState(currencyDialogVisible);
  }, [currencyDialogVisible]);

  return (
    <div>
      <Dialog
        header="Currency Properties"
        visible={state}
        style={{ width: '50vw' }}
        position="top"
        onHide={() => setState(false)}
      >
        <div className="field col-12 md:col-3">
          <label>Field Label{value1} </label>
          <InputText
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
          />
        </div>

        <div className="field col-12 md:col-3" style={{ width: '35%' }}>
          <label htmlFor="Maximum digits allowed">Maximum digits allowed</label>
          <InputNumber
            inputId="Maximum digits allowed"
            value={Number1}
            onValueChange={(e: any) => setNumber1(e.value)}
            showButtons
            mode="decimal"
            min={0}
            max={16}
          />
        </div>

        <div className="field col-12 md:col-3" style={{ width: '35%' }}>
          <label htmlFor="Number of decimal places">
            Number of decimal places
          </label>
          <InputNumber
            inputId="Number of decimal places"
            value={Number2}
            onValueChange={(e: any) => setNumber2(e.value)}
            showButtons
            mode="decimal"
            min={0}
            max={9}
          />
        </div>

        <h5>Rounding Option</h5>
        <div className="flex">
          <span>
            <Dropdown
              value={selectedCity1}
              options={cities}
              onChange={onCityChange}
              optionLabel="name"
              placeholder="Select a City"
            />
          </span>
          {selectedCity1.name != 'Normal' ? (
            <div className="field col-12 md:col-3 pop">
              <h5>Precision</h5>
              <InputNumber
                inputId="Number of decimal places"
                value={Number3}
                onValueChange={(e: any) => setNumber3(e.value)}
                showButtons
                mode="decimal"
                min={0}
                max={9}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        {/* <p className="Currency_Precision">
            Precision <br />
            <input type="number" />
          </p> */}

        <section>
          <div className="field-checkbox mt-2">
            <Checkbox
              inputId="binary"
              checked={checked1}
              onChange={(e) => setChecked1(e.checked)}
            />
            <label htmlFor="binary">Required</label>
          </div>
          {checked1 ? (
            <p className="surface-300 p-1">
              Read/Write permissions will be given to all the profiles with
              access to this module.
            </p>
          ) : (
            ''
          )}

          <div className="field-checkbox">
            <Checkbox
              inputId="binary"
              checked={checked2}
              onChange={(e) => setChecked2(e.checked)}
            />
            <label htmlFor="binary">Encrypt field</label>
          </div>

          <div className="field-checkbox">
            <Checkbox
              inputId="binary"
              checked={checked}
              onChange={(e) => setChecked(e.checked)}
            />
            <label htmlFor="binary">Show Tooltip</label>
          </div>
          {checked ? <InputTextarea placeholder="Type tooltip" /> : ''}
        </section>

        <div className="currencyProperties_cancel">
          <p className="">Don't save this field.</p>
          <Button label="Done" onClick={submitHandler} />
        </div>
      </Dialog>
    </div>
  );
};
export default CurrencyProperties;
