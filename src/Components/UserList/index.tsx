import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import firebase from "firebase";

import { ERROR_CONSTANT, GOOGLE_AUTH_ERROR, TOAST_CONSTANT } from '../../Constants/ToasterContants';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import { callBack, uidExtractor } from '../../Helpers/CallBackHelper';
import { timeAgo } from '../../Helpers/TimeStampHelper';
import { UserListProps, UserTrimedData } from '../../Models/SearchUser';
import { toasterType } from '../../Models/ToasterModel';
import SearchUser from '../SearchUser';
import Toaster from '../Toaster';

import './UserList.css';
import { trimExtraData } from '../../Helpers/UserDataHelper';
import { FirebaseMessaging } from '../../Firebase/FirebaseMessages';

const UserList = ({ setActiveUser, activeUser }: UserListProps) => {

    const [createNew, setCreateNew] = useState(false);
    const [newMessageCount, setNewMessageCount] = useState({} as any);
    const [searchText, setSearchText] = useState("");
    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);
    const [friends, setFriends] = useState([] as any);
    const [users, setUserData] = useState({} as any);
    const [latestMessages, setLatestMessages] = useState({} as any);
    const [selectedUsers, setSelectedusers] = useState([] as UserTrimedData[]);
    const currentUser = useRef(activeUser);


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
        if (friends.length > 0 && Object.keys(users).length > 0) {
            const finalusers = friends
                .map((friendId: string) => users[friendId])
                .filter((user: UserTrimedData) => user.name.includes(searchText))
            setSelectedusers(finalusers);
        }
    }, [friends, users, searchText]);

    useEffect(() => {
        const firebaseMessages = new FirebaseMessaging();
        const handleMessageUpdate = (friendEmailId: string) => (messages: firebase.database.DataSnapshot) => {
            if (messages.exists()) {
                // console.log(friendEmailId !== currentUser.current.id);
                // if (friendEmailId !== currentUser.current.id) {
                //     setNewMessageCount({
                //         ...newMessageCount,
                //         [friendEmailId]: (newMessageCount[friendEmailId] || 0 ) + 1,
                //     });
                //     console.log(newMessageCount[friendEmailId], "sd", (newMessageCount[friendEmailId] || 0 ) + 1);
                // }
                setLatestMessages({
                    ...latestMessages,
                    [friendEmailId]: messages.val()[Object.keys(messages.val())[0]].message,
                })
            }
        }
        friends.forEach((friendId: string) => {
            firebaseMessages.getLastMessage(friendId, handleMessageUpdate(friendId));
        });
    }, [friends]);

    const resetMessageCount = (friendEmail: string) => setNewMessageCount({ ...newMessageCount, [friendEmail]: 0 });

    const setActiveUserGlobal = (friend: any) => {
        setActiveUser(friend);
        currentUser.current = friend;
    } 

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
                            <li onClick={() => { setActiveUserGlobal(friend); resetMessageCount(friend.id); }} className={friend.email === activeUser.email ? "active" : ""} key={i}>
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
                                        {latestMessages[friend.id]}
                                    </p>
                                    {newMessageCount[friend.id] > 0 ? (
                                        <span className="messageCount center">{newMessageCount[friend.id]}</span>
                                    ) : (
                                        // <span className="messageCount nonotification"></span>
                                        null
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