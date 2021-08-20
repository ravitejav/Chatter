import { FirebaseAuth } from './FirebaseAuth'

export class Firebase extends FirebaseAuth {
  constructor() {
    super()
  }

  usernameWithPassSignIn(username: string, password: string) {
    return this.SignInWithEmailAndPassword(username, password)
  }

  signOut() {
    return this.SignOutAuth()
  }

  signInWithGoogle() {
    return this.googleSignIn()
  }

  signUpWithUsernameAndPass(username: string, password: string) {
    return this.signUpWithEmailAndPass(username, password)
  }
}
