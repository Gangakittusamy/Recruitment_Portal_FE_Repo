import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { signUp } from '../../features/Auth/signIn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signUpPageValue } from '../../features/Auth/signIn';

export default function OrganizationSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [payload, setPayload] = useState<any>();

  const { signUpPage } = useSelector((store: any) => store.signIn);

  const handleChange = (e: any, setValue: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    let value = {
      fullname: fullName,
      email: email,
      password: password,
    };
    e.preventDefault();

    setPayload(value);

    let res = axios.post('http://localhost:800/user/signup', payload);
    // navigate("/navbar");

    dispatch(signUpPageValue(value));

    // dispatch(signUp(payload));
  };

  return (
    <div>
      <h1>Hello!</h1>
      <h3>Sign Up To Get Started</h3>
      {/* <InputText
        value={fullName}
        onChange={(e: any) => handleChange(e, setFullName)}
      />
      <InputText
        value={email}
        onChange={(e: any) => handleChange(e, setEmail)}
        type="email"
      />
      <InputText
        value={password}
        onChange={(e: any) => handleChange(e, setPassword)}
        type="password"
      /> */}

      <form onSubmit={handleSubmit} className="p-fluid">
        <div className="field">
          <span className="p-float-label">
            <InputText
              id="name"
              name="name"
              value={fullName}
              onChange={(e: any) => handleChange(e, setFullName)}
              autoFocus
            />
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputText
              id="name"
              name="name"
              value={email}
              onChange={(e: any) => handleChange(e, setEmail)}
              autoFocus
            />
          </span>
        </div>

        <div className="field">
          <span className="p-float-label">
            <Password
              id="password"
              name="password"
              value={password}
              onChange={(e: any) => handleChange(e, setPassword)}
              toggleMask
            />
          </span>
        </div>

        <Button type="submit" label="Submit" className="mt-2" />
      </form>
    </div>
  );
}
