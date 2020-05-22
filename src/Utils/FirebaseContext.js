import React from 'react';
const FirebaseContext = React.createContext(null);

export class FirebaseContextObject {

    firebase = null;
    db = null

    constructor(firebase, firebaseConfig) {
        this.firebase = firebase
        this.firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
        console.log("FirebaseContext initialized");
    }
}

export default FirebaseContext;