import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCf0lx1MuidInni0G3ystKhR32_qh0zFB0",
    authDomain: "letmask2.firebaseapp.com",
    databaseURL: "https://letmask2-default-rtdb.firebaseio.com",
    projectId: "letmask2",
    storageBucket: "letmask2.appspot.com",
    messagingSenderId: "458912589978",
    appId: "1:458912589978:web:d7549352391b4fd2e8d723"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const database = firebase.database();

  export {firebase, auth, database};