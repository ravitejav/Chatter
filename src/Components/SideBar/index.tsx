import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from "@fortawesome/free-regular-svg-icons";

import './SideBar.css';
import { sideBarNavigation } from '../../Constants/SideBar';

const SideBar = () => {
    return (
        <nav className="sideNavbar">
            <div className="logo">
                <FontAwesomeIcon icon={faComments} size="5x" />
            </div>
            <div className="sideMenu">
                <ul>
                    {sideBarNavigation.map(route => (
                        <li title={route.name}>
                            <span className="routeIcon">
                                <FontAwesomeIcon icon={route.icon} />
                            </span>
                            <a href={route.path}>{route.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default SideBar;