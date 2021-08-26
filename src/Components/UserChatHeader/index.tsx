import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserchatHeader.css';

const UserChatHeader = ({ name }: { name: string }) => {
    return (
        <section className="userHeader center">
            <div className="headerBar">
                <img src="https://socialtelecast.com/wp-content/uploads/2020/04/%C3%9Arsula-Corber%C3%B3.jpg" />
                <div className="profile center">
                    <div className="details">
                        <span className="name">{name}</span>
                        <span className="status">
                            <span className="activeUser"></span>
                            active
                        </span>
                    </div>
                    <div className="options">
                        <div className="tripleDot center">
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserChatHeader;