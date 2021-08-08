import { SearchUserProps } from '../../Models/SearchUser';
import './SearchUser.css';

const SearchUser = (props: SearchUserProps) => {



    return (
        <div className="userSearchPopUP">
            <div className="searchWrapper">
                <div className="searchBar">
                    <input type="search"  placeholder="Search for Friends...." />
                    <button>Search</button>
                </div>
                <div className="searchResults">
                    <ul className="resultsList">
                        {[0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 1,1,1,1,0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 1,1,1,1,0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 1,1,1,1,0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 1,1,1,1].map(() => (
                            <li className="result">
                                <span>Raviteja V</span>
                                <span>&nbsp;&nbsp;rv@gmail.com</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="closeButton">
                    <button onClick={props.hideSearchPopUp}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default SearchUser;