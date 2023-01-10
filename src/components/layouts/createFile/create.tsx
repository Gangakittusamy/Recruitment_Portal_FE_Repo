import { InputSwitch } from 'primereact/inputswitch';
import { Avatar } from 'primereact/avatar';
import Footer from './footer';
import { useState, useRef, useEffect } from 'react';
import noImages from '../../../images/noimage.jpg';
import './create.css';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Sidebar } from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useSelector, useDispatch } from 'react-redux';
import { iteratorSymbol } from 'immer/dist/internal';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';

const UntitleImage = () => {
  const count: any = useSelector((state) => state);
  const [city, setCity] = useState(null);
  const [checked1, setChecked1] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [sidebarimage, setsidebarimage] = useState(false);
  const [selectedCity1, setSelectedCity1] = useState(null);
  const op: any = useRef(null);
  const [previewData, setPreviewData] = useState<any>();

  useEffect(() => {
    setPreviewData(count.dragAndDrop.initialStateDrag);
  }, [count.dragAndDrop.initialStateDrag]);
  const cards = [
    {
      names: 'Secondary email',
      subname: ' Single Line',

      id: 1,
    },
    {
      names: 'Untitled Name',
      subname: ' Single Line',
      id: 2,
    },
    {
      names: 'Untitled Owner',
      subname: ' Single Line',
      id: 3,
    },
    {
      names: 'Email Opt Out',
      subname: ' Email',
      id: 4,
    },
    {
      names: 'Email',
      subname: ' Email',
      id: 5,
    },
    {
      names: 'Created By',
      subname: ' Single Line',
      id: 6,
    },
  ];

  const onCityChange = (e: any) => {
    setSelectedCity1(e.value);
  };
  const cities = [{ name: 'Admistrator', code: 'NY' }];
  const fileUpload = [
    { name: 'Upload File', code: 'NY' },
    { name: 'document', code: 'NY' },
  ];
  function handlerSiebarimage() {
    setsidebarimage(!sidebarimage);
  }
  function handlerClick() {
    {
      Object.keys(previewData || []).map((list: any, i: number) => {
        previewData[list]?.map((item: any, index: number) => {
          {
            item.names === 'Multi-Select'
              ? setSidebar(false)
              : setSidebar(true);
          }
        });
      });
    }
  }
  const handletoggle = (e: any) => {
    setChecked1(!checked1);
  };
  return (
    <div>
      <div className="untitlee">
        <div className="boder">
          <span>
            Untitle image{' '}
            <InputSwitch checked={checked1} onChange={handletoggle} />
            <br />
            {checked1}
            {checked1 ? (
              <div>
                <span className="mr-2 mt-2">
                  <img
                    src={noImages}
                    style={{ width: ' 96px', height: '74px' }}
                    className="mt-2"
                  ></img>
                </span>
                <span className="ellips" onClick={(e) => op.current.toggle(e)}>
                  <span>
                    <i className="pi pi-ellipsis-h mr-2"></i>
                  </span>
                </span>
              </div>
            ) : (
              ''
            )}
            <div>
              {/* <Avatar icon="pi pi-user mr-3" size="xlarge" className="p-overlay-badge"/> */}
            </div>
          </span>
        </div>
        <div className="preview" onClick={handlerClick}>
          preview
        </div>
      </div>
      <Sidebar
        visible={sidebarimage}
        position="top"
        style={{ width: '55vw', height: '20vw' }}
        onHide={() => setsidebarimage(!sidebarimage)}
      >
        <div className="mt-6">
          <span className="text-2xl font-bold fixed top-0 mt-3">
            Set Permission
          </span>
          <div className="flex justify-content-around">
            <label>Profiles</label>
            <label htmlFor="Read and Write  All">Read and Write All</label>
            <label htmlFor="Read Only  All">Read Only All</label>
            <label htmlFor="Do not Show  All">Do not Show All</label>
          </div>
          <hr />
          <div className="setpermissionRadio">
            <span>Administrator</span>
            <span className="mr-6">
              <RadioButton
                inputId="Read and Write  All"
                name="city"
                value="Read and Write  All"
                onChange={(e) => setCity(e.value)}
                checked={city === 'Read and Write  All'}
              />
            </span>
            <span className="mr-7">
              <RadioButton
                inputId="Read Only  All"
                name="city"
                value="Read Only  All"
                onChange={(e) => setCity(e.value)}
                checked={city === 'Read Only  All'}
              />
            </span>
            <span>
              <RadioButton
                inputId="Do not Show  All"
                name="city"
                value="Do not Show  All"
                onChange={(e) => setCity(e.value)}
                checked={city === 'Do not Show  All'}
              />
            </span>
          </div>
          <div className="flex justify-content-end mt-4 gap mr-4">
            <button className="buttonStyle ml-8 mt-1"> Cancel </button>
            <Button label="Save" />
          </div>
        </div>
      </Sidebar>
      <Sidebar
        visible={sidebar}
        position="top"
        style={{ width: '92vw', height: '50vw' }}
        onHide={() => setSidebar(!sidebar)}
      >
        <div>
          <div className="flex  justify-content-center">
            <div className="dropdownBorderStyle">
              <span className="flex">
                Preview layout as
                <Dropdown
                  className="ml-2"
                  value={selectedCity1}
                  options={cities}
                  onChange={onCityChange}
                  optionLabel="name"
                  placeholder="Select a City"
                />
              </span>
            </div>
          </div>
          <div className="border-black-alpha-30 border-1 pb-7">
            <span className="contactName ">Create Untitled</span>
            <span className="contactuntitle">Untitled Image</span>

            <span className="ml-5">
              <img
                src={noImages}
                style={{ width: ' 56px', height: '50px' }}
              ></img>
            </span>
            <span className="contactuntitle">Untitled Information</span>
            <div>
              <div>
                {Object.keys(previewData || []).map((list: any, i: number) => {
                  return (
                    <div key={i} className="previewCardAligment">
                      {previewData[list]?.map((item: any, index: number) => {
                        return (
                          <div key={index}>
                            <div className="card border-0 mt-3 ml-7">
                              <div className="names">
                                <p className="grey">{item.subName}</p>
                                {item.names === 'Untitled Owner' ? (
                                  <span className="p-input-icon-right ">
                                    <i className="pi pi-lock mt-0" />
                                    <InputText
                                      className="mt-3"
                                      value={'john'}
                                      disabled
                                    />
                                  </span>
                                ) : item.names === 'Lookup' ? (
                                  <span className="p-input-icon-right ">
                                    <i className="pi pi-euro mt-0" />
                                    <InputText className="mt-3" disabled />
                                  </span>
                                ) : item.names === 'Currency' ? (
                                  <span className="p-input-icon-left">
                                    <i className="pi pi-dollar mt-0" />
                                    <InputText className="mt-3 " />
                                  </span>
                                ) : item.names === 'Percent' ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === 'Untitled Name' ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === 'Created By' ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === 'Secondary Email' ? (
                                  <p>
                                    <InputText disabled />
                                  </p>
                                ) : item.names === 'Image Upload' ? (
                                  <p>
                                    <Button
                                      label="+ New Image"
                                      className="bg-blue-100 text-primary"
                                    />
                                  </p>
                                ) : item.names === 'Email' ? (
                                  <p>
                                    <InputText placeholder="Enter your email" />
                                  </p>
                                ) : item.names === 'File Upload' ? (
                                  <p>
                                    <Dropdown
                                      className="mr-6"
                                      value={selectedCity1}
                                      options={fileUpload}
                                      onChange={onCityChange}
                                      optionLabel="name"
                                      style={{ width: '99%' }}
                                      placeholder="Select a file"
                                    />
                                  </p>
                                ) : item.names === 'Email Opt Out' ? (
                                  <p>
                                    <Checkbox />
                                  </p>
                                ) : item.names === 'Modified By' ? (
                                  <p>
                                    <InputText disabled />
                                  </p>
                                ) : item.names === 'Date/Time' ? (
                                  <p>
                                    <Calendar
                                      showTime
                                      showSeconds
                                      placeholder="Enter the date"
                                    />
                                  </p>
                                ) : item.names === 'Decimal' ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === 'URL' ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === 'Multi-Line' ? (
                                  <p>
                                    <InputTextarea />
                                  </p>
                                ) : item.names === 'Date' ? (
                                  <p>
                                    <Calendar placeholder="DD/MM/YY   " />
                                  </p>
                                ) : item.names === 'Checkbox' ? (
                                  <span className="p-input-icon-right ">
                                    <Checkbox
                                      style={{
                                        position: 'relative',
                                        left: '30px',
                                        bottom: '4px',
                                      }}
                                    />
                                    <InputText className="mt-3" />
                                  </span>
                                ) : item.names === 'Phone' ? (
                                  <p>
                                    {' '}
                                    <InputMask
                                      id="phone"
                                      mask="99-99-99-99-99"
                                      placeholder="(999) 999-9999"
                                    ></InputMask>
                                  </p>
                                ) : item.names === 'Long integer' ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === 'Number' ? (
                                  <p>
                                    <InputText />
                                  </p>
                                ) : item.names === 'User' ? (
                                  <span className="p-input-icon-right ">
                                    <Dropdown
                                      className="mr-6"
                                      value={selectedCity1}
                                      options={cities}
                                      onChange={onCityChange}
                                      optionLabel="name"
                                      style={{ width: '99%' }}
                                      placeholder="Select a City"
                                    />
                                  </span>
                                ) : (
                                  <input
                                    type="text"
                                    name="names"
                                    value={item.names}
                                    onChange={(e) => {}}
                                    className="h-2rem my-auto"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
      <OverlayPanel ref={op}>
        <div>
          <span className="options" onClick={handlerSiebarimage}>
            Set Permisson
          </span>
        </div>
      </OverlayPanel>
      <div>
        <Footer cards={cards} />
      </div>
    </div>
  );
};

export default UntitleImage;
