import firebase from 'firebase'
import { GroupDetails } from '../Models/CreateGroup'
import FirebaseApp from './FirebaseApp'

export class FirebaseGroup {
  private firebaseDataBase: firebase.database.Database

  constructor() {
    this.firebaseDataBase = FirebaseApp.database()
  }

  private refForGroup() {
    return this.firebaseDataBase.ref('/group')
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
}
