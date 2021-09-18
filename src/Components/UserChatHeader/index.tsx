import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { FirebaseGroup } from '../../Firebase/FirebaseGroup';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import { timeAgo } from '../../Helpers/TimeStampHelper';
import { MessagingProps } from '../../Models/MessagingModels';
import './UserchatHeader.css';

const UserChatHeader = ({ activeUser, activeGroup, handleRestGroup }: MessagingProps) => {

    const [dropDown, setDropDown] = useState(false);

    const exitGroup = () => {
        const firebaseGroup = new FirebaseGroup();
        firebaseGroup.exitGroup(activeGroup)
            .then(res => {
                const firebaseUser = new FirebaseUser();
                firebaseUser.removeFromGroup(activeGroup?.id || '').then(() => {
                    handleRestGroup();
                }).catch();
            })
            .catch(error => {
                // handle error
            })
    }

    return (
        <section className="userHeader center">
            <div className="headerBar">
                {activeUser && (
                    <img src={activeUser?.profileUrl || ''} alt={activeUser?.name + "profile pic"} />
                )}
                <div className="profile center">
                    <div className="details">
                        <span className="name">{activeUser?.name || activeGroup?.name}</span>
                        <span className="status">
                            <span className="activeUser"></span>
                            {activeUser?.active === true ? 'active' : timeAgo(activeUser?.active || 0)}
                        </span>
                    </div>
                    <div className="options">
                        <div className="tripleDot center button" onClick={() => setDropDown(dropDown => !dropDown)}>
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </div>
                        {dropDown && (
                            <div className="dropdown">
                                <span className="button center" onClick={exitGroup}>Exit Group</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserChatHeader;