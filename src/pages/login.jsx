import { Button } from 'primereact/button';
import React, { useEffect } from 'react';
import { auth } from '../../setup/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setAddress, setEmail, setGender, setName, setUserId, setAge } from '@/store/userSlice';

const Login = () => {
  const [user, setUser] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const router = useRouter();
  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);

    let user = await axios.get(
      `/api/getUserByUserId?userId=${result.user.uid}`
    );

    user = user.data;
    if (!user) {
      router.push('/create_user');
    } else {
      dispatch(setName(user.name))
      dispatch(setEmail(user.email))
      dispatch(setGender(user.gender))
      dispatch(setAge(user.age))
      dispatch(setUserId(result.user.uid))
      dispatch(setAddress(user.address))
      router.push('/');
    }
  };
  useEffect(() => {}, [user]);
  return (
    <div>
      <Button onClick={login}>Login with Google</Button>
    </div>
  );
};

export default Login;
