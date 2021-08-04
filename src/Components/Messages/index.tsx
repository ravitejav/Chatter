import './Messages.css';

const Messages = () => {
    return (
       <div className="messageWrapper">
           <ul className="messagesList">
               <li className="moveLeft">
                   <div className="sentByMe">
                        This is sent from my friend
                   </div>
               </li>
               <li className="moveRight">
                   <div className="sentByFriend">
                        This is sent by me
                   </div>
               </li>
           </ul>
       </div>
    );
};

export default Messages;