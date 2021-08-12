import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import firebase from "firebase";

import { Firebase } from '../../Firebase';
import { SIGNUP_OP } from '../../Constants/DefaultValues';
import { ERROR_CONSTANT, TOAST_CONSTANT, AUTH_ERROR, INVALID_DETAILS, AUTH_SUCCESS, SUCCESS_CONSTANT, WARNING_CONSTANT, VERIFY_YOUR_MAIL, GOOGLE_AUTH_ERROR } from '../../Constants/ToasterContants';
import { AuthProps } from '../../Models/AuthModels';
import { toasterType } from '../../Models/ToasterModel';
import Toaster from '../Toaster';

import './Login.css';
import { Validate } from '../../Helpers/Validators';
import { EMAIL, PASSWORD } from '../../Constants/ValidatorDefaults';
import { callBack, uidExtractor } from '../../Helpers/CallBackHelper';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';

const Login = ({ changeOp }: AuthProps) => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [currentUser, setCurrentUser] = useState({} as firebase.UserInfo);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);

    const history = useHistory();

    useEffect(() => {
        if(isUserLoggedIn) {
            setToastDetails(SUCCESS_CONSTANT(AUTH_SUCCESS));
            callBack(0.5, successHandler);
        }
    }, [isUserLoggedIn])

    const successHandler = () => {
        const userDetails = new FirebaseUser();
        if(currentUser) {
            userDetails.getUserDetails(uidExtractor(currentUser.email || ''))
            .then((userData: any) => {
                if(userData.name) {
                    history.push("/Chatter/chat");
                } else {
                    history.push("/Chatter/details");
                }
            }).catch(error => {
                history.push("/Chatter/details");
            })
        } else {
            setCurrentUser({} as firebase.UserInfo);
            setIsUserLoggedIn(false);
        }
        
    }

    const setErrorDetails = (message: string) => {
        setToastDetails(ERROR_CONSTANT(message));
        callBack(1, resetToast);
    }

    const setWarnDetails = (message: string) => {
        setToastDetails(WARNING_CONSTANT(message));
        callBack(1, resetToast);
    }

    const resetToast = () => { 
        setToastDetails(TOAST_CONSTANT);
    }

    const handleLogin = (e: any) => {
        e.preventDefault();
        if(Validate(EMAIL, username) && Validate(PASSWORD, password)) {
            const firebaseapp = new Firebase();
            firebaseapp.usernameWithPassSignIn(username, password)
                .then(user => {
                    onSignInSuccess(user, firebaseapp);
                })
                .catch(error => {
                    setErrorDetails(AUTH_ERROR);
                });
        } else {
            setErrorDetails(INVALID_DETAILS);
        }
    }

    const signInWithGoogle = () => {
        const firebaseapp = new Firebase();
        firebaseapp.signInWithGoogle()
            .then(user => {
                onSignInSuccess(user, firebaseapp);
            })
            .catch(error => {
                setErrorDetails(GOOGLE_AUTH_ERROR);
            });
    }

    const onSignInSuccess = (user: firebase.auth.UserCredential, firebaseapp: any) => {
        setCurrentUser(user.user as firebase.UserInfo);
        if(user?.user?.emailVerified) {
            setIsUserLoggedIn(true);
            return;
        }
        setWarnDetails(VERIFY_YOUR_MAIL);
        firebaseapp.signOut().then().catch();
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
            <div className="googleSignInButton" onClick={signInWithGoogle}>
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