import firebase from 'firebase'

import { FIREBASE_CONFIG } from '../Configs/FirebaseConfig'

class FirebaseApp {
  private firebaseApp: firebase.app.App

  constructor() {
    if (firebase.apps.length < 1) {
      this.firebaseApp = firebase.initializeApp(FIREBASE_CONFIG)
    } else {
      this.firebaseApp = firebase.apps[0]
    }
  }

  public auth(): firebase.auth.Auth {
    return this.firebaseApp.auth()
  }

  public database(): firebase.database.Database {
    return this.firebaseApp.database()
  }
}

export default new FirebaseApp()
