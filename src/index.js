import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from './Config/firebaseConfig';
import FirebaseContext, { FirebaseContextObject } from './Utils/FirebaseContext';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new FirebaseContextObject(firebase, firebaseConfig)}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
