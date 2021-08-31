import firebase from 'firebase'
import { FIREBASE_VALUE } from '../Constants/Firebase'
import { getMessageId, uidExtractor } from '../Helpers/CallBackHelper'
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

  private getMessagePathToFriend(friendEmail: string) {
    const currentUser = this.auth.currentUser?.email || ''
    return this.getUserChatRef().child(getMessageId(currentUser, friendEmail)).child('/messages/')
  }

  private getMessageMetaDataPath(friendEmail: string) {
    const currentUser = this.auth.currentUser?.email || ''
    return this.getUserChatRef().child(getMessageId(currentUser, friendEmail)).child('/metaData/')
  }

  public getMessagesOnce(friendEmail: string, messageUpdater: any) {
    return this.getMessagePathToFriend(friendEmail).on(
      FIREBASE_VALUE,
      (datasnapShot) => messageUpdater(datasnapShot, friendEmail),
      (error) => {
        // handle error
      }
    )
  }

  public sendMessage(friendEmail: string, messageDetails: MessageType) {
    const currentUser = this.auth.currentUser?.email || ''
    return this.getMessagePathToFriend(friendEmail).update({
      [messageDetails.timestamp]: {
        ...messageDetails,
        from: currentUser,
      },
    })
  }

  public getLastMessage(friendEmail: string, callback: any) {
    return this.getMessagePathToFriend(friendEmail)
      .orderByValue()
      .limitToLast(1)
      .on('value', (messages: firebase.database.DataSnapshot) => callback(friendEmail, messages))
  }

  public getLastReadTime(friendEmail: string) {
    const currentUser = uidExtractor(this.auth.currentUser?.email || '')
    return this.getMessageMetaDataPath(friendEmail)
      .child('lastMessageReadTime')
      .child(currentUser)
      .get()
  }

  public setLastReadTime(friendEmail: string) {
    const currentUser = uidExtractor(this.auth.currentUser?.email || '')
    return this.getMessageMetaDataPath(friendEmail)
      .child('lastMessageReadTime')
      .child(currentUser)
      .set(new Date().getTime())
  }
}
