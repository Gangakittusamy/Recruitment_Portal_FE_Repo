import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {
  useState,
  useEffect,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
} from 'react';
import { ListBox } from 'primereact/listbox';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import './Formula.css';

interface FormulaProps {
  FormulaDialogVisible: boolean;
}

const Formula: React.FC<FormulaProps> = ({ FormulaDialogVisible }) => {
  const [state, setState] = useState(false);
  const [selectedCity1, setSelectedCity1] = useState<any>(null);
  const [checkToolTip, setCheckToolTip] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setState(FormulaDialogVisible);
  }, [FormulaDialogVisible]);

  const onCityChange = (e: { value: any }) => {
    setSelectedCity1(e.value);
  };
  const handlerCheck = (e: any) => {
    setChecked(!checked);
  };
  const countries = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' },
  ];
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  const countryTemplate = (option: {
    name:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | ReactFragment
      | null
      | undefined;
    code: string;
  }) => {
    return (
      <div className="country-item">
        {/* <img alt={option.name} src="images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} /> */}
        <div>{option.name}</div>
      </div>
    );
  };
  return (
    <div className="formula_Main">
      <Dialog
        header="Formula Properties"
        visible={state}
        style={{ width: '67vw' }}
        position="top"
        onHide={() => setState(false)}
      >
        <p className="formulaMainContent">
          The formula will not be retroactively applied to existing records. To
          apply the formula to existing records you will need to select the
          records and manually update them.
        </p>
        <div className="flex justify-content-between">
          <p>
            Field Label <br />
            <InputText type="text" />
          </p>
          <p>
            Formula Return Type
            <br />
            <InputText type="text" />
          </p>
          <p>
            Number of decimal places
            <br />
            <InputText type="text" />
          </p>
        </div>
        <div className="flex justify-content-between">
          <div>
            <h5>Select Function</h5>
            <Dropdown
              value={selectedCity1}
              options={cities}
              onChange={onCityChange}
              optionLabel="name"
              placeholder="Select a City"
              className="w-12"
            />
            <ListBox
              value={selectedCountries}
              options={countries}
              onChange={(e) => setSelectedCountries(e.value)}
              multiple
              filter
              optionLabel="name"
              itemTemplate={countryTemplate}
              style={{ width: '15rem' }}
              listStyle={{ maxHeight: '220px' }}
            />
          </div>
          <div>
            <h5>Select Field</h5>
            <ListBox
              value={selectedCountries}
              options={countries}
              onChange={(e) => setSelectedCountries(e.value)}
              multiple
              filter
              optionLabel="name"
              itemTemplate={countryTemplate}
              style={{ width: '15rem' }}
              listStyle={{ maxHeight: '250px' }}
            />
          </div>
          <div>
            <h5>Select Operator</h5>
            <ListBox
              value={selectedCountries}
              options={countries}
              onChange={(e) => setSelectedCountries(e.value)}
              multiple
              filter
              optionLabel="name"
              itemTemplate={countryTemplate}
              style={{ width: '15rem' }}
              listStyle={{ maxHeight: '250px' }}
            />
          </div>
        </div>
        <div className="flex justify-content-around mt-3">
          <span>
            <Button label="insert" />
          </span>
          <span>
            <Button label="insert" />
          </span>
          <span>
            <Button label="insert" />
          </span>
        </div>

        <div className="formulaCard mt-3">
          <p>Function Usage :</p>
          <tr>
            Function : <span>Abs</span>
          </tr>
          <tr>
            Description : <span>Returns the absolute value of the number.</span>
          </tr>
          <tr>
            Syntax : <span>Abs(number)</span>
          </tr>
          <tr>
            Example :
            <span>
              Abs(-42) gives result as 42 ; Abs(+33) gives result as 33
            </span>
          </tr>
        </div>
        <div className="mt-3">
          <label>Formula Expression</label>
          <br />
          <textarea rows={4} cols={60}></textarea>
        </div>

        <Button className="mt-2">Check Syntax</Button>
        <br />
        <div className="mt-3">
          <Checkbox
            inputId="binary"
            checked={checked}
            onChange={handlerCheck}
          />
          <label className="ml-1">Show Tooltip</label>{' '}
        </div>
        <div className="currencyProperties_cancel">
          <p className="" onClick={() => setState(!state)}>
            Don't save this field.
          </p>
          <Button label="Done" onClick={() => setState(!state)} />
        </div>
        {checked ? (
          <div>
            {' '}
            <textarea rows={4} cols={60}></textarea>
          </div>
        ) : (
          ''
        )}
      </Dialog>
    </div>
  );
};

export default Formula;
