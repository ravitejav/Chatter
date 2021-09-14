import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import firebase from "firebase";

import { CREATE_GROUP } from '../../Constants/DefaultValues';
import { TOAST_CONSTANT } from '../../Constants/ToasterContants';
import { FirebaseGroup } from '../../Firebase/FirebaseGroup';
import { toasterType } from '../../Models/ToasterModel';
import { CreateNewGroup } from '../CreateNewGroup';
import SearchUser from '../SearchUser';
import Toaster from '../Toaster';
import { jsonToArray, trimExtraData } from '../../Helpers/UserDataHelper';
import { GroupDetails } from '../../Models/CreateGroup';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import './GroupChatList.css';

export const GroupChatList = (props: { setActiveGroup: any }) => {

    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);
    const [createNew, setCreateNew] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchGroup, setSearchGroup] = useState(false);
    const [groups, setGroups] = useState([] as Array<GroupDetails>);
    const currentGroup = useRef({} as GroupDetails);
    const [currentUser, setCurrentUser] = useState({} as any);

    useEffect(() => {
        const userQuery = new FirebaseUser();
        userQuery.getCurrentUserData(liveUpdateOfUser);
    }, []);

    const liveUpdateOfUser = (liveUser: firebase.database.DataSnapshot) => {
        if(liveUser.exists()) {
            setCurrentUser(liveUser.val());
        } 
    }

    useEffect(() => {
        const firebaseGroup = new FirebaseGroup();
        firebaseGroup.getGroups(handleGroups)
    }, []);

    const handleGroups = (dbgroups: firebase.database.DataSnapshot) => {
        if(dbgroups.exists()) {
            setGroups(jsonToArray(dbgroups.val()));
        }
    }

    const resetToast = () => setToastDetails(TOAST_CONSTANT);

    const hideAndOpenSearchGroup = (shouldOpenSearch: boolean) => {
        setCreateNew(false);
        setSearchGroup(shouldOpenSearch);
    }

    const setCurrentGroup = (group: GroupDetails) => {
        currentGroup.current = group;
        props.setActiveGroup(group);
    }

    return (
        <section className="groupChatListWrapper">
            <div className="heading">
                <h1 className="naming center">
                    Group Chats
                </h1>
                <div className="createGroupbutton button" onClick={() => setCreateNew(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Create New Group
                </div>
            </div>
            <div className="searchBar center">
                <FontAwesomeIcon icon={faSearch} />
                <input type="search" placeholder="Search for Group..." onChange={(e) => setSearchText(e.target.value)} />
            </div>
            <div className="groupList">
                <ul>
                    {groups.filter((filterGroup: GroupDetails) => currentUser.groups[filterGroup.id]).map((group: GroupDetails) => (
                        <li 
                            className={ currentGroup.current.id === group.id ? "button active" : "button" } 
                            onClick={() => setCurrentGroup(group)}
                            key={group.id}
                        >
                            <h2 className="groupName">{group.name}</h2>
                            <p className="lastMessage">
                                <span className="latestMessage">
                                    hello World!!!
                                    hello World!!!
                                </span>
                                <span className="messageCount center">
                                    3
                                </span>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            {searchGroup && (<SearchUser hideSearchPopUp={() => setSearchGroup(false)} searchType={CREATE_GROUP} />)}
            {createNew && (
                <CreateNewGroup 
                    hideCreateGroup={() => hideAndOpenSearchGroup(false)} 
                    hideAndOpenSearchGroup={() => hideAndOpenSearchGroup(true)} 
                />
            )}
            <Toaster time={1} message={toastDetails.message} type={toastDetails.type as toasterType} showToast={toastDetails.showToast} />
        </section>
    );
    
}