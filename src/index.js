import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from './Config/firebaseConfig';
import FirebaseContext, { FirebaseContextObject } from './Utils/FirebaseContext';

import Scheduler from './Scheduler/Scheduler';

var context = new FirebaseContextObject(firebase, firebaseConfig);
var scheduler = new Scheduler(context);
window.scheduler = scheduler;

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={context}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
