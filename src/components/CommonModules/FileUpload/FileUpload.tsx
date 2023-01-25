import { Dialog } from 'primereact/dialog';
import { useState, useEffect, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';

interface PickListProps {
  FileUploadVisible: boolean;
}
const FileUploadDemo: React.FC<PickListProps> = ({ FileUploadVisible }) => {
  const [state, setState] = useState(false);
  const toast: any = useRef(null);
  const fileUploadRef = useRef(null);
  useEffect(() => {
    setState(FileUploadVisible);
  }, [FileUploadVisible]);
  const onUpload = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
  };

  return (
    <div>
      <Dialog
        header="File Upload"
        visible={state}
        style={{ width: '70vw' }}
        position="top"
        onHide={() => setState(false)}
      >
        <div>
          <Toast ref={toast} />
          <h5>File Upload</h5>
          <FileUpload
            name="demo[]"
            url="https://primefaces.org/primereact/showcase/upload.php"
            onUpload={onUpload}
            multiple
            accept=""
            maxFileSize={1000000}
            emptyTemplate={
              <p className="m-7">Drag and drop files to here to upload.</p>
            }
          />
        </div>
      </Dialog>
    </div>
  );
};

export default FileUploadDemo;
