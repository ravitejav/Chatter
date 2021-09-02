import firebase from 'firebase';
import { uidExtractor } from '../Helpers/CallBackHelper';
import FirebaseApp from './FirebaseApp';

export class FirebaseStorage {

    private auth: firebase.auth.Auth
    private storage: firebase.storage.Storage;

    constructor() {
        const firebaseApp = FirebaseApp;
        this.storage = firebaseApp.storage();
        this.auth = firebaseApp.auth();
    }

    private getCurrentUser() {
        return this.auth.currentUser;
    }

    private pathRefToProfilePic() {
        return this.storage.ref('profilePic/')
    }

    saveProfilePic(file: any) {
        const currentUserId = uidExtractor(this.getCurrentUser()?.email || '');
        this.pathRefToProfilePic()
    }

    getProfilePic(id: string) {
    }

}