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
    const [newMessageCount, setNewMessageCount] = useState(0);
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
                    {friends
                        .filter((friend: any) => friend.name.includes(searchText))
                        .map((friend: any, i: number) => (
                            <li onClick={() => setActiveUser(friend)} className={friend.email === activeUserEmail ? "active" : ""} key={i}>
                                <div className="userInfo">
                                    <img src={i % 2 == 0 ? "https://socialtelecast.com/wp-content/uploads/2020/04/%C3%9Arsula-Corber%C3%B3.jpg" : "data:image/jpeg;base64,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"} />
                                    <span className="userName center">
                                        <span className="name">{friend.name}</span>
                                        <span className="status">
                                            <span className={"notActiveUser"}></span>
                                            23 mins ago
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