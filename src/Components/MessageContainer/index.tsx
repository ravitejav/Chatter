import MessageInput from '../MessageInput';
import Messages from '../Messages';
import UserChatHeader from '../UserChatHeader';
import UserList from '../UserList';
import './MessageContainer.css';

const MessageContainer = () => {
    return (
        <section className="messageBlock">
            <div className="usersList">
               <UserList />
            </div>
            <div className="chatContainer">
                <div className="chatHeader">
                    <UserChatHeader />
                </div>
                <div className="messages">
                    <Messages />
                </div>
                <div className="messageInput">
                    <MessageInput />
                </div>            
            </div>
        </section>
    );
}

export default MessageContainer;