import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import CreateForm from "../createForm/index"
const ModuleScreen = (props:any) =>{
     const [value3, setValue3] = useState('');
     
     const navigate = useNavigate();
     const NextPage = ()=>{
          navigate('/super-admin') 
          props.handleClick(11)
     }
return(
     <div>
          {}
          <div className='flex justify-content-between'>
          <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={value3} onChange={(e) => setValue3(e.target.value)} placeholder="Search" />
                </span>
                <span>
                    
               <Button label='New module' icon="pi pi-plus" onClick={() =>NextPage() }
               
               
               />
                </span>
                </div>
     </div>
)
}
export default ModuleScreen