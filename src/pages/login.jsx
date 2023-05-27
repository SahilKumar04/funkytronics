import { Button } from 'primereact/button';
import React, { useEffect } from 'react';
import { auth } from '../../setup/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const [user, setUser] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();
  const router = useRouter();
  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);

    const user = await axios.get(
      `/api/getUserByUserId?userId=${result.user.uid}`
    );

    if (!user.data) {
      router.push('/create_user');
    } else {
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
