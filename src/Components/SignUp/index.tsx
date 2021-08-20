import { useState } from 'react';

import { LOGIN_OP } from '../../Constants/DefaultValues';
import { EMAIL, PASSWORD } from '../../Constants/ValidatorDefaults';
import { Firebase } from '../../Firebase';
import { Validate } from '../../Helpers/Validators';
import { AuthProps } from '../../Models/AuthModels';
import './SignUp.css';
import Toaster from '../Toaster';
import { toasterType } from '../../Models/ToasterModel';
import { ERROR_CONSTANT, GOOGLE_AUTH_ERROR, INVALID_DETAILS, SIGNUP_ERROR, SIGNUP_SUCCESS, SUCCESS_CONSTANT, TOAST_CONSTANT } from '../../Constants/ToasterContants';
import { callBack } from '../../Helpers/CallBackHelper';

const SignUp = ({ changeOp }: AuthProps) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);

    const setErrorDetails = (message: string) => {
        setToastDetails(ERROR_CONSTANT(message));
        callBack(1, resetToast);
    }

    const resetToast = () => { 
        setToastDetails(TOAST_CONSTANT);
    }

    const handleSignUp = (e: any) => {
        e.preventDefault();
        if(Validate(EMAIL, username) && Validate(PASSWORD, password)) {
            const firebaseapp = new Firebase();
            firebaseapp.signUpWithUsernameAndPass(username, password)
                .then(user => {
                    handleOnSignUpSuccess(firebaseapp);
                })
                .catch(error => {
                    setErrorDetails(SIGNUP_ERROR);
                });
        } else {
            setErrorDetails(INVALID_DETAILS);
        }
    }

    const signInWithGoogle = () => {
        const firebaseapp = new Firebase();
        firebaseapp.signInWithGoogle()
            .then(user => {
                handleOnSignUpSuccess(firebaseapp);
            })
            .catch(error => {
                setErrorDetails(GOOGLE_AUTH_ERROR);
            });
    }

    const handleOnSignUpSuccess = (firebaseapp: any) => {
        setToastDetails(SUCCESS_CONSTANT(SIGNUP_SUCCESS));
        callBack(1, resetToast);
        firebaseapp.sendVerificationEmail().then().catch();
    }

    const showSignIn = () => {
        changeOp(LOGIN_OP);
    }

    return (
        <div>
            <h2>SignUp</h2>
            <p className="loginStatement">SignUp to start chatting</p>
            <form action="" className="signUpForm" onSubmit={handleSignUp}>
                <input type="text" placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}  />
                <button>SignUp</button>
            </form>
            <div className="horzontailLine">
                <div className="line"></div>
                <div>or Sign Up with Google</div> 
                <div className="line"></div>
            </div>
            <div className="googleSignInButton" onClick={signInWithGoogle}>
                <img src="https://img.icons8.com/color/48/000000/google-logo.png"/>
                <i className="fab fa-google fa-3x"></i>
                <p>SignUp with Google</p>
            </div>
            <div className="newuserBox">
                <p>Already a User?</p> 
                <p className="signUpButton" onClick={showSignIn}>SignIn</p>
            </div>
            <Toaster time={1} message={toastDetails.message} type={toastDetails.type as toasterType} showToast={toastDetails.showToast} />
        </div>
    )
}

export default SignUp;