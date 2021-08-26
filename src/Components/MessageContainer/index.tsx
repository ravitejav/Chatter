import { useState } from 'react';
import MessageInput from '../MessageInput';
import Messages from '../Messages';
import UserChatHeader from '../UserChatHeader';
import UserList from '../UserList';
import './MessageContainer.css';

const MessageContainer = () => {

    const [activeuser, setActiveUser] = useState({} as any);

    return (
        <section className="messageBlock">
            <div className="usersList">
                <UserList setActiveUser={setActiveUser} activeUserEmail={activeuser.email} />
            </div>
            <div className="chatContainer">
                {Object.keys(activeuser).length > 0 && (
                    <>
                        <div className="chatHeader">
                            <UserChatHeader name={activeuser.name} />
                        </div>
                        <div className="messages">
                            <Messages activeChatEmail={activeuser.email || ""} />
                        </div>
                        <div className="messageInput">
                            <MessageInput activeChatEmail={activeuser.email || ""} />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default MessageContainer;