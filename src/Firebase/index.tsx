import FirebaseApp from "./FirebaseApp";
import { FirebaseAuth } from "./FirebaseAuth";

export class Firebase extends FirebaseAuth {
    
    constructor() {
        super();
    }

    googleSignIn(username: string, password: string) {
        return this.SignInWithEmailAndPassword(username, password);
    }
}