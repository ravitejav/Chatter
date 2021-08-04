import './UserchatHeader.css';

const UserChatHeader = () => {
    return (
        <section className="userHeader">
            <div className="headerBar">
                <img src="https://openarmsopenminds.com/wp-content/uploads/2019/08/dummy-profile-pic.png" />
                <div className="profile">
                    <span className="name">Devraj</span>
                    <span className="status">
                        <span className="activeUser"></span>
                        23 minutes Ago
                    </span>
                </div>
            </div>
        </section>
    );
}

export default UserChatHeader;