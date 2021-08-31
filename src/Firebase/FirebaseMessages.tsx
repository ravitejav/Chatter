import firebase from 'firebase'
import { FIREBASE_VALUE } from '../Constants/Firebase'
import { getMessageId } from '../Helpers/CallBackHelper'
import { MessageType } from '../Models/Message'

import FirebaseApp from './FirebaseApp'

export class FirebaseMessaging {
  private database: firebase.database.Database
  private auth: firebase.auth.Auth

  constructor() {
    this.database = FirebaseApp.database()
    this.auth = FirebaseApp.auth()
  }

  private getUserChatRef() {
    return this.database.ref().child('userchats')
  }

  private getChatPathToFriend(friendEmail: string) {
    const currentUser = this.auth.currentUser?.email || ''
    return this.getUserChatRef().child(getMessageId(currentUser, friendEmail))
  }

  public getMessagesOnce(friendEmail: string, messageUpdater: any) {
    return this.getChatPathToFriend(friendEmail).on(FIREBASE_VALUE, messageUpdater, (error) => {
      // handle error
    })
  }

  public sendMessage(friendEmail: string, messageDetails: MessageType) {
    const currentUser = this.auth.currentUser?.email || ''
    return this.getChatPathToFriend(friendEmail).update({
      [messageDetails.timestamp]: {
        ...messageDetails,
        from: currentUser,
      },
    })
  }

  public getLastMessage(friendEmail: string, callback: any) {
    return this.getChatPathToFriend(friendEmail)
      .orderByValue()
      .limitToLast(1)
      .on('value', (messages: firebase.database.DataSnapshot) => callback(friendEmail, messages))
  }
}
