import './UserchatHeader.css';

const UserChatHeader = ({name}: { name: string }) => {
    return (
        <section className="userHeader">
            <div className="headerBar">
                <img src="https://openarmsopenminds.com/wp-content/uploads/2019/08/dummy-profile-pic.png" />
                <div className="profile">
                    <span className="name">{name}</span>
                    <span className="status">
                        <span className="activeUser"></span>
                        active
                    </span>
                </div>
            </div>
        </section>
    );
}

export default UserChatHeader;