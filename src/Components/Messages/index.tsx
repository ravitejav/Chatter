import './Messages.css';

const Messages = () => {
    return (
       <div className="messageWrapper">
           <ul className="messagesList">
               <li className="moveLeft">
                   <div className="sentByMe">
                        This is sent by my friend
                   </div>
               </li>
               <li className="moveRight">
                   <div className="sentByFriend">
                        This is sent from me
                   </div>
               </li>
           </ul>
       </div>
    );
};

export default Messages;