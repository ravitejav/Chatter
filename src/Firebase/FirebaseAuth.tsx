import firebase from 'firebase'

import FirebaseApp from './FirebaseApp'

export class FirebaseAuth {
  private auth: firebase.auth.Auth
  private authProvider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()

  constructor() {
    this.auth = FirebaseApp.auth()
  }

  protected SignInWithEmailAndPassword(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  protected SignOutAuth() {
    return this.auth.signOut()
  }

  protected googleSignIn() {
    return this.auth.signInWithPopup(this.authProvider)
  }

  protected signUpWithEmailAndPass(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  public sendVerificationEmail() {
    return this.auth.currentUser?.sendEmailVerification()
  }

  public getCurrentUser() {
    return this.auth.currentUser
  }
}
