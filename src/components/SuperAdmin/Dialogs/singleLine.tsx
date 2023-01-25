import { Dialog } from 'primereact/dialog';
import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
interface SingleLineProps {
     SingleLineDialogVisible: boolean;
   }
const SingleLine: React.FC<SingleLineProps> = ({ SingleLineDialogVisible }) =>{
     const [state, setState] = useState(false);
     useEffect(() => {
          setState(SingleLineDialogVisible);
        }, [SingleLineDialogVisible]);
return(
     <div>
<Dialog
        header="Single Line "
        visible={state}
        style={{ width: '35vw' }}
        position="top"
        onHide={() => setState(false)}
      >
          <div><InputText placeholder='Single Line' className='w-12'/></div>
      </Dialog>
</div>
)
}
export default SingleLine;