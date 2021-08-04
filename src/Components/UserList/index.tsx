import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserList.css';

const UserList = () => {
    return (
        <section className="userListWrapper">
            <div className="createNew">
                <span className="plus">
                    <FontAwesomeIcon icon={faPlus} />
                </span>
                <span className="text">
                    Create New
                </span>
            </div>
            <div className="chatUtils">
                <span className="chatHeading">
                    Chat
                </span>
                <span className="searchBar">
                    <input type="search" placeholder="Search Name..." />
                    <span className="searchIcon">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </span>
            </div>
            <div className="users">
                <ul>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(ele => (
                        <li>
                            <span className="profileImage"><img src="https://openarmsopenminds.com/wp-content/uploads/2019/08/dummy-profile-pic.png" /></span>
                            <span className="userName">
                                <span className="name">Devraj</span>
                                <span className="status">
                                    <span className={ ele % 2 === 0 ? "activeUser" : "notActiveUser" }></span>
                                    23 mins ago
                                </span>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default UserList;