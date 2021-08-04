import MessageContainer from '../MessageContainer';
import SideBar from '../SideBar';
import './HomePage.css';

const HomePage =  () => {
    return (
        <main className="mainApp">
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="messageBox">
                <MessageContainer />
            </div>
            {/* <div className="infoBox"></div> */}
        </main>
    );
}

export default HomePage;