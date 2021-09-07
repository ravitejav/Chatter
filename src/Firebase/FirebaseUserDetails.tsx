import firebase from 'firebase'
import { NO_DATA_ERROR } from '../Constants/Firebase'
import { uidExtractor } from '../Helpers/CallBackHelper'
import { UserDetails } from '../Models/UserModels'

import FirebaseApp from './FirebaseApp'

export class FirebaseUser {
  private database: firebase.database.Database
  private auth: firebase.auth.Auth

  constructor() {
    this.database = FirebaseApp.database()
    this.auth = FirebaseApp.auth()
  }

  private getUserRef() {
    return this.database.ref().child('users')
  }

  private getCurrentuserRef() {
    const currentUserMail = uidExtractor(this.getCurrentUser()?.email || '')
    return this.getUserRef().child(currentUserMail)
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      this.getUserRef()
        .get()
        .then((users) => (users.exists() ? resolve(users.val()) : reject(NO_DATA_ERROR)))
        .catch((error) => reject(NO_DATA_ERROR))
    })
  }

  getCurrentUserData(callback: any) {
    return this.getCurrentuserRef().on('value', callback)
  }

  getLiveUpdateOfUser(callBack: any) {
    this.getUserRef().on('value', callBack)
  }

  getUserDetails(userId: string) {
    return new Promise((resolve, reject) => {
      this.getUserRef()
        .child(uidExtractor(userId))
        .get()
        .then((userDetails) => {
          userDetails.exists() ? resolve(userDetails.val()) : reject(NO_DATA_ERROR)
        })
        .catch((error) => {
          reject(NO_DATA_ERROR)
        })
    })
  }

  saveUserData(userDetails: UserDetails) {
    const currentuserEmail = this.getCurrentUser()?.email || ''
    return new Promise((resolve, reject) => {
      this.getUserRef()
        .get()
        .then((users) => {
          users.exists()
            ? this.getUserRef()
                .update({
                  ...users.val(),
                  [uidExtractor(currentuserEmail)]: {
                    ...users.val()[uidExtractor(currentuserEmail)],
                    ...userDetails,
                    email: currentuserEmail,
                  },
                })
                .then((updatedUsers) => resolve(updatedUsers))
                .catch((error) => reject(error))
            : reject(NO_DATA_ERROR)
        })
        .catch((error) => reject(error))
    })
  }

  public getCurrentUser() {
    return this.auth.currentUser
  }

  public sendRequest(userId: string, requestUserId: string) {
    return this.getUserRef()
      .child(requestUserId)
      .child('requests')
      .update({
        [userId]: true,
      })
  }

  public getRequests() {
    return this.getCurrentuserRef().child('requests').get()
  }

  acceptFriendRequest(friendId: string, userId: string) {
    return Promise.all([
      this.getUserRef().child(userId).child('friends').child(friendId).set(true),
      this.getUserRef().child(friendId).child('friends').child(userId).set(true),
      this.getUserRef()
        .child(userId)
        .child('requests')
        .update({
          [friendId]: null,
        }),
    ])
  }

  rejectFriendRequest(userId: string, friendId: string) {
    return this.getUserRef()
      .child(userId)
      .child('requests')
      .update({
        [friendId]: null,
      })
  }

  getMyFriends(callback: any) {
    return this.getCurrentuserRef().child('/friends/').on('value', callback)
  }

  activateUser() {
    return this.getCurrentuserRef().child('active').set(true)
  }

  deactivateUser() {
    return this.getCurrentuserRef().child('active').set(new Date().getTime())
  }
}
