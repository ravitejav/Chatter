import { useEffect, useState } from 'react';

import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import './FriendRequests.css';
import { ERROR_CONSTANT, GOOGLE_AUTH_ERROR, INFO_CONSTANT, REMOVED_FROM_REQUEST_LIST, SUCCESS_CONSTANT, TOAST_CONSTANT, USER_IS_ADDED, WARNING_CONSTANT } from '../../Constants/ToasterContants';
import { toasterType } from '../../Models/ToasterModel';
import Toaster from '../Toaster';
import { callBack, uidExtractor } from '../../Helpers/CallBackHelper';

const FriendRequests = () => {

    const [requests, setRequests] = useState({} as any);
    const [users, setUsers] = useState({} as any);
    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);
    const [changesDetails, setChangedDetails] = useState(false);


    const resetToast = () => setToastDetails(TOAST_CONSTANT);

    const getuserData = () => {
        const userQuery = new FirebaseUser();
        userQuery.getAllUsers()
            .then(resultsUsers => {
                setUsers(resultsUsers);
                userQuery.getRequests()
                    .then(res => res.exists() ? setRequests(res.val()) : null)
                    .catch(error => WARNING_CONSTANT(GOOGLE_AUTH_ERROR));
            })
            .catch(error => WARNING_CONSTANT(GOOGLE_AUTH_ERROR))
    };

    useEffect(() => {
        getuserData();
    }, []);

    useEffect(() => {
        if (changesDetails) {
            getuserData();
            setChangedDetails(false);
        }
    }, [changesDetails]);

    const handleAcceptRequest = (e: any, user: any, userId: any) => {
        e.preventDefault();
        const userQuery = new FirebaseUser();
        userQuery.acceptFriendRequest(userId, uidExtractor(userQuery.getCurrentUser()?.email || ""))
            .then(res => {
                setChangedDetails(true);
                setToastDetails(INFO_CONSTANT(USER_IS_ADDED));
                callBack(1, resetToast);
            })
            .catch(error => {
                setToastDetails(ERROR_CONSTANT(GOOGLE_AUTH_ERROR));
                callBack(1, resetToast);
            })
    }

    const handleRejectRequest = (e: any, user: any, userId: any) => {
        e.preventDefault();
        const userQuery = new FirebaseUser();
        userQuery.rejectFriendRequest(uidExtractor(userQuery.getCurrentUser()?.email || ""), userId)
            .then(res => {
                setChangedDetails(true);
                setToastDetails(SUCCESS_CONSTANT(REMOVED_FROM_REQUEST_LIST));
                callBack(1, resetToast);
            })
            .catch(error => {
                setToastDetails(ERROR_CONSTANT(GOOGLE_AUTH_ERROR));
                callBack(1, resetToast);
            })
    }

    return (
        <section className="friendRequestMapper">
            <ul className="friendRequest">
                {Object.keys(requests).map((ele: any, i: number) => (
                    requests[ele]
                        ?
                        <li key={i}>
                            <div className="detailWrapper">
                                <div className="additonalDetails">
                                    <img src={ users[ele].profileUrl || "https://socialtelecast.com/wp-content/uploads/2020/04/%C3%9Arsula-Corber%C3%B3.jpg"} />
                                    <div className="details">
                                        <span>{users[ele].name}</span>
                                        <span>{users[ele].email}</span>
                                    </div>
                                </div>
                                <div className="actionButton">
                                    <div onClick={(e) => handleAcceptRequest(e, users[ele], ele)}>
                                        Accept
                                    </div>
                                    <div onClick={(e) => handleRejectRequest(e, users[ele], ele)}>
                                        Ignore
                                    </div>
                                </div>
                            </div>
                        </li>
                        : null
                ))}
            </ul>
            {Object.keys(requests).length === 0 && (
                <div className="noRequests">No New Requests!!!</div>
            )}
            <Toaster time={1} message={toastDetails.message} type={toastDetails.type as toasterType} showToast={toastDetails.showToast} />
        </section>
    );
}

export default FriendRequests;