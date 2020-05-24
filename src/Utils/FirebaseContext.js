import React from 'react';
const FirebaseContext = React.createContext(null);

export class FirebaseContextObject {

  callbacks = [];

  firebase = null;
  db = null;

  schedule = [];

  constructor(firebase, firebaseConfig) {
      this.firebase = firebase
      this.firebase.initializeApp(firebaseConfig);
      this.db = firebase.firestore();
      console.log("FirebaseContext initialized");
      this.db
        .collection("schedule")
        // .where("start", ">", this.state.today)
        .orderBy("start")
        .onSnapshot((querySnapshot) => {this.receiveScheduleUpdate(querySnapshot)});
  }

  receiveScheduleUpdate(querySnapshot) {
    console.log("schedule update received");
    this.schedule = [];
    querySnapshot.forEach((doc) => {
      this.schedule.push(doc.data());
    });
    this.callbacks.forEach(callback => {
      callback(this.schedule);
    });
  }

  addCallback(callback) {
    this.callbacks.push(callback);
    if (this.schedule != []) {
      callback(this.schedule);
    }
  }
}

export default FirebaseContext;