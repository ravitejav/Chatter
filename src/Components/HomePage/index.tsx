import { useEffect } from 'react';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import FriendRequests from '../FriendRequests';
import MessageContainer from '../MessageContainer';
import SideBar from '../SideBar';
import './HomePage.css';

const HomePage = (props: any) => {

    const url = props.match.params.id;
    const friendRequests = url.includes("friendRequests");

    useEffect(() => {
        const userFirebase = new FirebaseUser();
        userFirebase.activateUser().then().catch();
         window.addEventListener('beforeunload', () => {
            userFirebase.deactivateUser().then().catch();
         })
        }, []);

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