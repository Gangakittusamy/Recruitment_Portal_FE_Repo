
import { Tree } from 'primereact/tree';
import { useAppDispatch } from "../../../app/hooks";
import { Accordion, AccordionTab } from 'primereact/accordion';
import React, { useEffect, useState,useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from "react-router-dom";
import { Checkbox } from 'primereact/checkbox';
const TablePageSideBar = (props: any) => {
     const [value3, setValue3] = useState('');
    const [cities, setCities] = useState<any>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 
  const onCityChange = (e: { value: any, checked: boolean }) => {
     let selectedCities = [...cities];

     if (e.checked)
         selectedCities.push(e.value);
     else
         selectedCities.splice(selectedCities.indexOf(e.value), 1);

     setCities(selectedCities);
 }
  return (
    <div className="">
      <section>
          <div>
               <div className="ml-3 text-xl font-semibold">Filter{props.GetName} By </div>
               <span className="p-input-icon-left ml-3 m-3">
                    <i className="pi pi-search" />
                    <InputText value={value3} onChange={(e) => setValue3(e.target.value)} placeholder="Search" />
                </span>
                <div>
            <div>
            <Accordion className="accordion-custom" activeIndex={0}>
                    <AccordionTab header={<React.Fragment><i className="pi pi-calendar"></i><span>System Defined Filters</span></React.Fragment>}>
                    <div className="field-checkbox">
                    <Checkbox inputId="city1" name="city" value="Touched Records" onChange={onCityChange} checked={cities.indexOf('Touched Records') !== -1} />
                    <label htmlFor="city1">Touched Records</label>
                </div>

                <div className="field-checkbox">
                    <Checkbox inputId="city2" name="city" value="Untouched Records" onChange={onCityChange} checked={cities.indexOf('Untouched Records') !== -1} />
                    <label htmlFor="city2">Untouched Records</label>
                </div>
                <div className="field-checkbox">
                    <Checkbox inputId="city3" name="city" value="New York" onChange={onCityChange} checked={cities.indexOf('New York') !== -1} />
                    <label htmlFor="city3">Record Action</label>
                </div>
                <div className="field-checkbox">
                    <Checkbox inputId="city4" name="city" value="San Francisco" onChange={onCityChange} checked={cities.indexOf('San Francisco') !== -1} />
                    <label htmlFor="city4">Related Records Action</label>
                </div>
                    </AccordionTab>
                    <AccordionTab header={<React.Fragment><i className="pi pi-user"></i><span>Filter By Fields</span></React.Fragment>}>
                    <div className="field-checkbox">
                    <Checkbox inputId="city1" name="city" value="Touched Records" onChange={onCityChange} checked={cities.indexOf('Touched Records') !== -1} />
                    <label htmlFor="city1">Touched Records</label>
                </div>

                <div className="field-checkbox">
                    <Checkbox inputId="city2" name="city" value="Untouched Records" onChange={onCityChange} checked={cities.indexOf('Untouched Records') !== -1} />
                    <label htmlFor="city2">Untouched Records</label>
                </div>
                <div className="field-checkbox">
                    <Checkbox inputId="city3" name="city" value="New York" onChange={onCityChange} checked={cities.indexOf('New York') !== -1} />
                    <label htmlFor="city3">Record Action</label>
                </div>
                <div className="field-checkbox">
                    <Checkbox inputId="city4" name="city" value="San Francisco" onChange={onCityChange} checked={cities.indexOf('San Francisco') !== -1} />
                    <label htmlFor="city4">Related Records Action</label>
                </div>
                    </AccordionTab>
                    {/* <AccordionTab header={<React.Fragment><i className="pi pi-search"></i><span>Header III</span><i className="pi pi-cog"></i></React.Fragment>}>
                       
                    </AccordionTab> */}
                </Accordion>
            </div>
        </div>
          </div>
      </section>
    </div>
  );
};
export default TablePageSideBar;
