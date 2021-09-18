import firebase from 'firebase'
import { uidExtractor } from '../Helpers/CallBackHelper'
import { GroupDetails } from '../Models/CreateGroup'
import FirebaseApp from './FirebaseApp'

export class FirebaseGroup {
  private firebaseDataBase: firebase.database.Database
  private firebaseAuth: firebase.auth.Auth

  constructor() {
    this.firebaseDataBase = FirebaseApp.database()
    this.firebaseAuth = FirebaseApp.auth()
  }

  private refForGroup() {
    return this.firebaseDataBase.ref('/group')
  }

  private getCurrentUser() {
    return this.firebaseAuth.currentUser
  }

  public createGroup(groupDetails: GroupDetails) {
    return this.refForGroup().update({
      [groupDetails.id]: {
        ...groupDetails,
      },
    })
  }

  public getGroups(callBack: any) {
    this.refForGroup().on('value', callBack)
  }

  public exitGroup(group: any) {
    const uid = uidExtractor(this.getCurrentUser()?.email || '')
    return this.refForGroup()
      .child(group.id)
      .update({
        ...group,
        userIdList: group.userIdList.filter((id: string) => id !== uid),
      })
  }
}
