import { API_KEY, MEASUREMENT_ID, PROJECT_ID, SENDER_ID } from "../Constants/Firebase";

export const FIREBASE_CONFIG = {
    apiKey: `${API_KEY}`,
    authDomain: `${PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
    projectId: `${PROJECT_ID}`,
    storageBucket: `${PROJECT_ID}.appspot.com`,
    messagingSenderId: `${SENDER_ID}`,
    appId: `${SENDER_ID}`,
    measurementId: `${MEASUREMENT_ID}`,
};