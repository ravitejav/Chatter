import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import './MessageInput.css';

const MessageInput = () => {

    const inputRef = useRef(null);

    const onSend = (e: any) => {
        if(e.key !== "Enter") return;
        const inputEle: any = inputRef?.current;
        const Message = inputEle && inputEle['value'];
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