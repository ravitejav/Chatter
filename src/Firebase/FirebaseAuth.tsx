import firebase from "firebase";

import FirebaseApp from "./FirebaseApp";

export class FirebaseAuth {

    private auth: firebase.auth.Auth;
    
    constructor() {
        this.auth = FirebaseApp.auth();
    }

    SignInWithEmailAndPassword(email: string, password: string) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

}