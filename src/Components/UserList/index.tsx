import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import firebase from "firebase";

import { ERROR_CONSTANT, GOOGLE_AUTH_ERROR, TOAST_CONSTANT } from '../../Constants/ToasterContants';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import { callBack } from '../../Helpers/CallBackHelper';
import { timeAgo } from '../../Helpers/TimeStampHelper';
import { UserListProps, UserTrimedData } from '../../Models/SearchUser';
import { toasterType } from '../../Models/ToasterModel';
import SearchUser from '../SearchUser';
import Toaster from '../Toaster';

import './UserList.css';
import { trimExtraData } from '../../Helpers/UserDataHelper';

const UserList = ({ setActiveUser, activeUser }: UserListProps) => {

    const [createNew, setCreateNew] = useState(false);
    const [newMessageCount, setNewMessageCount] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);
    const [friends, setFriends] = useState([] as any);
    const [users, setUserData] = useState({} as any);
    const [selectedUsers, setSelectedusers] = useState([] as UserTrimedData[]);

    const resetToast = () => setToastDetails(TOAST_CONSTANT);

    const updateFriendsData = (friendList: firebase.database.DataSnapshot) => {
        const extractedFriendsList = friendList.val() || {};
        const extractedFriends = Object.keys(extractedFriendsList).map(id => id);
        setFriends(extractedFriends);
    }

    const updateUserData = (updateduserData: firebase.database.DataSnapshot) => {
        setUserData(trimExtraData(updateduserData.val()));
    }

    const getFirends = () => {
        const firebaseUser = new FirebaseUser();
        firebaseUser.getMyFriends(updateFriendsData);
        firebaseUser.getAllUsers()
            .then((res: any) => {
                setUserData(trimExtraData(res));
            })
            .catch(err => {
                setToastDetails(ERROR_CONSTANT(GOOGLE_AUTH_ERROR));
                callBack(1, resetToast);
            })
        firebaseUser.getLiveUpdateOfUser(updateUserData);
    };

    useEffect(() => {
        if (friends.length > 0  && Object.keys(users).length > 0) {
            const finalusers = friends
                .map((friendId: string) => users[friendId])
                .filter((user: UserTrimedData) => user.name.includes(searchText))
            setSelectedusers(finalusers);
        }
    }, [friends, users, searchText]);

    useEffect(() => {
        getFirends();
    }, []);

    return (
        <section className="userListWrapper">
            <div className="headingBar">
                <div className="heading">
                    <h1>Chats</h1>
                    <span>Personal Chats</span>
                </div>
                <div className="createNew" onClick={() => setCreateNew(true)}>
                    <span className="plus">
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span className="text">
                        Create New Chat
                    </span>
                </div>
            </div>
            <div className="chatUtils">
                <div className="searchBar center">
                    <span className="searchIcon center">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <input type="search" placeholder="Search Name..." onChange={(e) => setSearchText(e.target.value)} />
                </div>
            </div>
            <div className="users">
                <ul>
                    {selectedUsers
                        .map((friend: any, i: number) => (
                            <li onClick={() => setActiveUser(friend)} className={friend.email === activeUser.email ? "active" : ""} key={i}>
                                <div className="userInfo">
                                    <img src={"https://socialtelecast.com/wp-content/uploads/2020/04/%C3%9Arsula-Corber%C3%B3.jpg"} />
                                    <span className="userName center">
                                        <span className="name">{friend.name}</span>
                                        <span className="status">
                                            <span className={"notActiveUser"}></span>
                                            {friend.active === true ? 'active' : timeAgo(friend.active)}
                                        </span>
                                    </span>
                                </div>
                                <div className="messageData">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa fuga, aliquam itaque illum aliquid et vel eligendi enim, doloribus maxime officiis nulla, rem animi tenetur odio corrupti minima laborum perferendis?
                                    </p>
                                    {newMessageCount > 0 ? (
                                        <span className="messageCount center">2</span>
                                    ) : (
                                        <span className="messageCount nonotification"></span>
                                    )}
                                </div>
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