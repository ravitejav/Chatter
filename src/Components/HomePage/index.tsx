import { lazy, useEffect } from 'react';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import { GroupChat } from '../GroupChat';
import { Profile } from '../Profile';
import './HomePage.css';

const SideBar = lazy(() => import('../SideBar'));
const FriendRequests = lazy(() => import('../FriendRequests'));
const MessageContainer = lazy(() => import('../MessageContainer'));

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
                    <GroupChat />
                )}
            </div>
        </main>
    );
}

export default HomePage;