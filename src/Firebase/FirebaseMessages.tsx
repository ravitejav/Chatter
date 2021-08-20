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

  public getMessagesOnce(friendEmail: string, messageUpdater: any) {
    const currentUser = this.auth.currentUser?.email || ''
    return this.getUserChatRef()
      .child(getMessageId(currentUser, friendEmail))
      .on(FIREBASE_VALUE, messageUpdater, (error) => {
        // handle error
      })
  }

  public sendMessage(friendEmail: string, messageDetails: MessageType) {
    const currentUser = this.auth.currentUser?.email || ''
    return this.getUserChatRef()
      .child(getMessageId(currentUser, friendEmail))
      .update({
        [messageDetails.timestamp]: {
          ...messageDetails,
          from: currentUser,
        },
      })
  }
}
