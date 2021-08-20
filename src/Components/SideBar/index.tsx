import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from "@fortawesome/free-regular-svg-icons";

import './SideBar.css';
import { sideBarNavigation } from '../../Constants/SideBar';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <nav className="sideNavbar">
            <div className="logo">
                <FontAwesomeIcon icon={faComments} size="5x" />
            </div>
            <div className="sideMenu">
                <ul>
                    {sideBarNavigation.map((route, i) => (
                        <li title={route.name} key={i}>
                            <span className="routeIcon">
                                <FontAwesomeIcon icon={route.icon} />
                            </span>
                            <Link to={route.path}>{route.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default SideBar;