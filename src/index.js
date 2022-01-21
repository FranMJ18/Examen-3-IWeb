import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { initializeApp } from "firebase/app";
//import { getFirestore } from "firebase/firestore";
//import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrmOtcOcn1NFMash4_VUkixKX4jnUAIXY",
  authDomain: "parcial3-francisco.firebaseapp.com",
  databaseURL: "https://parcial3-francisco-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "parcial3-francisco",
  storageBucket: "parcial3-francisco.appspot.com",
  messagingSenderId: "157590948339",
  appId: "1:157590948339:web:74d2d93b0caa1de692ea86"
};
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);