import { Button } from 'primereact/button';
import React, { useEffect } from 'react';
import { auth } from '../../setup/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';

const Login = () => {
    const [user, setUser] = useAuthState(auth);
    const googleAuth = new GoogleAuthProvider();
    const login = async () => {
        const result = await signInWithPopup(auth, googleAuth);
        console.log(result);
    }

    useEffect(() => {
    }, [user])
    return (
        <div>
            <Button onClick={login}>Login with Google</Button>
            <br/>
            {user? `Welcome ${user.displayName}`: ""}
        </div>
    )
}

export default Login;