import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Slider } from 'primereact/slider';
import { Button } from 'primereact/button';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../../setup/firebase';
import axios from 'axios';

const CreateUser = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [age, setAge] = useState(21);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [user, setUser] = useAuthState(auth);

  const genders = [
    { name: 'Male', icon: 'pi pi-user-plus' },
    { name: 'Female', icon: 'pi pi-user-minus' },
  ];

  const selectedGenderTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center gap-3">
          <i className={`${option.icon}`}></i>
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const gengerOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-3">
        <i className={`${option.icon}`}></i>
        <div>{option.name}</div>
      </div>
    );
  };

  const panelFooterTemplate = () => {
    return (
      <div className="py-2 px-3">
        {selectedGender ? (
          <span>
            <b>{selectedGender.name}</b> selected.
          </span>
        ) : (
          'No gender selected.'
        )}
      </div>
    );
  };

  const handleSubmit = async () => {
    const usr = {
      userId: user.uid,
      gender: selectedGender.name,
      age: age,
      name: userName,
      email: email,
      phoneNumber: phone
    }
    try {
      await axios.post(`/api/createUser`, usr);
      alert('successfully created user');
    } catch (error) {
      alert(error.message);
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
        <InputText placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
      </div>

      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-phone"></i>
        </span>
        <InputNumber placeholder="Phone Number" onChange={(e) => setPhone(e.value)} useGrouping={false} min={1111111111} max={9999999999} />
      </div>

      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user-edit"></i>
        </span>
        <Dropdown
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.value)}
          options={genders}
          optionLabel="name"
          placeholder="Select a Gender"
          valueTemplate={selectedGenderTemplate}
          itemTemplate={gengerOptionTemplate}
          className="w-full md:w-14rem"
          panelFooterTemplate={panelFooterTemplate}
        />
      </div>

      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">Age</span>
        <div className="card flex flex-column justify-content-center">
          <InputText
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full"
            min={18}
            disabled
          />
          <Slider
            value={age}
            onChange={(e) => setAge(e.value)}
            className="w-full"
            min={18}
            max={60}
          />
        </div>
      </div>

      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-envelope"></i>
        </span>
        <InputText type="email" placeholder="Email Id" onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="p-inputgroup flex-1">
        <Button raised outlined label="Submit" icon="pi pi-check" iconPos="right" onClick={() => handleSubmit()} />
      </div>
    </div>
  );
};

export default CreateUser;
