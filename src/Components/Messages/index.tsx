import { useEffect, useState } from 'react';
import firebase from "firebase";

import { FirebaseMessaging } from '../../Firebase/FirebaseMessages';
import { MessageType } from '../../Models/Message';
import { MessagingProps } from '../../Models/MessagingModels';

import './Messages.css';
import { timeAgo } from '../../Helpers/TimeStampHelper';

const Messages = ({ activeUser }: MessagingProps) => {

    const [messages, setMessages] = useState([] as Array<MessageType>);

    const messageUpdater = (snapshot: firebase.database.DataSnapshot) => {
        if (snapshot.exists()) {
            const arrivedMessages = snapshot.val() || {};
            if (Object.keys(arrivedMessages).length > 0) {
                const receivedMessages = Object.keys(arrivedMessages).map(messageStamp => arrivedMessages[messageStamp]);
                setMessages(receivedMessages.sort((a: MessageType, b: MessageType) => (a.timestamp - b.timestamp)));
            }
        }
    }

    const meesageFetching = () => {
        const firebaseMessages = new FirebaseMessaging();
        firebaseMessages.getMessagesOnce(activeUser.email, messageUpdater);
    }

    useEffect(() => {
        setMessages([] as Array<MessageType>);
        meesageFetching();
    }, [activeUser]);

    useEffect(() => {
        document.querySelector<HTMLInputElement>('#activeMessage')?.scrollIntoView();
     }, [messages]);

    return (
        <div className="messageWrapper">
            <ul className="messagesList">
                {messages.map((message, index) => (
                    <li className={message.from === activeUser.email ? "moveLeft" : "moveRight"} key={index} id={index === messages.length -1 ? "activeMessage" : ""}>
                        <div className={message.from === activeUser.email ? "sentByFriend" : "sentByMe"}>
                            {message.message}
                        </div>
                        <span className="timeago">{timeAgo(message.timestamp)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Messages;