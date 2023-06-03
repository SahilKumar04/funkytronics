import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../../setup/firebase';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../flags.css'
const CreateUser = () => {
  const [addressLine, setAddressLine] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [pinCode, setPinCode] = useState(null);
  const [country, setcountry] = useState('India');
  const [user, setUser] = useAuthState(auth);
  const usr = useSelector((state) => state.user)

  const handleSubmit = async () => {
    const address = {
      addressLine: addressLine,
      city: city,
      state: state,
      country: country,
      pinCode: pinCode,
    }

    try {
      await axios.patch(`/api/updateUser?uid=${usr.uid}`, {address});
      alert('successfully added address');
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div
      className="card flex flex-column gap-3 items-center"
      style={{ maxWidth: '50vw', margin: 'auto', marginTop: '2rem' }}
    >
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <InputText placeholder="addressLine" onChange={(e) => setAddressLine(e.target.value)} />
      </div>

      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-phone"></i>
        </span>
        <InputText placeholder="city" onChange={(e) => setCity(e.target.value)} />
      </div>

      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-phone"></i>
        </span>
        <InputText placeholder="state" onChange={(e) => setState(e.target.value)} />
      </div>
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-phone"></i>
        </span>
        <InputText placeholder="pinCode" onChange={(e) => setPinCode(e.target.value)} />
      </div>
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
        <img alt='india' src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-in`} style={{ width: '18px' }} />
        </span>
        <InputText placeholder="country" value={country} disabled onChange={(e) => setcountry(e.target.value)} />
      </div>

      <div className="p-inputgroup flex-1">
        <Button raised outlined label="Submit" icon="pi pi-check" iconPos="right" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateUser;
