import { useEffect } from 'react';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import FriendRequests from '../FriendRequests';
import MessageContainer from '../MessageContainer';
import { Profile } from '../Profile';
import SideBar from '../SideBar';
import './HomePage.css';

const HomePage = (props: any) => {

    const urlMatcher = (matcher: string) => props.match.params.id.includes(matcher);

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
            <div className="messageBox">
                {urlMatcher('friendRequests') && (
                    <FriendRequests />
                )}
                {urlMatcher('chat') && (
                    <MessageContainer />
                )}
                {urlMatcher('profile') && (
                    <Profile />
                )}
                {urlMatcher('groupChat') && (
                    null
                )}
            </div>
        </main>
    );
}

export default HomePage;