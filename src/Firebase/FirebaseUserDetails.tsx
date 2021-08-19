import firebase from "firebase";
import { NO_DATA_ERROR } from "../Constants/Firebase";
import { uidExtractor } from "../Helpers/CallBackHelper";
import { UserDetails } from "../Models/UserModels";

import FirebaseApp from "./FirebaseApp";

export class FirebaseUser {

    private database: firebase.database.Database;
    private auth: firebase.auth.Auth;

    constructor() {
        this.database = FirebaseApp.database();
        this.auth = FirebaseApp.auth();
    }

    private getUserRef() {
        return this.database.ref().child("users");
    }

    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.getUserRef().get()
                .then(res => res.exists() ? resolve(res.val()) : reject(NO_DATA_ERROR))
                .catch(error => reject(NO_DATA_ERROR));
        });
    }

    getUserDetails(userId: string) {
        return new Promise((resolve, reject) => {
            this.getUserRef().child(userId).get()
                .then(res => {
                    console.log("in block");
                    res.exists()
                        ? resolve(res.val())
                        : reject(NO_DATA_ERROR);
                })
                .catch(error => {
                    console.log(error);
                    reject(NO_DATA_ERROR);
                })
        });
    }

    saveUserData(userDetails: UserDetails, userId: string) {
        return new Promise((resolve, reject) => {
            this.getUserRef().get()
                .then((res) => {
                    res.exists()
                        ? this.getUserRef().set({
                            ...res.val(),
                            [userId]: {
                                ...userDetails
                            }
                          })
                          .then(res => resolve(res))
                          .catch(error => reject(error))
                        : reject(NO_DATA_ERROR)
                })
                .catch(error => reject(error))
        });
    }

    public getCurrentUser() {
        return this.auth.currentUser;
    }

    public sendRequest(userId: string, requestUserId: string) {
        return this.getUserRef().child(requestUserId).child("requests").set({
            [userId]: true,
        });
    }

    public getRequests() {
        const currentUserMail = uidExtractor(this.getCurrentUser()?.email || "");
        return this.getUserRef().child(currentUserMail).child("requests").get();
    }

    acceptFriendRequest(friendId: string, userId: string) {
        return Promise.all([
            this.getUserRef().child(userId).child("friends").child(friendId).set(true), 
            this.getUserRef().child(friendId).child("friends").child(userId).set(true), 
            this.getUserRef().child(userId).child("requests").update({
                [friendId]: false
            })
        ]);
    }

    rejectFriendRequest(userId: string, friendId: string) {
        return this.getUserRef().child(userId).child("requests").update({
            [friendId]: false
        });
    }

    getMyFriends() {
        const currentUserMailId = this.getCurrentUser()?.email || "";
        return this.getUserRef().child(uidExtractor(currentUserMailId)).child("/friends/").get();
    }

}