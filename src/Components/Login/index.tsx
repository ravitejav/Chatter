import { useState } from 'react';
import { SIGNUP_OP } from '../../Constants/DefaultValues';
import { AuthProps } from '../../Models/AuthModels';
import './Login.css';

const Login = ({ changeOp }: AuthProps) => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: any) => {
        e.preventDefault();
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
        </div>
    )
};

export default Login;