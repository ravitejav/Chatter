import { useEffect, useRef, useState } from 'react';
import firebase from "firebase";

import { FirebaseMessaging } from '../../Firebase/FirebaseMessages';
import { MessageType } from '../../Models/Message';
import { MessagingProps } from '../../Models/MessagingModels';

import './Messages.css';
import { timeAgo } from '../../Helpers/TimeStampHelper';
import { UserTrimedData } from '../../Models/SearchUser';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';

const Messages = ({ activeUser, activeGroup }: MessagingProps) => {

    const [messages, setMessages] = useState([] as Array<MessageType>);
    const currentUser = useRef({} as UserTrimedData);

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
        if(activeUser?.email) {
            firebaseMessages.getMessagesOnce(activeUser?.email || '', messageUpdater);
        } else if (activeGroup?.id) {
            firebaseMessages.getMessagesForGroup(activeGroup.id || '', messageUpdater);
        }
    }

    useEffect(() => {
        setMessages([] as Array<MessageType>);
        meesageFetching();
    }, [activeUser, activeGroup]);

    useEffect(() => {
        document.querySelector<HTMLInputElement>('#activeMessage')?.scrollIntoView();
     }, [messages]);

     useEffect(() => {
        const firebaseUser = new FirebaseUser();
        currentUser.current = { ...(firebaseUser.getCurrentUser() as unknown as UserTrimedData) };
     }, []);

    return (
        <div className="messageWrapper">
            <ul className="messagesList">
                {messages.map((message, index) => (
                    <li 
                        className={message.from !== currentUser.current?.email ? "moveLeft" : "moveRight"} 
                        key={index} 
                        id={index === messages.length -1 ? "activeMessage" : ""}
                    >
                        <div className={message.from !== currentUser.current?.email ? "sentByFriend" : "sentByMe"}>
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