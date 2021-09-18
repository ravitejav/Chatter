import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { FirebaseMessaging } from '../../Firebase/FirebaseMessages';
import { MessageType } from '../../Models/Message';
import { MessagingProps } from '../../Models/MessagingModels';
import './MessageInput.css';

const MessageInput = ({ activeUser, activeGroup }: MessagingProps) => {

    const inputRef = useRef(null);

    const sendMessage = (message: string) => {
        const messager = new FirebaseMessaging();
        const messageDetails: MessageType = {
            from: "",
            message,
            timestamp: new Date().getTime(),
        }
        if(message === '' || message === undefined || message === null) return;
        if(activeUser) {
            messager.sendMessage(activeUser?.email || '', messageDetails).then().catch();
        }
        if(activeGroup) {
            messager.sendMessageToGroup(activeGroup.id, messageDetails).then().catch();
        }
    }

    const onSend = (e: any) => {
        if(e.key !== "Enter") return;
        extractAndSendMessage();
    }

    const extractAndSendMessage = () => {
        const inputEle: any = inputRef?.current;
        const Message = inputEle && inputEle['value'];
        sendMessage(Message);
        if(inputEle) { inputEle['value'] = ''; }
    }

    return (
        <div className="messageInputWrapper">
            <div className="inputWrapper">
                <input type="text" placeholder="Type your message here...." ref={inputRef} onKeyPress={onSend} />
                <span className="sendicon" role="button" onClick={extractAndSendMessage}>
                    <FontAwesomeIcon icon={faTelegramPlane} />
                </span>
            </div>
        </div>
    )
}

export default MessageInput;