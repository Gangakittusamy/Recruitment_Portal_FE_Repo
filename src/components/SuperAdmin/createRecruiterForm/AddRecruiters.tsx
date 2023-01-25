import './createRecruiterForm.css';
import React, { useState, useEffect, useRef } from 'react';
import noavathar from '../../../images/Group.png';
import { Button } from 'primereact/button';
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
const AddRecruiters = (props: any) => {
  const formatDate = (data: any) => Moment(data).format('DD-MM-YYYY');
  const navigate = useNavigate();

  var Username = props.Username;
  var Designation = props.Designation;
  var Gender = props.Gender;
  var Birth = props.Birth;
  var email = props.Email;
  var Phone = props.Phone;
  const toast: any = useRef(null);
  const onBasicUpload = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Auto Mode',
    });
  };
  const cards = [
    {
      names: 'Full Name',
      subname: Username,
      id: 1,
    },
    {
      names: 'Designation',
      subname: Designation,
      id: 2,
    },
    {
      names: 'Date of Birth',
      subname: formatDate(Birth),
      id: 3,
    },
    {
      names: 'Gender',
      subname: Gender,
      id: 4,
    },
    {
      names: 'Phone number',
      subname: Phone,
      id: 5,
    },
    {
      names: 'Email Address',
      subname: email,
      id: 6,
    },
  ];

  return (
    <div>
      <Toast ref={toast}></Toast>
      <span className="flex justify-content-between p-2">
        <span className="text-xl ml-3">Add Recruiters</span>{' '}
        <span className="mr-2">
          <Button
            label="Exit"
            style={{ background: '#3E7EFF' }}
            onClick={(e: any) => props.handleClick()}
          />
        </span>
      </span>
      <div>
        <div className="flex align-items-center ml-7">
          <span className="ml-4 ">
            {' '}
            <img src={noavathar} style={{ width: '110px' }}></img>
          </span>
          <span className="ml-3 mt-1">
            <FileUpload
              mode="basic"
              name="demo[]"
              url="https://primefaces.org/primereact/showcase/upload.php"
              accept="image/*"
              maxFileSize={1000000}
              onUpload={onBasicUpload}
              chooseLabel="Upload"
            />
          </span>
        </div>
      </div>
      <div className="ml-8 mt-3">
        <div className=" RequirtersGrid">
          {cards.map((list: any) => {
            return (
              <div className=" px-2 backgroundStyle p-2 ">
                {' '}
                <div className="ml-3">
                  <span className="mt-2 " style={{ color: '#8083A3' }}>
                    {list.names}
                  </span>
                  <br />
                  <span className=" flex text-800" style={{ color: '#171721' }}>
                    {list.subname}
                  </span>
                </div>
              </div>
            );
          })}
          {/* <InputText placeholder='User Name' /> */}
        </div>
      </div>
      <div className="ButtonsEnd mb-2">
        <button className="buttonStyle ml-8 " style={{ height: '41px' }}>
          {' '}
          Cancel{' '}
        </button>

        <Button label="Save" />
      </div>
    </div>
  );
};

export default React.memo(AddRecruiters);
