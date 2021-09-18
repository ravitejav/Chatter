import firebase from 'firebase'
import { GROUP_CHAT, USER_CHAT } from '../Constants/DefaultValues'
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

  private getGroupChatRef() {
    return this.database.ref().child('/groupchats')
  }

  private getMessagePathToFriend(friendEmail: string) {
    const currentUser = this.auth.currentUser?.email || ''
    return this.getUserChatRef().child(getMessageId(currentUser, friendEmail)).child('/messages/')
  }

  private getMessageMetaDataPath(friendEmail: string) {
    const currentUser = this.auth.currentUser?.email || ''
    return this.getUserChatRef().child(getMessageId(currentUser, friendEmail)).child('/metaData/')
  }

  private getGroupPath(groupId: string) {
    return this.getGroupChatRef().child(groupId).child('/messages/');
  }

  private getMessageMetaDataPathForGroup(groupId: string) {
    return this.getUserChatRef().child(groupId).child('/metaData/')
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

  public getMessagesForGroup(groupId: string, callback: any) {
    this.getGroupPath(groupId).on('value', (groupMessages) => callback(groupMessages, groupId));
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

  public sendMessageToGroup(groupId: string, messageDetails: MessageType) {
    const currentUser = this.auth.currentUser?.email || ''
    return this.getGroupPath(groupId).update({
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

  public getLastMessageOfGroup(groupId: string, callback: any) {
    return this.getGroupPath(groupId)
      .orderByValue()
      .limitToLast(1)
      .on('value', (messages: firebase.database.DataSnapshot) => callback(groupId, messages))
  }

  public getLastReadTime(friendEmailOrGroupId: string, chatType: string = USER_CHAT) {
    const currentUser = uidExtractor(this.auth.currentUser?.email || '')
    if (chatType === USER_CHAT) {
      return this.getMessageMetaDataPath(friendEmailOrGroupId)
        .child('lastMessageReadTime')
        .child(currentUser)
        .get()
    } else if (chatType === GROUP_CHAT) {
      return this.getMessageMetaDataPathForGroup(friendEmailOrGroupId)
        .child('lastMessageReadTime')
        .child(currentUser)
        .get()
    }
  }

  public setLastReadTime(friendEmailOrGroupId: string, chatType: string = USER_CHAT) {
    const currentUser = uidExtractor(this.auth.currentUser?.email || '')
    if (chatType === USER_CHAT) {
      return this.getMessageMetaDataPath(friendEmailOrGroupId)
        .child('lastMessageReadTime')
        .child(currentUser)
        .set(new Date().getTime())
    } else if (chatType === GROUP_CHAT) {
      return this.getMessageMetaDataPathForGroup(friendEmailOrGroupId)
        .child('lastMessageReadTime')
        .child(currentUser)
        .set(new Date().getTime())
    }
  }
}
