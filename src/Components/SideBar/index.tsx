import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './SideBar.css';
import { sideBarNavigation } from '../../Constants/SideBar';
import { LOGIN_IMAGE } from '../../Constants/DefaultValues';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
    return (
        <nav className="sideNavbar">
            <div className="logo">
                <img src={LOGIN_IMAGE} alt="profileImage" />
                <h2>Raviteja V</h2>
            </div>
            <div className="sideMenu">
                <ul>
                    {sideBarNavigation.map((route, i) => (
                        <li title={route.name} key={i} className={i === 0 ? "active" : ""}>
                            <Link to={route.path}>
                                <div className={"linebar"}></div>
                                <div className={"navItem"}>
                                    <span className="routeIcon">
                                        <FontAwesomeIcon icon={route.icon} />
                                    </span>
                                    <p>{route.name}</p>
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