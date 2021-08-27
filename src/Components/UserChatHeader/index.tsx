import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { timeAgo } from '../../Helpers/TimeStampHelper';
import { UserTrimedData } from '../../Models/SearchUser';
import './UserchatHeader.css';

const UserChatHeader = ({ activeUser }: { activeUser: UserTrimedData }) => {
    return (
        <section className="userHeader center">
            <div className="headerBar">
                <img src="https://socialtelecast.com/wp-content/uploads/2020/04/%C3%9Arsula-Corber%C3%B3.jpg" />
                <div className="profile center">
                    <div className="details">
                        <span className="name">{activeUser.name}</span>
                        <span className="status">
                            <span className="activeUser"></span>
                            {activeUser.active === true ? 'active' : timeAgo(activeUser.active || 0)}
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