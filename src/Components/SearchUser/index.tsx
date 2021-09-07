import { faArrowLeft, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { ERROR_CONSTANT, FAILED_TO_SEND_REQ, FRIEND_REQ_SENT, INFO_CONSTANT, MINIMUM_CHARS, TOAST_CONSTANT, WARNING_CONSTANT } from '../../Constants/ToasterContants';
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails';
import { callBack, uidExtractor } from '../../Helpers/CallBackHelper';
import { extractSearchResults } from '../../Helpers/UserDataHelper';
import { SearchUserProps } from '../../Models/SearchUser';
import { toasterType } from '../../Models/ToasterModel';
import Toaster from '../Toaster';
import './SearchUser.css';

const SearchUser = (props: SearchUserProps) => {

    const [searchResults, setSearchResults] = useState([] as any[]);
    const [isSearched, setIsSearched] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT);

    const searchUser = () => {
        if (searchText.length > 3) {
            const userDetails = new FirebaseUser();
            const currentUser = userDetails.getCurrentUser();
            userDetails.getAllUsers()
                .then((res: any) => {
                    setSearchResults(extractSearchResults(searchText, res, currentUser?.email || ""));
                })
                .catch(error => setSearchResults([]));
            setIsSearched(true);
        } else {
            setToastDetails(WARNING_CONSTANT(MINIMUM_CHARS));
            callBack(1, resetToast);
        }
    }

    const sendRequest = (user: any) => {
        const userDetails = new FirebaseUser();
        const currentUserEmail = userDetails.getCurrentUser()?.email || "";
        userDetails.sendRequest(uidExtractor(currentUserEmail), uidExtractor(user.email))
            .then(res => {
                setToastDetails(INFO_CONSTANT(FRIEND_REQ_SENT(user.name)));
                callBack(1, resetToast);
            })
            .catch(error => {
                setToastDetails(ERROR_CONSTANT(FAILED_TO_SEND_REQ(user.name)));
                callBack(1, resetToast);
            });

    }

    const resetToast = () => setToastDetails(TOAST_CONSTANT);

    return (
        <div className="userSearchPopUP">
            <div className="searchWrapper">
                <div className="searchBar">
                    <input type="search" placeholder="Search for Friends...." onChange={(e) => setSearchText(e.target.value)} />
                    <div className="center" onClick={searchUser}>
                        <FontAwesomeIcon icon={faSearch} />
                        Search
                    </div>
                </div>
                <div className="searchResults">
                    {searchResults.length > 0 && isSearched && (
                        searchResults.map((user, index) => (
                            <ul className="resultsList" key={index}>
                                <li className="result">
                                    <div className="requestBox">
                                        <img src={"https://socialtelecast.com/wp-content/uploads/2020/04/%C3%9Arsula-Corber%C3%B3.jpg"} />
                                        <div className="details">
                                            <div>
                                                <span>{user.name}</span>
                                                <span>&nbsp;{user.email}</span>
                                            </div>
                                            <div className="buttons">
                                                <div className="center addFriend" onClick={() => sendRequest(user)}>
                                                    <FontAwesomeIcon icon={faUserPlus} />
                                                    Add
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        ))
                    )}
                    {isSearched && searchResults.length <= 0 && (
                        <div className="noResults">
                            No Results related to&nbsp;<strong>{searchText}</strong>
                        </div>
                    )}
                    {!isSearched && (
                        <div className="notSearched">
                            Search for new friends
                        </div>
                    )}
                </div>
                <div className="closeButton">
                    <div className="center" onClick={props.hideSearchPopUp}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Close
                    </div>
                </div>
            </div>
            <Toaster time={1} message={toastDetails.message} type={toastDetails.type as toasterType} showToast={toastDetails.showToast} />
        </div>
    );
}

export default SearchUser;