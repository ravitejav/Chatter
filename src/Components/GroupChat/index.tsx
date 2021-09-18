import { useState } from 'react';
import { GROUP_CHAT } from '../../Constants/DefaultValues';
import { GroupDetails } from '../../Models/CreateGroup';
import { UserTrimedData } from '../../Models/SearchUser';
import { GroupChatList } from '../GroupChatList';
import MessageInput from '../MessageInput';
import Messages from '../Messages';
import UserChatHeader from '../UserChatHeader';
import './GroupChat.css';

export const GroupChat = () => {

    const [activeGroup, setActiveGroup] = useState({} as GroupDetails);
    const [activeUser, setActiveUser] = useState({} as UserTrimedData);

    const handleExitGroup = () => setActiveGroup({} as GroupDetails);
    
    return (
        <div className="GroupChatWrapper">
            <div className="GroupChatList">
                <GroupChatList setActiveGroup={setActiveGroup} />
            </div>
            <div className="GroupChatMessages">
                {Object.keys(activeGroup).length > 0 && (
                    <>
                        <div className="chatHeader">
                            <UserChatHeader 
                                activeGroup={activeGroup} 
                                type={GROUP_CHAT} 
                                handleRestGroup={handleExitGroup} 
                            />
                        </div>
                        <div className="messages">
                            <Messages activeGroup={activeGroup} />
                        </div>
                        <div className="messageInput">
                            <MessageInput activeGroup={activeGroup} />
                        </div>
                    </>
                )}
                {Object.keys(activeGroup).length <= 0 && ( 
                    <div className="typewriter center">
                        <h1>Choose a group to chat...</h1>
                    </div>
                )}
            </div>
        </div>
    );
}