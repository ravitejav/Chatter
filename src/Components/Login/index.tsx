import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { Firebase } from '../../Firebase';
import { SIGNUP_OP } from '../../Constants/DefaultValues';
import { ERROR_CONSTANT, TOAST_CONSTANT, AUTH_ERROR } from '../../Constants/ToasterContants';
import { AuthProps } from '../../Models/AuthModels';
import { toasterType } from '../../Models/ToasterModel';
import Toaster from '../Toaster';

import './Login.css';

const Login = ({ changeOp }: AuthProps) => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);

    const history = useHistory();

    useEffect(() => {
        if(isUserLoggedIn) {
            history.push("/Chatter/chat");
        }
    }, [isUserLoggedIn])

    const handleLogin = (e: any) => {
        e.preventDefault();
        if(username !== "" && password !== "") {
            const firebaseapp = new Firebase();
            firebaseapp.googleSignIn(username, password)
                .then(user => {
                    setIsUserLoggedIn(true);
                })
                .catch(error => {
                    console.log(error)
                    setToastDetails(ERROR_CONSTANT(AUTH_ERROR))
                });
        }
    }

    const showSignUp = () => {
        changeOp(SIGNUP_OP);
    }

    return (
        <div>
            <h2>SignIN</h2>
            <p className="loginStatement">Login to access your chats</p>
            <form action="" className="loginForm" onSubmit={handleLogin}>
                <input type="text" placeholder="Email" onChange={(e) => setUserName(e.target.value)} />
                <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}  />
                <button>Login</button>
            </form>
            <div className="horzontailLine">
                <div className="line"></div>
                <div>or Sign In with Google</div> 
                <div className="line"></div>
            </div>
            <div className="googleSignInButton">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png"/>
                <i className="fab fa-google fa-3x"></i>
                <p>SignIn with Google</p>
            </div>
            <div className="newuserBox">
                <p>New user?</p> 
                <p className="signUpButton" onClick={showSignUp}>SignUp</p>
            </div>
            <Toaster time={1} message={toastDetails.message} type={toastDetails.type as toasterType} showToast={toastDetails.showToast} />
        </div>
    )
};

export default Login;