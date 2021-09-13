import { useState } from 'react';
import { GroupDetails } from '../../Models/CreateGroup';
import { GroupChatList } from '../GroupChatList';
import './GroupChat.css';

export const GroupChat = () => {

    const [activeGroup, setActiveGroup] = useState({} as GroupDetails);
    
    return (
        <div className="GroupChatWrapper">
            <div className="GroupChatList">
                <GroupChatList setActiveGroup={setActiveGroup} />
            </div>
            <div className="GroupChatMessages">

            </div>
        </div>
    );
}