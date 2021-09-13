import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { v5 as UUID } from "uuid";

import { ERROR_CONSTANT, NOT_ABLE_TO_CREATE_GROUP, TOAST_CONSTANT, NOT_ABLE_SYNC } from '../../Constants/ToasterContants';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import { trimExtraData } from '../../Helpers/UserDataHelper';
import { CreateGroupProps } from '../../Models/CreateGroup';
import { UserTrimedData } from '../../Models/SearchUser';
import { toasterType } from '../../Models/ToasterModel';
import Toaster from '../Toaster';
import './CreateNewGroup.css';
import { NAMESPACE } from '../../Constants/DefaultValues';
import { FirebaseGroup } from '../../Firebase/FirebaseGroup';

export const CreateNewGroup = (props: CreateGroupProps) => {

    const [groupName, setGroupName] = useState('');
    const [userName, setUserName] = useState('');
    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);
    const [selectedUsers, setSelectedUsers] = useState([] as Array<UserTrimedData>);
    const [users, setUsers] = useState([] as Array<UserTrimedData>);

    useEffect(() => {
        const userQuery = new FirebaseUser();
        userQuery.getLiveUpdateOfUser((resultsUsers: firebase.database.DataSnapshot) => resultsUsers.exists() && setUsers(trimExtraData(resultsUsers.val())))
    }, [])

    const removedFromSeletedUsers = (i: number) => {
        const userArray = JSON.parse(JSON.stringify(selectedUsers));
        userArray.splice(i, 1)
        setSelectedUsers(userArray);
    }    

    const createGroup = async () => {
        const uuid = UUID(groupName, NAMESPACE);
        const firebaseGroup = new FirebaseGroup();
        const firebaseUser = new FirebaseUser();
        firebaseGroup.createGroup({
            id: uuid,
            name: groupName,
            userIdList: selectedUsers.map(user => user.id).filter(id => id != null),
        }).then(() => props.hideCreateGroup()).catch(err => ERROR_CONSTANT(NOT_ABLE_TO_CREATE_GROUP));
        selectedUsers.forEach((selectedUser: UserTrimedData) => {
            firebaseUser.updateUserData(selectedUser.id, uuid)
                .then()
                .catch(error => {
                    setToastDetails(ERROR_CONSTANT(NOT_ABLE_SYNC))
                });
        })
    }

    const addToSeletedUsers = (user: UserTrimedData) => setSelectedUsers([...selectedUsers, user]);

    const resetToast = () => setToastDetails(TOAST_CONSTANT);

    const shouldUserVisible = (user: UserTrimedData) => {
        return user.name.toLowerCase().includes(userName.toLowerCase())
                && userName.length >= 3 
                && (selectedUsers.filter((userData: UserTrimedData) => userData.id === user.id).length === 0)
    }

    return (
        <section className="createNewWrapper center">
            <div className="newGroup center">
                <div className="newGroupForm center">
                    <input type="text" placeholder="Group Name..." onChange={(e) => setGroupName(e.target.value)} />
                    <input type="text" placeholder="Search Users..." onChange={(e) => setUserName(e.target.value)} />
                    <div className="suggestions">
                        <div className="suggestedUsers">
                            {Object.keys(users).map((userId: any) => 
                                (shouldUserVisible(users[userId]) ? 
                                    (
                                        <span className="button" onClick={() => addToSeletedUsers(users[userId])}>
                                            {users[userId].name}
                                            <span>({users[userId].email})</span>
                                        </span>
                                    ) : null
                                )
                            )}
                        </div>
                    </div>
                    <div className="selectedUsersList">
                        {selectedUsers.map((user: UserTrimedData, i: number) => (
                            <div className="userDetails">
                                <span>{user.name}</span>
                                <span className="button" onClick={() => removedFromSeletedUsers(i)}>X</span>
                            </div>
                        ))}
                    </div>
                    <div className="createGroupButton center button" onClick={createGroup}>
                        <p>Create Group</p>
                    </div>
                </div>
                <div className="closeForm">
                    <div className="button searchButton" onClick={props.hideAndOpenSearchGroup}>
                        <FontAwesomeIcon icon={faSearch} />
                        <span>Search Group</span>
                    </div>
                    <div className="button closeButton" onClick={props.hideCreateGroup}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Close</span>
                    </div>
                </div>
            </div>
            <Toaster time={1} message={toastDetails.message} type={toastDetails.type as toasterType} showToast={toastDetails.showToast} />
        </section>
    );
}