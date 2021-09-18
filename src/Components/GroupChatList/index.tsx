import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import firebase from "firebase";

import { CREATE_GROUP, GROUP_CHAT } from '../../Constants/DefaultValues';
import { ERROR_CONSTANT, NOT_ABLE_SYNC, TOAST_CONSTANT } from '../../Constants/ToasterContants';
import { FirebaseGroup } from '../../Firebase/FirebaseGroup';
import { toasterType } from '../../Models/ToasterModel';
import { CreateNewGroup } from '../CreateNewGroup';
import SearchUser from '../SearchUser';
import Toaster from '../Toaster';
import { jsonToArray, trimExtraData } from '../../Helpers/UserDataHelper';
import { GroupDetails } from '../../Models/CreateGroup';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import './GroupChatList.css';
import { FirebaseMessaging } from '../../Firebase/FirebaseMessages';
import { getCountOfLatestMessages } from '../../Helpers/MessageHelper';
import { callBack } from '../../Helpers/CallBackHelper';

export const GroupChatList = (props: { setActiveGroup: any }) => {

    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);
    const [createNew, setCreateNew] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchGroup, setSearchGroup] = useState(false);
    const [groups, setGroups] = useState([] as Array<GroupDetails>);
    const currentGroup = useRef({} as GroupDetails);
    const [currentUser, setCurrentUser] = useState({} as any);
    const [newMessageCount, setNewMessageCount] = useState({} as any)
    const [latestMessages, setLatestMessages] = useState({} as any)


    useEffect(() => {
        const userQuery = new FirebaseUser();
        const firebaseGroup = new FirebaseGroup();
        userQuery.getCurrentUserData(liveUpdateOfUser);
        firebaseGroup.getGroups(handleGroups)
        return () => {
            const firebaselive = new FirebaseMessaging()
            if (currentGroup.current.id) {
                firebaselive.setLastReadTime(currentGroup.current.id, GROUP_CHAT)?.then().catch();
            }
            currentGroup.current = {
                id: '',
                name: '',
                userIdList: [],
            };
        };
    }, []);

    useEffect(() => {
        const firebaseMessaging = new FirebaseMessaging();
        groups.forEach((group: GroupDetails) => {
            firebaseMessaging.getLastMessageOfGroup(group.id, handleMessageUpdates);
            firebaseMessaging.getMessagesForGroup(group.id, handleMessageCount);
        })
    }, [groups])

    const handleMessageUpdates = (groupId: string, messages: firebase.database.DataSnapshot) => {
        if (messages.exists()) {
            const message = messages.val()[Object.keys(messages.val())[0]];
            setLatestMessages((oldLatestMessages: any) => ({
                ...oldLatestMessages,
                [groupId]: message?.message || '',
            }))
        }
    }
    
    const handleMessageCount = (messages: firebase.database.DataSnapshot, groupId: string) => {
        if (messages.exists()) {
            const firebaselive = new FirebaseMessaging()
            if (currentGroup.current?.id === groupId) {
                firebaselive.setLastReadTime(groupId, GROUP_CHAT)?.then().catch();
            } else {
                firebaselive.getLastReadTime(groupId, GROUP_CHAT)?.then(res => {
                    setNewMessageCount((oldMessageCount: any) => ({
                        ...oldMessageCount,
                        [groupId]: getCountOfLatestMessages(res.val(), messages),
                    }))
                }).catch(error => {
                    setToastDetails(ERROR_CONSTANT(NOT_ABLE_SYNC))
                    callBack(1, resetToast)
                })
            }
        }
    }

    const resetMessageCount = (groupId: string) =>
        setNewMessageCount({ ...newMessageCount, [groupId]: 0 })

    const liveUpdateOfUser = (liveUser: firebase.database.DataSnapshot) => {
        if (liveUser.exists()) {
            setCurrentUser(liveUser.val());
        }
    }

    const handleGroups = (dbgroups: firebase.database.DataSnapshot) => {
        if (dbgroups.exists()) {
            setGroups(jsonToArray(dbgroups.val()));
        }
    }

    const resetToast = () => setToastDetails(TOAST_CONSTANT);

    const hideAndOpenSearchGroup = (shouldOpenSearch: boolean) => {
        setCreateNew(false);
        setSearchGroup(shouldOpenSearch);
    }

    const setCurrentGroup = (group: GroupDetails) => {
        if (currentGroup.current.id) {
            const firebaseMessaging = new FirebaseMessaging()
            firebaseMessaging.setLastReadTime(currentGroup.current.id, GROUP_CHAT);
        }
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
                    {groups
                        .filter((filterGroup: GroupDetails) => currentUser.groups[filterGroup.id])
                        .filter((userGroup: GroupDetails) =>
                            searchText ? userGroup.name.toLowerCase().includes(searchText.toLowerCase()) : true
                        )
                        .map((group: GroupDetails) => (
                            <li
                                className={currentGroup.current.id === group.id ? "button active" : "button"}
                                onClick={() => {
                                    setCurrentGroup(group)
                                    resetMessageCount(group.id)
                                }}
                                key={group.id}
                            >
                                <h2 className="groupName">{group.name}</h2>
                                <p className="lastMessage">
                                    <span className="latestMessage">
                                        {latestMessages[group.id] ? latestMessages[group.id] : ''}
                                    </span>
                                    {newMessageCount[group.id] ?
                                        (
                                            <span className="messageCount center">
                                                {newMessageCount[group.id]}
                                            </span>
                                        )
                                        : null
                                    }
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