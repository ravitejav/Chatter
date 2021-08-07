import { useState } from 'react';
import Login from '../Login';
import { LOGIN_IMAGE, LOGIN_OP } from '../../Constants/DefaultValues';
import './Auth.css';
import SignUp from '../SignUp';

const Auth = () => {

    const [choosenOp, setChoosenOp] =useState(LOGIN_OP);

    return (
        <main className="loginWrapper">
            <section className="loginContainer">
                <div className="signinSignUp">
                    {(
                        choosenOp === LOGIN_OP 
                            ? <Login changeOp={setChoosenOp} /> 
                            : <SignUp  changeOp={setChoosenOp} /> 
                    )}
                </div>
                <div className="resImg">
                    <img src={LOGIN_IMAGE} alt={choosenOp} />
                </div>
            </section>
        </main>
    );
}

export default Auth;