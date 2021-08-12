import FriendRequests from '../FriendRequests';
import MessageContainer from '../MessageContainer';
import SideBar from '../SideBar';
import './HomePage.css';

const HomePage = (props: any) => {

    const url = props.match.params.id;
    const friendRequests = url.includes("friendRequests");

    return (
        <main className="mainApp">
            <div className="sidebar">
                <SideBar />
            </div>
            {friendRequests && (
                <div className="messageBox">
                    <FriendRequests />
                </div>
            )}
            {!friendRequests && (
                <div className="messageBox">
                    <MessageContainer />
                </div>
            )}

        </main>
    );
}

export default HomePage;