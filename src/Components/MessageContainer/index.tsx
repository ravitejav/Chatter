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
                <UserList setActiveUser={setActiveUser} activeUser={activeuser} />
            </div>
            <div className="chatContainer">
                {Object.keys(activeuser).length > 0 && (
                    <>
                        <div className="chatHeader">
                            <UserChatHeader activeUser={activeuser} />
                        </div>
                        <div className="messages">
                            <Messages activeUser={activeuser} />
                        </div>
                        <div className="messageInput">
                            <MessageInput activeUser={activeuser} />
                        </div>
                    </>
                )}
                {Object.keys(activeuser).length <= 0 && ( 
                    <div className="typewriter center">
                        <h1>Choose friend to chat...</h1>
                    </div>
                )}
            </div>
        </section>
    );
}

export default MessageContainer;