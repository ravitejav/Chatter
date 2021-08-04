import './Messages.css';

const Messages = () => {
    return (
       <div className="messageWrapper">
           <ul className="messagesList">
               <li className="moveLeft">
                   <div className="sentByMe">
                        This is me
                   </div>
               </li>
               <li className="moveRight">
                   <div className="sentByFriend">
                        This is my friend
                   </div>
               </li>
           </ul>
       </div>
    );
};

export default Messages;