import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from 'firebase';

import { sideBarNavigation } from '../../Constants/SideBar';
import { LOGIN_IMAGE } from '../../Constants/DefaultValues';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import './SideBar.css';

const SideBar = () => {

    const [currentUser, setCurrentUser] = useState({} as any);

    useEffect(() => {
        const firebaseUser = new FirebaseUser();
        firebaseUser.getCurrentUserData((res: firebase.database.DataSnapshot) => setCurrentUser(res.val()));
    }, []);

    return (
        <nav className="sideNavbar">
            <div className="logo">
                <img src={LOGIN_IMAGE} alt="profileImage" />
                <h2>{currentUser.name}</h2>
            </div>
            <div className="sideMenu">
                <ul>
                    {sideBarNavigation(currentUser).map((route, i) => (
                        <li title={route.name} key={i} className={i === 0 ? "active" : ""}>
                            <Link to={route.path}>
                                <div className={"linebar"}></div>
                                <div className={"navItem"}>
                                    <span className="routeIcon">
                                        <FontAwesomeIcon icon={route.icon} />
                                    </span>
                                    <p>{route.name}</p>{route.additonalData ? (<span className="notifications">{route.additonalData}</span>) : ''}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="logout">
                    <span className="routeIcon">
                        <FontAwesomeIcon icon={faPowerOff} />
                    </span>
                    Logout
                </div>
            </div>
        </nav>
    );
}

export default SideBar;