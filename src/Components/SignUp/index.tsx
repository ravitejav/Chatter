import { useState } from 'react';
import { LOGIN_OP } from '../../Constants/DefaultValues';
import { AuthProps } from '../../Models/AuthModels';
import './SignUp.css';

const SignUp = ({ changeOp }: AuthProps) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSignUp = (e: any) => {
        e.preventDefault();
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
            <div className="googleSignInButton">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png"/>
                <i className="fab fa-google fa-3x"></i>
                <p>SignUp with Google</p>
            </div>
            <div className="newuserBox">
                <p>Already a User?</p> 
                <p className="signUpButton" onClick={showSignIn}>SignIn</p>
            </div>
        </div>
    )
}

export default SignUp;