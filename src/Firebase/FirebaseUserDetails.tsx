import firebase from "firebase";
import { NO_DATA_ERROR } from "../Constants/Firebase";
import { UserDetails } from "../Models/UserModels";

import FirebaseApp from "./FirebaseApp";

export class FirebaseUser {

    private database: firebase.database.Database;

    constructor() {
        this.database = FirebaseApp.database();
    }

    private getUserRef() {
        return this.database.ref().child("users");
    }

    private getAllUsers() {
        this.getUserRef().get()
            .then(res => res.exists() ? res.val() : {})
            .catch(error => { });
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

}