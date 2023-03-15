import "./analytics.css";
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import AddChart from './addChart';

const Analytics = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDig, setOpenDig] = useState(false);

  const goToAddChart = () => {
    console.log('add chart')
  }

  return (
    <div>
      <div style={{ background: "gainsboro", height: "100vh", width: "200px", padding: "20px" }}>
        <div className="text-xl font-semibold">Components</div>
        <div onClick={(evt) => setOpenDialog(!openDialog)} className="Left_Bar flex align-items-center justify-content-center mt-4 cursor-pointer" style={{
          paddingRight: '30px', width: '100%'
        }}>
          <div><i className="pi pi-chart-bar mr-3" />Chart</div>
        </div>
      </div>
      <div></div>
      {openDig && <AddChart closeDig={()=>{
        debugger;
        setOpenDig(false)
      }}></AddChart>}
      <Dialog
        header="Add chart"
        visible={openDialog}
        style={{ width: '34vw' }}
        position="top"
        onHide={() => setOpenDialog(false)}
      >
        <div className="flex align-items-center justify-content-center">
          <div onClick={(evt) => setOpenDig(true)} className="Quick_Chart_box flex align-items-center justify-content-center">
            <div style={{ textAlign: "center" }}>
              <i className="pi pi-chart-bar" style={{ fontSize: '1.5rem' }} />
              <div className="Quick_Chart_title mt-2">Quick chart</div>
              <div className="mt-1">Create charts instantly</div>
            </div>
          </div>
          <div className="Quick_Chart_box flex align-items-center justify-content-center ml-4">
            <div style={{ textAlign: "center" }}>
              <i className="pi pi-book" style={{ fontSize: '1.5rem' }} />
              <div className="Quick_Chart_title mt-2">From Reports</div>
              <div className="mt-1">Get from existing reports</div>
            </div>
          </div>
        </div>
      </Dialog>
    </div >
  );
};
export default Analytics;
