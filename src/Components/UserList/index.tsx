import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import firebase from 'firebase'

import { ERROR_CONSTANT, GOOGLE_AUTH_ERROR, NOT_ABLE_SYNC, TOAST_CONSTANT } from '../../Constants/ToasterContants'
import { FirebaseUser } from '../../Firebase/FirebaseUserDetails'
import { callBack, uidExtractor } from '../../Helpers/CallBackHelper'
import { timeAgo } from '../../Helpers/TimeStampHelper'
import { UserListProps, UserTrimedData } from '../../Models/SearchUser'
import { toasterType } from '../../Models/ToasterModel'
import SearchUser from '../SearchUser'
import Toaster from '../Toaster'

import './UserList.css'
import { trimExtraData } from '../../Helpers/UserDataHelper'
import { FirebaseMessaging } from '../../Firebase/FirebaseMessages'
import { getCountOfLatestMessages } from '../../Helpers/MessageHelper'

const UserList = ({ setActiveUser, activeUser }: UserListProps) => {
  const [createNew, setCreateNew] = useState(false)
  const [newMessageCount, setNewMessageCount] = useState({} as any)
  const [searchText, setSearchText] = useState('')
  const [toastDetails, setToastDetails] = useState(TOAST_CONSTANT)
  const [friends, setFriends] = useState([] as any)
  const [users, setUserData] = useState({} as any)
  const [latestMessages, setLatestMessages] = useState({} as any)
  const [selectedUsers, setSelectedusers] = useState([] as UserTrimedData[])
  const currentUser = useRef(activeUser)

  const resetToast = () => setToastDetails(TOAST_CONSTANT)

  const updateFriendsData = (friendList: firebase.database.DataSnapshot) => {
    const extractedFriendsList = friendList.val() || {}
    const extractedFriends = Object.keys(extractedFriendsList).map((id) => id)
    setFriends(extractedFriends)
  }

  const updateUserData = (updateduserData: firebase.database.DataSnapshot) => {
    setUserData(trimExtraData(updateduserData.val()))
  }

  const getFirends = () => {
    const firebaseUser = new FirebaseUser()
    firebaseUser.getMyFriends(updateFriendsData)
    firebaseUser.getLiveUpdateOfUser(updateUserData)
  }

  useEffect(() => {
    if (friends.length > 0 && Object.keys(users).length > 0) {
      const finalusers = friends
        .map((friendId: string) => users[friendId])
        .filter((user: UserTrimedData) => user.name.toLowerCase().includes(searchText.toLowerCase()))
      setSelectedusers(finalusers)
      if (users[activeUser.id]) setActiveUser(users[activeUser.id])
    }
  }, [friends, users, searchText])
  
  const handleMessageUpdate = (friendId: string, messages: firebase.database.DataSnapshot) => {
    if (messages.exists()) {
      const message = messages.val()[Object.keys(messages.val())[0]];
      setLatestMessages((existingLatestMessages: any) => ({
        ...existingLatestMessages,
        [friendId]: message.message,
      }))
    }
  }

  const handleMessageCountUpdate =  (updatedMessages: firebase.database.DataSnapshot, friendEmailId: string) => {
    if(updatedMessages.exists()) {
      const firebaselive = new FirebaseMessaging()
      if(currentUser.current.email && (uidExtractor(currentUser.current.email) === friendEmailId)) {
        firebaselive.setLastReadTime(friendEmailId).then().catch();
      } else {
        firebaselive.getLastReadTime(friendEmailId).then(res => {
          setNewMessageCount((currentMessageCount: any) => ({
            ...currentMessageCount,
            [uidExtractor(friendEmailId)]: getCountOfLatestMessages(res.val() || 0, updatedMessages),
          }));
        }).catch(error => {
          setToastDetails(ERROR_CONSTANT(NOT_ABLE_SYNC))
          callBack(1, resetToast)
        })
      }
      
    }
  }

  useEffect(() => {
    const firebaseMessages = new FirebaseMessaging()
    friends.forEach((friendId: string) => {
      firebaseMessages.getLastMessage(friendId, handleMessageUpdate)
      firebaseMessages.getMessagesOnce(friendId, handleMessageCountUpdate);
    })
  }, [friends])

  const resetMessageCount = (friendEmail: string) =>
    setNewMessageCount({ ...newMessageCount, [friendEmail]: 0 })

  const setActiveUserGlobal = (friend: UserTrimedData) => {
    if(currentUser.current.id) {
      const firebaseMessaging = new FirebaseMessaging()
      firebaseMessaging.setLastReadTime(currentUser.current.email);
    }
    setActiveUser(friend)
    currentUser.current = friend
  }

  useEffect(() => {
    getFirends()
    return () => {
      const firebaselive = new FirebaseMessaging()
      if(currentUser.current.id) {
        firebaselive.setLastReadTime(currentUser.current.id).then().catch();
      }
      currentUser.current = {
        id: '',
        email: '',
        name: '',
        active: false,
        profileUrl: '',
        groups: {}
      };
    };
  }, [])

  return (
    <section className="userListWrapper">
      <div className="headingBar">
        <div className="heading">
          <h1>Chats</h1>
          <span>Personal Chats</span>
        </div>
        <div className="createNew" onClick={() => setCreateNew(true)}>
          <span className="plus">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <span className="text">Create New Chat</span>
        </div>
      </div>
      <div className="chatUtils">
        <div className="searchBar center">
          <span className="searchIcon center">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="search"
            placeholder="Search Name..."
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="users">
        <ul>
          {selectedUsers.map((friend: UserTrimedData, i: number) => (
            <li
              onClick={() => {
                setActiveUserGlobal(friend)
                resetMessageCount(friend.id)
              }}
              className={friend.email === activeUser.email ? 'active' : ''}
              key={i}
            >
              <div className="userInfo">
                <img
                  src={
                    friend.profileUrl ? friend.profileUrl :
                    'https://socialtelecast.com/wp-content/uploads/2020/04/%C3%9Arsula-Corber%C3%B3.jpg'
                  }
                />
                <span className="userName center">
                  <span className="name">{friend.name}</span>
                  <span className="status">
                    <span className={'notActiveUser'} />
                    {friend.active === true ? 'active' : timeAgo(friend.active as any)}
                  </span>
                </span>
              </div>
              <div className="messageData">
                <p>{latestMessages[friend.id]}</p>
                {newMessageCount[friend.id] > 0 ? (
                  <span className="messageCount center">{newMessageCount[friend.id]}</span>
                ) : // <span className="messageCount nonotification"></span>
                null}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {createNew && <SearchUser hideSearchPopUp={() => setCreateNew(false)} />}
      <Toaster
        time={1}
        message={toastDetails.message}
        type={toastDetails.type as toasterType}
        showToast={toastDetails.showToast}
      />
    </section>
  )
}

export default UserList
