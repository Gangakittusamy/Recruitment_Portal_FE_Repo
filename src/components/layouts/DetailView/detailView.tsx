import { InputSwitch } from 'primereact/inputswitch';
import './detailView.css';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
const DetailView = () => {
  const op: any = useRef(null);
  const [checked1, setChecked1] = useState(true);
  const [Multiselect, setMultiselect] = useState<any>([]);
  const onCityChange = (e: any) => {
    let selectedCities: any[] = [];
    selectedCities = [...Multiselect];

    if (e.checked) selectedCities.push(e.value);
    else selectedCities.splice(selectedCities.indexOf(e.value), 1);

    setMultiselect(selectedCities);
  };
  const cards = [
    {
      names: 'Untitled Owner',
      subName: 'Look Up',

      id: 1,
    },
    {
      names: 'Modified By',
      subName: 'Single line',
      id: 2,
    },
    {
      names: 'Email',
      subName: 'Email',
      id: 2,
    },
  ];

  const Attachments = [
    {
      names: 'File Name',

      id: 1,
    },
    {
      names: 'Attached By',

      id: 2,
    },
    {
      names: 'Date Added',

      id: 2,
    },
    {
      names: 'Size',

      id: 2,
    },
  ];

  const checklist = [
    {
      names: 'Checklist details',

      id: 1,
    },
    {
      names: 'Completed by',

      id: 2,
    },
  ];
  const Emails = [
    {
      names: 'Received By',

      id: 1,
    },
    {
      names: 'Subject',

      id: 2,
    },
    {
      names: 'Owned By',

      id: 3,
    },
    {
      names: 'Date',

      id: 4,
    },
    {
      names: 'Sent By',

      id: 5,
    },
    {
      names: 'Source',

      id: 6,
    },

    {
      names: 'Status',

      id: 8,
    },
  ];
  return (
    <div>
      <div className="TextOne">
        <span>
          BUSINESS CARD{' '}
          <InputSwitch
            checked={checked1}
            onChange={(e) => setChecked1(e.value)}
          />
        </span>
        {checked1 ? (
          <span
            className="customize cursor-pointer"
            onClick={(e) => op.current.toggle(e)}
          >
            Customize
          </span>
        ) : (
          ''
        )}
      </div>
      {checked1 ? (
        <div>
          {cards.map((button) => (
            <div className="cardQuick">
              <span className="namesQuick">
                {button.names}
                <span className="subName">{button.subName}</span>
              </span>
            </div>
          ))}
          <span className="TextOne">
            {/* <i className="pi pi-info-circle"></i> */}
            You can add up to 5 fields to your Business Card.
          </span>
        </div>
      ) : (
        <span className="falseText">
          Business Card cannot be customized as it is hidden.
          <br />
          Turn it on to customize the fields to be shown in details page.
        </span>
      )}
      <br />
      <div>
        {' '}
        <span className="TextOne">DETAILS</span>
        <br />
        <span className="supportLine">
          Fields customized in the Create page will appear here.
        </span>
      </div>
      <br />
      <span className="TextOne">RELATED LIST</span>
      <br />
      <br />
      <div>
        <div className="hoverborder">
          <span className="TextOne ">
            <b>Notes</b>
          </span>
          <br />
          <span className="supportLine">This List cannot be customized..</span>
        </div>
      </div>
      <div className="hoverborder top-margin">
        <span className="TextOne ">
          <b>Attachments</b>
        </span>
        <br />
        <div className="supportCard">
          {Attachments.map((list) => (
            <div>
              <span className="namesDetail">{list.names} </span>
            </div>
          ))}
        </div>
      </div>
      <div className="hoverborder top-margin">
        <span className="TextOne">
          <b>Emails</b>
        </span>
        <br />
        <div className="supportCard">
          {Emails.map((list) => (
            <div>
              <span className="namesDetail">{list.names} </span>
            </div>
          ))}
        </div>
      </div>

      <div className="hoverborder top-margin">
        <span className="Texttwo ">
          <b>Open Activities</b>
          <span
            className="customizeStyle"
            onClick={(e) => op.current.toggle(e)}
          >
            customise
          </span>
        </span>
        <br />
        <span className="TextOne">This List preview cannot be shown</span>
      </div>

      <div className="hoverborder top-margin">
        <span className="Texttwo">
          <b>Closed Activitie</b>
          <span
            className="customizeStyle"
            onClick={(e) => op.current.toggle(e)}
          >
            customise
          </span>
        </span>
        <br />
        <span className="TextOne">This List preview cannot be shown</span>
      </div>
      <br />
      <div className="hoverborder top-margin">
        <span className="TextOne ">
          <b>Checklists</b>
        </span>
        <br />
        <div className="supportCard">
          {checklist.map((list) => (
            <div>
              <span className="namesDetail">{list.names} </span>
            </div>
          ))}
        </div>
      </div>
      <OverlayPanel
        ref={op}
        style={{ width: '240px' }}
        className="overlaypanel-demo"
      >
        <div>
          <span className="p-input-icon-left">
            {/* <i className="pi pi-search" /> */}
            <InputText placeholder="Search" />
          </span>
          <br />
          <div className="field-checkbox mt-5">
            <Checkbox
              value="Email"
              onChange={onCityChange}
              checked={Multiselect.indexOf('Email') !== -1}
            />
            <label>Email</label>
          </div>
          <div className="field-checkbox">
            <Checkbox
              name="Created By"
              value="Created By"
              onChange={onCityChange}
              checked={Multiselect.indexOf('Created By') !== -1}
            />
            <label>Created By</label>
          </div>
          <div className="field-checkbox">
            <Checkbox
              name="city"
              value="Secondary Email"
              onChange={onCityChange}
              checked={Multiselect.indexOf('Secondary Email') !== -1}
            />
            <label>Secondary Email</label>
          </div>
          <div className="field-checkbox">
            <Checkbox
              value="Untitled Owner"
              onChange={onCityChange}
              checked={Multiselect.indexOf('Untitled Owner') !== -1}
            />
            <label>Untitled Owner</label>
          </div>
          <div className="field-checkbox">
            <Checkbox
              value="Modified By"
              onChange={onCityChange}
              checked={Multiselect.indexOf('Modified By') !== -1}
            />
            <label>Modified By</label>
          </div>
          <div className="field-checkbox">
            <Checkbox
              value="Email Opt Out"
              onChange={onCityChange}
              checked={Multiselect.indexOf('Email Opt Out') !== -1}
            />
            <label>Email Opt Out</label>
          </div>
          <br />

          <div className="flex justify-content-center borderCard">
            <Button label="Done" style={{ height: '38px' }} />
            <button className="buttonStyle " style={{ height: '38px' }}>
              {' '}
              Cancel{' '}
            </button>
          </div>
        </div>
      </OverlayPanel>
    </div>
  );
};

export default DetailView;
