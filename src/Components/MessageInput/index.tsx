import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { FirebaseMessaging } from '../../Firebase/FirebaseMessages';
import { MessageType } from '../../Models/Message';
import { MessagingProps } from '../../Models/MessagingModels';
import './MessageInput.css';

const MessageInput = ({ activeChatEmail }: MessagingProps) => {

    const inputRef = useRef(null);

    const sendMessage = (message: string) => {
        const messager = new FirebaseMessaging();
        const messageDetails: MessageType = {
            from: "",
            message,
            timestamp: new Date().getTime(),
        }
        messager.sendMessage(activeChatEmail, messageDetails).then().catch();
    }

    const onSend = (e: any) => {
        if(e.key !== "Enter") return;
        const inputEle: any = inputRef?.current;
        const Message = inputEle && inputEle['value'];
        sendMessage(Message);
        if(inputEle) { inputEle['value'] = ''; }
    }

    return (
        <div className="messageInputWrapper">
            <div className="inputWrapper">
                <input type="text" placeholder="Type Your Message...." ref={inputRef} onKeyPress={onSend} />
                <span className="sendicon" role="button" onClick={onSend}>
                    <FontAwesomeIcon icon={faTelegramPlane} />
                </span>
            </div>
        </div>
    )
}

export default MessageInput;