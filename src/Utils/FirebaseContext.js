import React from 'react';
const FirebaseContext = React.createContext(null);

export class FirebaseContextObject {

  firebase = null;
  db = null;

  data = {
    schedule: null
  };
  callbacks = {
    schedule: []
  }

  constructor(firebase, firebaseConfig) {
      this.firebase = firebase
      this.firebase.initializeApp(firebaseConfig);
      this.db = firebase.firestore();
      console.log("FirebaseContext initialized");
      this.db
        .collection("schedule")
        // .where("start", ">", this.state.today)
        .orderBy("start")
        .onSnapshot((querySnapshot) => {this.receiveUpdate(querySnapshot, 'schedule')});
  }

  receiveUpdate(querySnapshot, category) {
    console.log("update received: ", category);
    var result = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    this.data[category] = result;
    this.callbacks[category].forEach(callback => {
      callback(result);
    });
  }

  addCallback(callback, category) {
    this.callbacks[category].push(callback);
    if (this.data[category] !== null) {
      callback(this.data[category]);
    }
  }
}

export default FirebaseContext;