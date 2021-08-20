import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { ERROR_CONSTANT, GOOGLE_AUTH_ERROR, TOAST_CONSTANT } from '../../Constants/ToasterContants';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import { callBack } from '../../Helpers/CallBackHelper';
import { UserListProps } from '../../Models/SearchUser';
import { toasterType } from '../../Models/ToasterModel';
import SearchUser from '../SearchUser';
import Toaster from '../Toaster';
import './UserList.css';

const UserList = ({ setActiveUser, activeUserEmail }: UserListProps) => {

    const [createNew, setCreateNew] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);
    const [friends, setFriends] = useState([] as any);

    const resetToast = () => setToastDetails(TOAST_CONSTANT);

    const getFirends = () => {
        const firebaseUser = new FirebaseUser();
        firebaseUser.getAllUsers()
            .then((res: any) => {
                firebaseUser.getMyFriends()
                    .then(friendList => {
                        const extractedFriendsList = friendList.val() || {};
                        const extractedFriends = Object.keys(extractedFriendsList).map(id => ({
                            id,
                            name: res[id].name,
                            email: res[id].email,
                        }));
                        setFriends(extractedFriends);
                    })
                    .catch(err => {
                        setToastDetails(ERROR_CONSTANT(GOOGLE_AUTH_ERROR));
                        callBack(1, resetToast);
                    })
            })
            .catch(err => {
                setToastDetails(ERROR_CONSTANT(GOOGLE_AUTH_ERROR));
                callBack(1, resetToast);
            })
    };

    useEffect(() => {
        getFirends();
    }, []);

    return (
        <section className="userListWrapper">
            <div className="createNew" onClick={() => setCreateNew(true)}>
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
                    <input type="search" placeholder="Search Name..." onChange={(e) => setSearchText(e.target.value)} />
                    <span className="searchIcon">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </span>
            </div>
            <div className="users">
                <ul>
                    {friends
                        .filter((friend: any) => friend.name.includes(searchText))
                        .map((friend: any, i: number) => (
                            <li onClick={() => setActiveUser(friend)} className={friend.email === activeUserEmail ? "active" : ""} key={i}>
                                <span className="profileImage"><img src="https://openarmsopenminds.com/wp-content/uploads/2019/08/dummy-profile-pic.png" /></span>
                                <span className="userName">
                                    <span className="name">{friend.name}</span>
                                    <span className="status">
                                        <span className={"notActiveUser"}></span>
                                        23 mins ago
                                    </span>
                                </span>
                            </li>
                        )
                    )}
                </ul>
            </div>
            {createNew && (<SearchUser hideSearchPopUp={() => setCreateNew(false)} />)}
            <Toaster time={1} message={toastDetails.message} type={toastDetails.type as toasterType} showToast={toastDetails.showToast} />
        </section>
    );
}

export default UserList;