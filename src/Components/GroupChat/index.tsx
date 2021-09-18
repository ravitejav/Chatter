import React, { useState } from 'react';
import { GROUP_CHAT } from '../../Constants/DefaultValues';
import { GroupDetails } from '../../Models/CreateGroup';

import './GroupChat.css';

const GroupChatList = React.lazy(() => import('../GroupChatList'));
const MessageInput = React.lazy(() => import('../MessageInput'));
const UserChatHeader = React.lazy(() => import('../UserChatHeader'));
const Messages = React.lazy(() => import('../Messages'));



export const GroupChat = () => {

    const [activeGroup, setActiveGroup] = useState({} as GroupDetails);

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